import axiosConfig from '../axiosConfig';

export const apiGetUser = async (id, phone) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/get',
            params: {
                id,
                phone,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetCurrentUser = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/current',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiUpdateUser = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: '/api/v1/user/update',
            data: payload,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiResetPassword = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: '/api/v1/user/reset-password',
            data: payload,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetAllPosts = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/posts',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiDidUserCreatePost = async (postId) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/user-create-post',
            params: {
                postId,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};
