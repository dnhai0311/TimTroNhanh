import * as userServices from '../services/user';
import { HashPassword } from '../services/auth';
import { deleteImage } from '../middlewares/cloudinary';
import { getPublicId } from '../utils/commons/getPublicId';

export const getUser = async (req, res) => {
    const { id, phone } = req.query;
    try {
        const response = await userServices.getUserService(id, phone);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const getCurrentUser = async (req, res) => {
    const { id } = req.user;
    try {
        const response = await userServices.getCurrentUserService(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const getAllPosts = async (req, res) => {
    const { id } = req.user;
    try {
        const response = await userServices.getAllPostsService(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.user;
    const { avatar, name, facebook, newPassword, oldPassword } = req.body;

    try {
        if (avatar) {
            const response = await userServices.getAvatar(id);
            const publicId = getPublicId(response.avatar);
            publicId !== process.env.ID_DEFAULT_AVATAR && deleteImage(publicId);
            await userServices.updateUserAvatar(id, avatar);
        }

        if (oldPassword && newPassword) {
            const isPasswordCorrect = await userServices.checkPassword(id, oldPassword);
            if (!isPasswordCorrect) {
                return res.status(200).json({
                    success: false,
                    message: 'Sai mật khẩu',
                });
            }
            await userServices.updateUserPassword(id, HashPassword(newPassword));
        }
        if (name || facebook) {
            await userServices.updateUserInfo(id, {
                name,
                facebook,
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Cập nhật thành công',
        });
    } catch (error) {
        console.error('Failed at controller:', error);
        return res.status(500).json({
            success: false,
            message: 'Cập nhật không thành công',
        });
    }
};

export const resetPassword = async (req, res) => {
    const { id, isResetPassword } = req.user;
    const { newPassword } = req.body;
    try {
        if (!newPassword) {
            return res.status(200).json({
                success: false,
                message: 'Vui lòng nhập mật khẩu mới',
            });
        }
        if (isResetPassword) {
            await userServices.updateUserPassword(id, HashPassword(newPassword));
            return res.status(200).json({
                success: true,
                message: 'Đặt lại mật khẩu thành công',
            });
        }
        return res.status(200).json({
            success: false,
            message: 'Không thể đặt lại mật khẩu vì token không chính xác',
        });
    } catch (error) {
        console.error('Failed at controller:', error);
        return res.status(500).json({
            success: false,
            message: 'Đặt lại mật khẩu thất bại',
        });
    }
};
