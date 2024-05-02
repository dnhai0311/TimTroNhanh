import React, { memo, useEffect, useState } from 'react';
import { apiGetPostCategories } from '../../../services/app';
import { AddressFormItem } from '../../../components';
import { formatToVND } from '../../../utils/commons/formatToVND';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { apiCreateVNPayPayment } from '../../../services/payment';
import { showToastError, showToastSuccess } from '../../../utils/commons/ToastUtil';
import Status from './TopUp/Status';
import { apiDidUserCreatePost } from '../../../services/user';
import { apiCheckOut } from '../../../services/payment';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../../store/actions/user';
const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();

    const { userData } = useSelector((state) => state.user);
    const [amount, setAmount] = useState();
    const [total, setTotal] = useState();
    const [postCategories, setPostCategories] = useState([]);
    const [selectedPostCategory, setSelectedPostCategory] = useState();
    const [selectedType, setSelectedType] = useState();
    const [selectedAmount, setSelectedAmount] = useState();
    const [method, setMethod] = useState();
    const [isValid, setIsValid] = useState(true);

    const [isDone, setIsDone] = useState(false);

    const radioOptions = [
        {
            id: 1,
            value: 'Thanh toán bằng tiền trong tài khoản. Hiện có: ' + formatToVND(userData?.money),
        },
        {
            id: 2,
            value: 'Thanh toán bằng ví Momo',
        },
        {
            id: 3,
            value: 'Thanh toán bằng ví VNPay',
        },
        {
            id: 4,
            value: 'Thanh toán bằng ví ZaloPay',
        },
        {
            id: 5,
            value: 'Thanh toán bằng thẻ ngân hàng',
        },
    ];
    const per = [
        {
            id: 1,
            value: 'Theo ngày',
        },
        {
            id: 2,
            value: 'Theo tuần',
        },
        {
            id: 3,
            value: 'Theo tháng',
        },
    ];

    useEffect(() => {
        const fetchPostCategories = async () => {
            const response = await apiGetPostCategories();
            if (response.status === 200) {
                setPostCategories(response.data.response);
            }
        };
        fetchPostCategories();
    }, []);

    const handleRadioChange = (e) => {
        setMethod(e.target.value);
    };

    const handleCheckout = async () => {
        if (!method) {
            showToastError('Vui lòng chọn phương thức thanh toán.');
            return;
        }
        if (!selectedAmount || !selectedType || !selectedPostCategory) {
            showToastError('Vui lòng chọn đầy đủ');
            return;
        }

        if (method === '1') {
            const dayMappings = {
                1: 1,
                2: 7,
                3: 30,
            };
            const number = selectedAmount.value.split(' ')[0];
            let day = number * (dayMappings[selectedType.id] || 1);
            const response = await apiCheckOut(postId, selectedType.id, total, day);
            if (response.status === 200) {
                setIsDone(true);
                dispatch(getCurrentUser());
                showToastSuccess('Thanh toán thành công');
            }
            return;
        }

        if (total < 5000) {
            showToastError('Không thể thanh toán bằng ví nếu tổng tiền dưới 5.000đ.');
            return;
        }

        const payload = {
            orderDescription:
                '1 ' +
                postId +
                ' ' +
                selectedAmount.value.split(' ')[0] +
                ' ' +
                selectedType.id +
                ' ' +
                selectedPostCategory.id,
            amount: total,
            type: 'Thanh toán',
        };

        if (method === '3') {
            const response = await apiCreateVNPayPayment(payload);
            if (response.status === 200) {
                window.location.href = response.data;
            }
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            if (!postId) return;
            if (postId === 'trang-thai') return;
            const response = await apiDidUserCreatePost(postId);
            if (response.data.isCreate.status !== 'payment' && response.data.isCreate.status !== 'expired') {
                showToastError('Bài viết này đã thanh toán');
                navigate('/quan-ly/tin-dang');
            }
            if (response.data.isCreate) return;
            showToastError('Bài viết này không thuộc về bạn');
            navigate('/quan-ly/tin-dang');
        };
        fetchPost();
    }, [navigate, postId]);

    useEffect(() => {
        selectedPostCategory &&
            selectedType &&
            setAmount([
                {
                    id: 1,
                    value: '1 ' + selectedType.value.split(' ').pop(),
                },
                {
                    id: 2,
                    value: '3 ' + selectedType.value.split(' ').pop(),
                },
                {
                    id: 3,
                    value: '5 ' + selectedType.value.split(' ').pop(),
                },
                {
                    id: 4,
                    value: '7 ' + selectedType.value.split(' ').pop(),
                },
                {
                    id: 5,
                    value: '12 ' + selectedType.value.split(' ').pop(),
                },
            ]);
        setSelectedAmount({
            id: 0,
            value: '0',
        });
    }, [selectedPostCategory, selectedType]);
    useEffect(() => {
        if (+total > +userData?.money) {
            setIsValid(false);
            setMethod(0);
            return;
        }
        setIsValid(true);
    }, [total, userData?.money]);
    useEffect(() => {
        if (!selectedPostCategory || !selectedType || !selectedAmount) return;
        let total;
        const number = selectedAmount.value.split(' ')[0];
        if (selectedType.id === 1) {
            total = number * selectedPostCategory.perDay;
        } else if (selectedType.id === 2) {
            total = number * selectedPostCategory.perWeek;
        } else if (selectedType.id === 3) {
            total = number * selectedPostCategory.perMonth;
        }
        setTotal(total);
    }, [selectedPostCategory, selectedType, selectedAmount]);
    return (
        <>
            <h3 className="border-bottom py-3 px-5">Thanh toán</h3>
            {postId !== 'trang-thai' ? (
                !isDone ? (
                    <>
                        <div className="d-flex flex-wrap">
                            <AddressFormItem
                                name={'Loại tin'}
                                values={postCategories}
                                value={selectedPostCategory}
                                setValue={setSelectedPostCategory}
                                isPayment={true}
                            />
                            <AddressFormItem
                                name={'Thuê theo'}
                                values={per}
                                value={selectedType}
                                setValue={setSelectedType}
                                isPayment={true}
                            />
                            <AddressFormItem
                                name={'Thời gian thuê'}
                                values={amount}
                                value={selectedAmount}
                                setValue={setSelectedAmount}
                                isPayment={true}
                            />
                            <h5 className="mt-3">
                                Tổng cộng: <span className="text-success">{formatToVND(total)}</span>
                            </h5>
                        </div>
                        <div className="mt-2">Chọn phương thức nạp</div>
                        {radioOptions.map((option) => (
                            <div className="d-flex align-items-center" key={`${option.id} div`}>
                                <Form.Check
                                    key={option.id}
                                    type="radio"
                                    label={formatToVND(option.value)}
                                    name="methodRadioGroup"
                                    id={`methodRadio-${option.id}`}
                                    value={option.id}
                                    onChange={handleRadioChange}
                                    className="py-1"
                                    checked={+method === option.id}
                                    disabled={option.id === 1 && +total > +userData?.money ? true : false}
                                />
                                {option.id === 1 && +total > +userData?.money && (
                                    <span
                                        key={'text'}
                                        className="text-danger ms-2 get-more-button"
                                        onClick={() => {
                                            navigate('/quan-ly/nap-tien');
                                        }}
                                    >
                                        Bạn không đủ tiền trong tài khoản! Nạp thêm?
                                    </span>
                                )}
                            </div>
                        ))}
                        <Button
                            className={`w-100 py-3 mt-2`}
                            disabled={!method && isValid ? true : false}
                            onClick={handleCheckout}
                        >
                            <h5 className="p-0 m-0">Thanh toán</h5>
                        </Button>
                    </>
                ) : (
                    <>
                        <h5>Bạn đã thanh toán bài viết thành công</h5>
                    </>
                )
            ) : (
                <Status isCheckout={true} />
            )}
        </>
    );
};

export default memo(Checkout);
