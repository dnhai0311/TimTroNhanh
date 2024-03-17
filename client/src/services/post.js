import axiosConfig from '../axiosConfig';

export const apiGetAllPosts = async (status) => {
    try {
        console.log(status);
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/all',
            params: {
                status,
            },
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

export const apiLikePost = async (postId) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/post/like',
            params: {
                postId,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiUnLikePost = async (postId) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: '/api/v1/post/unlike',
            params: {
                postId,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetAllLikedPost = async () => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/all-liked-posts',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetLikedPost = async (page) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/liked-posts',
            params: {
                page,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiDidUserLikePost = async (postId) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/user-like-post',
            params: {
                postId,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiRatePost = async (postId, star, comment) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/post/rate',
            params: {
                postId,
                star,
                comment,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiGetRated = async (postId, page) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/rated-posts',
            params: {
                postId,
                page,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiDidUserRatePost = async (postId) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/user-rate-post',
            params: {
                postId,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiUpdatePostStatus = async (postId, status) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/post/${postId}/update-status`,
            params: {
                status,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};
