export const getPublicId = (url) => {
    const publicId = url.split('/').pop().split('.')[0];
    return publicId;
};
