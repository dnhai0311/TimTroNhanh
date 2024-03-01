export const formatToVND = (value) => {
    return value?.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
};
