import axiosConfig from '../axiosConfig';
import axios from 'axios';

export const apiGetCategories = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/category/all',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetPrices = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/price/all',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetAcreages = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/acreage/all',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetPostCategories = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post-category/all',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetAllDistricts = async (provinceId) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/district/all',
            params: {
                provinceId,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetDistricts = async (provinceId) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/district/get',
            params: {
                provinceId,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiAllGetProvinces = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/province/all',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetProvinces = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/province/get',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiUploadImage = async (data) => {
    try {
        const response = await axios({
            method: 'post',
            url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
            data: data,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetTotalUsersByType = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/total',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetTotalPostsByStatus = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/total',
        });
        return response;
    } catch (error) {
        throw error;
    }
};
export const apiGetTotalPaymentsByStatus = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/payment/total',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetTotalPaymentsByMonth = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/payment/month',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetAllUsers = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/all',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetAllPayments = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/payment/all',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetCoord = async (address) => {
    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1&limit=1`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};
