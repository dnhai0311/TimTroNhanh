import React from 'react';
import { Payment } from '../../../../components/';
import { apiCreateVNPayPayment } from '../../../../services/payment';

const VNPay = () => {
    const handleCreateVNPayPayment = async (payload) => {
        const response = await apiCreateVNPayPayment(payload);
        if (response.status === 200) {
            window.location.href = response.data;
        }
    };
    return <Payment name={'Ví VNPay'} handleCreate={handleCreateVNPayPayment} />;
};

export default VNPay;
