import db from '../models';

export const getPotCategories = async () => {
    try {
        const response = await db.POST_CATEGORY.findAll({
            raw: true,
            attributes: ['id', 'value', 'info', 'perDay', 'perWeek', 'perMonth'],
        });

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'FAILED TO GET POST CATEGORIES',
            response,
        };
    } catch (error) {
        throw error;
    }
};
