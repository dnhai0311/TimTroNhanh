import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiVNPayReturn } from '../../../../services/payment';
import { showToastError, showToastSuccess } from '../../../../utils/commons/ToastUtil';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../../../store/actions/user';
const Status = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [queryParams, setQueryParams] = useState({});

    useEffect(() => {
        const handleCheckParams = async () => {
            const response = await apiVNPayReturn(params);
            if (response.data.RspCode === '00') {
                dispatch(getCurrentUser());
                showToastSuccess(response.data.Message);
            } else {
                showToastError(response.data.Message);
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

    return <div></div>;
};

export default Status;
