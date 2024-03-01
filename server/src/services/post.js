import db from '../models';

export const getAllPostsService = async () => {
    try {
        const response = await db.POST.findAll({
            raw: true,
            nest: true,
            include: [
                {
                    model: db.IMAGE,
                    as: 'images',
                    attributes: ['path'],
                },
                {
                    model: db.ATTRIBUTE,
                    as: 'attribute',
                    attributes: ['price', 'acreage', 'address'],
                },
                {
                    model: db.USER,
                    as: 'user',
                    attributes: ['name', 'phone'],
                },
            ],
            attributes: ['id', 'title', 'description', 'updatedAt', 'star'],
        });

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'FAILED TO GET POST',
            response,
        };
    } catch (error) {
        throw error;
    }
};

export const getPostsService = async (
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
        const queryOptions = {
            where: {
                // status: 'approved',
                // expiredAt: {
                //     [db.Sequelize.Op.gt]: db.Sequelize.literal('NOW()'),
                // },
            },
            raw: true,
            nest: true,
            offset: page * +process.env.PAGE_DISPLAYED || 0,
            limit: +process.env.PAGE_DISPLAYED,
            include: [
                {
                    model: db.IMAGE,
                    as: 'images',
                    attributes: ['path'],
                },
                {
                    model: db.ATTRIBUTE,
                    as: 'attribute',
                    attributes: ['price', 'acreage', 'address'],
                    include: [
                        {
                            model: db.DISTRICT,
                            as: 'district',
                            attributes: [],
                        },
                    ],
                },
                {
                    model: db.USER,
                    as: 'user',
                    attributes: ['name', 'phone', 'avatar'],
                },
            ],
            attributes: ['id', 'title', 'description', 'updatedAt', 'star', 'postTypeId'],
        };

        if (conditions) {
            queryOptions.where = { ...queryOptions.where, ...conditions };
        }

        if (minPrice && maxPrice) {
            queryOptions.where = {
                ...queryOptions.where,
                '$attribute.price$': {
                    [db.Sequelize.Op.between]: [minPrice, maxPrice],
                },
            };
        }

        if (minAcreage && maxAcreage) {
            queryOptions.where = {
                ...queryOptions.where,
                '$attribute.acreage$': {
                    [db.Sequelize.Op.between]: [minAcreage, maxAcreage],
                },
            };
        }

        if (districtId && districtId !== '') {
            queryOptions.where = {
                ...queryOptions.where,
                '$attribute.districtId$': districtId,
            };
        }

        if (provinceId && provinceId !== '') {
            queryOptions.where = {
                ...queryOptions.where,
                '$attribute.district.provinceId$': provinceId,
            };
        }
        if (sortType === 'price' || sortType === 'acreage') {
            queryOptions.order = [
                [db.Sequelize.literal(`CASE WHEN postTypeId = 2 THEN 0 ELSE 1 END`)],
                ['attribute', sortType, sortOrder],
            ];
        } else {
            queryOptions.order = [
                [db.Sequelize.literal(`CASE WHEN postTypeId = 2 THEN 0 ELSE 1 END`)],
                [sortType, sortOrder],
            ];
        }

        const response = await db.POST.findAndCountAll(queryOptions);
        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'FAILED TO GET POST',
            response,
        };
    } catch (error) {
        throw error;
    }
};

export const getOnePostService = async (id) => {
    try {
        const response = await db.POST.findOne({
            raw: true,
            nest: true,
            where: { id },
            include: [
                {
                    model: db.IMAGE,
                    as: 'images',
                    attributes: ['path'],
                },
                {
                    model: db.ATTRIBUTE,
                    as: 'attribute',
                    attributes: ['price', 'acreage', 'address'],
                    include: [
                        {
                            model: db.DISTRICT,
                            as: 'district',
                            attributes: ['value'],
                            include: [
                                {
                                    model: db.PROVINCE,
                                    as: 'province',
                                    attributes: ['value'],
                                },
                            ],
                        },
                    ],
                },
                {
                    model: db.CATEGORY,
                    as: 'category',
                    attributes: ['id', 'code', 'value'],
                },
                {
                    model: db.USER,
                    as: 'user',
                    attributes: ['id', 'name', 'phone', 'avatar', 'facebook'],
                },
                {
                    model: db.POST_CATEGORY,
                    as: 'postCategory',
                    attributes: ['name'],
                },
            ],
            attributes: ['id', 'title', 'description', 'userId', 'star', 'status', 'updatedAt', 'expiredAt'],
        });

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'FAILED TO GET POST',
            response,
        };
    } catch (error) {
        throw error;
    }
};

