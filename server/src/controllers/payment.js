const moment = require('moment');
import * as paymentService from '../services/payment';
import { updateUserMoney } from '../services/user';
import { checkOutPost } from '../services/post';
import { type } from 'os';
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}

export const createVNPayPaymentURL = async (req, res) => {
    const { id } = req.user;
    try {
        let ipAddr =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        let tmnCode = process.env.vnp_TmnCode;
        let secretKey = process.env.vnp_HashSecret;
        let vnpUrl = process.env.vnp_Url;

        let date = new Date();

        let createDate = moment(date).format('YYYYMMDDHHmmss');
        let orderId = moment(date).format('DDHHmmss') + id;
        let amount = req.body.amount;
        let bankCode = req.body.bankCode || 'NCB';
        let orderInfo = req.body.orderDescription;
        let orderType = req.body.type;
        let locale = req.body.language || 'vn';

        let returnUrl = orderType === 'Nạp tiền' ? process.env.vnp_ReturnUrl : process.env.other_vnp_ReturnUrl;

        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require('crypto');
        let hmac = crypto.createHmac('sha512', secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        await paymentService.createPayment(orderId, id, orderType, amount);
        res.status(200).json(vnpUrl);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const vnpayReturn = async (req, res) => {
    const { id } = req.user;
    try {
        let vnp_Params = req.query;
        let secureHash = vnp_Params['vnp_SecureHash'];

        let orderId = vnp_Params['vnp_TxnRef'];
        let rspCode = vnp_Params['vnp_ResponseCode'];
        let amount = +vnp_Params['vnp_Amount'] / 100;
        let orderInfo = vnp_Params['vnp_OrderInfo'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);

        let secretKey = process.env.vnp_HashSecret;
        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require('crypto');
        let hmac = crypto.createHmac('sha512', secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

        let paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
        //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
        //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

        let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
        let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
        if (secureHash === signed) {
            //kiểm tra checksum
            if (checkOrderId) {
                if (checkAmount) {
                    if (paymentStatus == '0') {
                        //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                        if (rspCode == '00') {
                            //thanh cong
                            //paymentStatus = '1'
                            // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                            const isDeposited = await paymentService.isDeposited(orderId);
                            let orderType = orderInfo.split(' ')[0];

                            if (isDeposited && orderType === '0') {
                                await updateUserMoney(id, orderType, amount);
                            } else if (isDeposited && orderType === '1') {
                                const postId = orderInfo.split(' ')[1];
                                const number = orderInfo.split(' ')[2];
                                const per = orderInfo.split(' ')[3];
                                const typePostId = orderInfo.split(' ')[4];
                                const dayMappings = {
                                    1: 1,
                                    2: 7,
                                    3: 30,
                                };
                                let day = number * (dayMappings[per] || 1);
                                await checkOutPost(postId, day, typePostId);
                            }
                            await paymentService.updatePaymentStatus(orderId, 'success');

                            await res.status(200).json({ RspCode: '00', Message: 'Success' });
                        } else {
                            //that bai
                            //paymentStatus = '2'
                            // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                            await paymentService.updatePaymentStatus(orderId, 'failure');
                            res.status(200).json({ RspCode: '00', Message: 'Nạp tiền thành công' });
                        }
                    } else {
                        res.status(200).json({
                            RspCode: '02',
                            Message: 'Hoá đơn đã được cập nhật hoặc thanh toán',
                        });
                    }
                } else {
                    res.status(200).json({ RspCode: '04', Message: 'Số tiền không hợp lệ' });
                }
            } else {
                res.status(200).json({ RspCode: '01', Message: 'Không tìm thấy hoá đơn' });
            }
        } else {
            res.status(200).json({ RspCode: '97', Message: 'Kiểm tra thất bại' });
        }
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const getAllPayments = async (req, res) => {
    const { id } = req.user;
    try {
        const response = await paymentService.getAllPaymentsFromUserId(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const checkOutPostAndUpdateMoney = async (req, res) => {
    const { id } = req.user;
    const { postId, typePostId, amount, day } = req.query;
    try {
        if (!postId || !typePostId || !amount || !day) {
            return res.status(400).json({
                err: 1,
                msg: 'missing input',
            });
        }
        const user = await updateUserMoney(id, '1', amount);
        if (user.success === false) {
            return res.status(200).json(user);
        }
        await checkOutPost(postId, day, typePostId);
        let orderId = moment(new Date()).format('DDHHmmss') + id;
        await paymentService.createPayment(orderId, id, 'Thanh toán', amount, 'success');

        return res.status(200).json({
            err: 0,
            msg: 'Success',
        });
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};
