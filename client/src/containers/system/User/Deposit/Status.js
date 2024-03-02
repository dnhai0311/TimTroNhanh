import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiVNPayReturn } from '../../../../services/payment';
import { showToastError, showToastSuccess } from '../../../../utils/commons/ToastUtil';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../../../store/actions/user';
import { formatToVND } from '../../../../utils/commons/formatToVND';

const Status = ({ isCheckout }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [queryParams, setQueryParams] = useState({});
    const [isTrue, setIsTrue] = useState(true);

    useEffect(() => {
        const handleCheckParams = async () => {
            const response = await apiVNPayReturn(params);
            if (response.data.RspCode === '00') {
                dispatch(getCurrentUser());
                showToastSuccess(response.data.Message);
            } else {
                showToastError(response.data.Message);
                setIsTrue(false);
            }
        };
        const searchParams = new URLSearchParams(location.search);
        const params = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        setQueryParams(params);
        handleCheckParams();
    }, [dispatch, location.search]);

    return (
        <div>
            {isTrue ? (
                <>
                    {!isCheckout ? (
                        <>
                            <h5>Bạn đã nạp thành công số tiền</h5>
                            <div className="d-flex align-items-end">
                                <h4 className="text-success">{formatToVND(queryParams['vnp_Amount'] / 100)}</h4>
                                <h5 className="ps-2">vào tài khoản</h5>
                            </div>
                        </>
                    ) : (
                        <>
                            <h5>Bạn đã thanh toán bài viết thành công</h5>
                        </>
                    )}
                </>
            ) : (
                <h3 className="text-danger">Phát hiện bất thường</h3>
            )}
        </div>
    );
};

export default Status;
