import axiosConfig from '../axiosConfig';

export const apiCreateVNPayPayment = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/payment/create-vnpay-payment-url',
            data: payload,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiVNPayReturn = async (params) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/payment/vnpay-return',
            params: params,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetAllPaymentsFromUser = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/payment/all-payments-from-user',
        });
        return response;
    } catch (error) {
        throw error;
    }
};
