import axiosConfig from '../axiosConfig';

export const apiSendMessage = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/message/send-message',
            data: payload,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetAllMessagesCurrent = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/message/all-messages',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetMessages = async (userId, page, currentTotalMessages) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/message/messages',
            params: {
                otherId: userId,
                page,
                currentTotalMessages,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};
