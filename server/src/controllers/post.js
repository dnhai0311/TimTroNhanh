import * as postService from '../services/post';
import { getImgsPath } from '../services/image';
import { filter } from '../utils/commons/filter';
import { deleteImage } from '../middlewares/cloudinary';
import { io } from '../../socket/socket';

export const getAllPosts = async (req, res) => {
    const { isAdmin } = req.user;
    const { status } = req.query;
    try {
        if (!isAdmin)
            return res.status(403).json({
                err: 1,
                msg: 'Bạn không phải administrator',
            });

        const response = await postService.getAllPostsService(status);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const getPosts = async (req, res) => {
    const {
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
    } = req.query;
    try {
        const response = await postService.getPostsService(
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
        );
        postService.updateAllPostsStatus(); //call vu vo
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const getOnePost = async (req, res) => {
    const { id } = req.query;

    try {
        const response = await postService.getOnePostService(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const createPost = async (req, res) => {
    const { id } = req.user;
    const { title, description, categoryCode, price, acreage, address, districtId, ImgUrls } = req.body;
    // console.log(description);
    try {
        if (!title || !description || !categoryCode || !price || !acreage || !address || !districtId || !ImgUrls) {
            return res.status(400).json({
                err: 1,
                msg: 'missing input',
            });
        }
        const response = await postService.createPostService(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const updatePost = async (req, res) => {
    const { idPost, title, description, categoryCode, price, acreage, address, districtId, ImgUrls, userId } = req.body;
    const { id } = req.user;
    try {
        if (
            !idPost ||
            !title ||
            !description ||
            !categoryCode ||
            !price ||
            !acreage ||
            !address ||
            !districtId ||
            !ImgUrls ||
            !userId
        ) {
            return res.status(400).json({
                err: 1,
                msg: 'missing input',
            });
        }
        if (id != userId) {
            // console.log(id);
            // console.log(userId);
            return res.status(401).json({
                err: 1,
                msg: "user isn't matching",
            });
        }
        const paths = await getImgsPath(idPost);
        const deletedImages = filter(paths.path, ImgUrls);
        if (deletedImages.length > 0) {
            for (const publicId of deletedImages) {
                deleteImage(publicId);
            }
        }

        const response = await postService.updatePostService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.query;
    try {
        const paths = await getImgsPath(id);
        const deletedImages = filter(paths.path, []);
        if (deletedImages.length > 0) {
            for (const publicId of deletedImages) {
                deleteImage(publicId);
            }
        }
        const response = await postService.deletePostService(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const likePost = async (req, res) => {
    const { postId } = req.query;
    const { id } = req.user;
    try {
        if (!postId) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing input',
            });
        }

        const response = await postService.addPostToLiked(id, postId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const unlikePost = async (req, res) => {
    const { postId } = req.query;
    const { id } = req.user;

    try {
        if (!postId) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing input',
            });
        }

        const response = await postService.removePostFromLiked(id, postId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const getAllLikedPosts = async (req, res) => {
    const { id } = req.user;

    try {
        const response = await postService.getAllLikedPostsByUserId(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const getLikedPosts = async (req, res) => {
    const { page } = req.query;
    const { id } = req.user;

    try {
        const response = await postService.getLikedPostsByUserId(id, page);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const didUserLikePost = async (req, res) => {
    const { postId } = req.query;
    const { id } = req.user;

    try {
        if (!postId) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing input',
            });
        }
        const response = await postService.didUserLikePost(id, postId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const ratePost = async (req, res) => {
    const { postId, star, comment } = req.query;
    const { id } = req.user;

    try {
        if (!postId || !star || !comment) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing input',
            });
        }

        const response = await postService.addPostToRating(id, postId, star, comment);
        io.emit('new-rated', postId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const didUserRatePost = async (req, res) => {
    const { postId } = req.query;
    const { id } = req.user;

    try {
        if (!postId) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing input',
            });
        }
        const response = await postService.didUserRatePost(id, postId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const getRated = async (req, res) => {
    const { postId, page } = req.query;
    try {
        if (!postId) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing input',
            });
        }

        const response = await postService.getRatedByPostId(postId, page);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const didUserCreatePost = async (req, res) => {
    const { postId } = req.query;
    const { id } = req.user;

    try {
        if (!postId) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing input',
            });
        }
        const response = await postService.didUserCreatePost(id, postId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const getTotalPostsByStatus = async (req, res) => {
    const { isAdmin } = req.user;
    try {
        if (!isAdmin)
            return res.status(403).json({
                err: 1,
                msg: 'Bạn không phải administrator',
            });

        const response = await postService.getTotalPostsByStatus();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const updatePostStatus = async (req, res) => {
    const { postId } = req.params;
    const { status } = req.query;
    const { isAdmin } = req.user;
    try {
        if (!isAdmin) {
            return res.status(403).json({
                err: 1,
                msg: 'Bạn không phải administrator',
            });
        }
        const response = await postService.updatePostStatus(postId, status);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};
