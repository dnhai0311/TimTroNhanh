import db from '../models';
import bcrypt from 'bcryptjs';

export const getAvatar = async (id) => {
    try {
        const response = await db.USER.findByPk(id);
        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'FAILED TO GET IMAGE',
            avatar: response.avatar,
        };
    } catch (error) {
        throw error;
    }
};

export const getUserService = async (id, phone) => {
    try {
        const whereCondition = {};
        if (id !== undefined) {
            whereCondition[db.Sequelize.Op.or] = [{ id }];
        }
        if (phone !== undefined) {
            whereCondition[db.Sequelize.Op.or] = [...(whereCondition[db.Sequelize.Op.or] || []), { phone }];
        }

        const response = await db.USER.findOne({
            where: whereCondition,
            raw: true,
            attributes: ['id', 'name', 'avatar'],
        });

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'FAILED TO GET USER',
            response,
        };
    } catch (error) {
        throw error;
    }
};

export const getCurrentUserService = async (id) => {
    try {
        const response = await db.USER.findOne({
            where: { id },
            raw: true,
            attributes: ['id', 'name', 'avatar', 'phone', 'money', 'facebook'],
        });

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'FAILED TO GET USER',
            response,
        };
    } catch (error) {
        throw error;
    }
};

export const getAllPostsService = async (id) => {
    try {
        const response = await db.POST.findAndCountAll({
            raw: true,
            attributes: [
                ['id', 'postId'],
                [db.Sequelize.literal('images.path'), 'postImg'],
                'title',
                [db.Sequelize.literal('attribute.price'), 'price'],
                'updatedAt',
                'expiredAt',
                'status',
            ],
            include: [
                {
                    model: db.USER,
                    as: 'user',
                    attributes: [],
                    where: { id },
                },
                {
                    model: db.IMAGE,
                    as: 'images',
                    attributes: [],
                },
                {
                    model: db.ATTRIBUTE,
                    as: 'attribute',
                    attributes: [],
                },
            ],
        });

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'FAILED TO GET POST FORM USER',
            response,
        };
    } catch (error) {
        throw error;
    }
};

export const updateUserAvatar = async (id, newAvatarUrl) => {
    try {
        await db.USER.update({ avatar: newAvatarUrl }, { where: { id } });
    } catch (error) {
        throw error;
    }
};

export const updateUserInfo = async (id, updatedInfo) => {
    try {
        await db.USER.update(updatedInfo, { where: { id } });
    } catch (error) {
        throw error;
    }
};

export const updateUserPassword = async (id, newPassword) => {
    try {
        await db.USER.update({ password: newPassword }, { where: { id } });
    } catch (error) {
        throw error;
    }
};

export const checkPassword = async (userId, enteredPassword) => {
    try {
        const user = await db.USER.findOne({
            where: { id: userId },
        });

        if (!user) {
            return false;
        }

        const isPasswordCorrect = bcrypt.compareSync(enteredPassword, user.password);
        return isPasswordCorrect;
    } catch (error) {
        throw error;
    }
};
