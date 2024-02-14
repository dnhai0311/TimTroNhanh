import db from '../models';

export const getCategoriesService = async () => {
    try {
        const response = await db.CATEGORY.findAll({
            raw: true,
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });

        return {
            err: response.length > 0 ? 0 : 1,
            msg: response.length > 0 ? 'OK' : 'FAILED TO GET CATEGORIES',
            response: response,
        };
    } catch (error) {
        throw error;
    }
};
