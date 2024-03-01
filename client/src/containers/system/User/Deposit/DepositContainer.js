import React from 'react';
import { DepositBox } from '../../../../components';
import momo from '../../../../assets/payment/momo.png';
import zalopay from '../../../../assets/payment/zalopay.png';
import vnpay from '../../../../assets/payment/vnpay.png';
import banking from '../../../../assets/payment/banking.png';

const DepositContainer = () => {
    const menuItems = [
        { name: 'Momo', image: momo, path: 'momo' },
        { name: 'VNPay', image: vnpay, path: 'vnpay' },
        { name: 'ZaloPay', image: zalopay, path: 'zalopay' },
        { name: 'Ngân hàng', image: banking, path: 'banking' },
    ];

    return (
        <>
            <h4>Mời bạn chọn phương thức nạp tiền</h4>
            <div className="d-flex flex-wrap">
                {menuItems.map((item) => (
                    <DepositBox name={item.name} path={item.path} image={item.image} key={item.name} />
                ))}
            </div>
        </>
    );
};

export default DepositContainer;