export const createPostService = async (id, body) => {
    try {
        let idPost = await db.POST.max('id');
        let idAttribute = await db.ATTRIBUTE.max('id');
        let idImg = await db.IMAGE.max('id');
        await db.ATTRIBUTE.create({
            id: +idAttribute + 1,
            price: +body.price,
            acreage: +body.acreage,
            address: body.address,
            districtId: body.districtId,
        });

        await db.IMAGE.create({
            id: +idImg + 1,
            path: JSON.stringify(body.ImgUrls),
        });

        const response = await db.POST.create({
            id: +idPost + 1,
            title: body.title,
            description: body.description,
            star: 0,
            attributeId: +idAttribute + 1,
            categoryCode: body.categoryCode,
            userId: id,
            imgsId: +idImg + 1,
        });

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'FAILED TO CREATE POST',
            response,
        };
    } catch (error) {
        throw error;
    }
};

export const updatePostService = async (body) => {
    try {
        await db.ATTRIBUTE.update(
            {
                price: +body.price,
                acreage: +body.acreage,
                address: body.address,
                districtId: body.districtId,
            },
            { where: { id: body.idPost } },
        );

        await db.IMAGE.update(
            {
                path: JSON.stringify(body.ImgUrls),
            },
            { where: { id: body.idPost } },
        );

        const response = await db.POST.update(
            {
                title: body.title,
                description: body.description,
                categoryCode: body.categoryCode,
            },
            { where: { id: body.idPost } },
        );

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'FAILED TO UPDATE POST',
            response,
        };
    } catch (error) {
        throw error;
    }
};

export const deletePostService = async (id) => {
    try {
        const response = await db.POST.destroy({
            where: { id },
        });
        await db.ATTRIBUTE.destroy({
            where: { id },
        });
        await db.IMAGE.destroy({
            where: { id },
        });
        return {
            err: response > 0 ? 0 : 1,
            msg: response > 0 ? 'DELETED' : 'FAILED TO DELETE POST',
            response,
        };
    } catch (error) {
        throw error;
    }
};

export const updatePostStatus = async () => {
    try {
        const expiredPosts = await db.POST.findAll({
            where: {
                expiredAt: {
                    [db.Sequelize.Op.lt]: new Date(),
                },
                status: 'approved',
            },
        });
        await Promise.all(
            expiredPosts.map(async (post) => {
                await post.update({ status: 'expired' });
            }),
        );

        console.log('Cập nhật trạng thái thành công.');
        return {
            err: 0,
            msg: 'Cập nhật ngày hết hạn thành công',
        };
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
        throw error;
    }
};

export const addPostToLiked = async (userId, postId) => {
    try {
        const isLiked = await db.USER_LIKE_POST.findOne({
            where: {
                userId,
                postId,
            },
        });
        if (isLiked) {
            removePostFromLiked(userId, postId);
            return {
                err: 0,
                msg: 'Đã xoá khỏi danh sách lưu',
            };
        }
        await db.USER_LIKE_POST.create({
            userId,
            postId,
        });
        return {
            err: 0,
            msg: 'Đã thêm vào danh sách lưu',
        };
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái lưu:', error);
        throw error;
    }
};

export const removePostFromLiked = async (userId, postId) => {
    try {
        await db.USER_LIKE_POST.destroy({
            where: {
                userId,
                postId,
            },
        });

        return {
            err: 0,
            msg: 'DELETED',
        };
    } catch (error) {
        throw error;
    }
};

