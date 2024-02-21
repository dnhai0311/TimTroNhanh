import axiosConfig from '../axiosConfig';

export const apiGetAllPosts = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/all',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetPosts = async (
    page,
    conditions,
    sortType,
    sortOrder,
    districtId,
    provinceId,
    minPrice,
    maxPrice,
    minAcreage,
    maxAcreage,
) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/get`,
            params: {
                page,
                conditions,
                sortType,
                sortOrder,
                districtId,
                provinceId,
                minPrice,
                maxPrice,
                minAcreage,
                maxAcreage,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetOnePost = async (id) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/get-one',
            params: {
                id,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiCreatePost = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/post/create-new',
            data: payload,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiUpdatePost = async (payload) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: '/api/v1/post/update',
            data: payload,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiDeletePost = async (id) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: '/api/v1/post/delete',
            params: {
                id,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiLikePost = async (userId, postId) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/post/like',
            params: {
                userId,
                postId,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiUnLikePost = async (userId, postId) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: '/api/v1/post/unlike',
            params: {
                userId,
                postId,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetAllLikedPost = async (userId) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/all-liked-posts',
            params: {
                userId,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetLikedPost = async (userId, page) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/liked-posts',
            params: {
                userId,
                page,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiDidUserLikePost = async (userId, postId) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/user-post',
            params: {
                userId,
                postId,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};