export const getAllLikedPostsByUserId = async (userId) => {
    try {
        const response = await db.USER_LIKE_POST.findAll({
            where: {
                userId,
            },
            include: [
                {
                    model: db.POST,
                    as: 'liked_post',
                    include: [
                        { model: db.ATTRIBUTE, as: 'attribute', attributes: ['price', 'acreage', 'address'] },
                        {
                            model: db.USER,
                            as: 'user',
                            attributes: ['name', 'phone', 'avatar'],
                        },
                        { model: db.IMAGE, as: 'images', attributes: ['path'] },
                    ],
                },
            ],
        });
        return {
            err: 0,
            msg: 'Danh sách bài đăng yêu thích',
            response: response,
        };
    } catch (error) {
        console.error('Lỗi khi lấy bài đăng yêu thích:', error);
        throw error;
    }
};

export const getLikedPostsByUserId = async (userId, page) => {
    try {
        const response = await db.USER_LIKE_POST.findAll({
            where: {
                userId,
            },
            offset: page * +process.env.PAGE_DISPLAYED || 0,
            limit: +process.env.PAGE_DISPLAYED,
            include: [
                {
                    model: db.POST,
                    as: 'liked_post',
                    include: [
                        { model: db.ATTRIBUTE, as: 'attribute', attributes: ['price', 'acreage', 'address'] },
                        {
                            model: db.USER,
                            as: 'user',
                            attributes: ['name', 'phone', 'avatar'],
                        },
                        { model: db.IMAGE, as: 'images', attributes: ['path'] },
                    ],
                },
            ],
        });
        return {
            err: 0,
            msg: 'Danh sách bài đăng yêu thích',
            response: response,
        };
    } catch (error) {
        console.error('Lỗi khi lấy bài đăng yêu thích:', error);
        throw error;
    }
};

export const didUserLikePost = async (userId, postId) => {
    try {
        const isLiked = await db.USER_LIKE_POST.findOne({
            where: {
                userId,
                postId,
            },
        });

        return {
            err: 0,
            isLiked,
        };
    } catch (error) {
        console.error('Lỗi khi kiểm tra người dùng có lưu bài đăng hay không:', error);
        throw error;
    }
};

export const addPostToRating = async (userId, postId, star, comment) => {
    try {
        await db.USER_RATE_POST.create({
            userId,
            postId,
            star,
            comment,
        });
        await updatePostRating(postId);
        return {
            err: 0,
            msg: 'Đánh giá thành công',
        };
    } catch (error) {
        console.error('Lỗi khi đánh giá', error);
        throw error;
    }
};

const updatePostRating = async (postId) => {
    try {
        const ratings = await db.USER_RATE_POST.findAll({
            where: {
                postId,
            },
        });

        const totalRatings = ratings.length;
        const totalStars = ratings.reduce((sum, rating) => sum + rating.star, 0);
        const averageStar = totalRatings > 0 ? totalStars / totalRatings : 0;

        await db.POST.update(
            {
                star: averageStar,
            },
            {
                where: {
                    id: postId,
                },
            },
        );

        console.log('Cập nhật giá trị star thành công');
    } catch (error) {
        console.error('Lỗi khi cập nhật giá trị star', error);
        throw error;
    }
};

export const didUserRatePost = async (userId, postId) => {
    try {
        const isRated = await db.USER_RATE_POST.findOne({
            where: {
                userId,
                postId,
            },
        });
        return {
            err: 0,
            isRated,
        };
    } catch (error) {
        console.error('Lỗi khi kiểm tra người dùng có đánh giá bài đăng hay chưa:', error);
        throw error;
    }
};

export const getRatedByPostId = async (postId, page) => {
    try {
        const response = await db.USER_RATE_POST.findAll({
            where: {
                postId,
            },
            include: [
                {
                    model: db.USER,
                    as: 'rated_user',
                    attributes: ['id', 'name', 'avatar'],
                },
            ],
            offset: page * +process.env.PAGE_DISPLAYED || 0,
            limit: +process.env.PAGE_DISPLAYED,
            attributes: ['id', 'star', 'comment'],
            order: [['id', 'DESC']],
        });
        return {
            err: 0,
            msg: 'Danh sách đánh giá',
            response: response,
        };
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đánh giá của bài đăng:', error);
        throw error;
    }
};
