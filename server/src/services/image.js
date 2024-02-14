import db from '../models';

export const getImgsPath = async (id) => {
    try {
        const response = await db.IMAGE.findByPk(id);
        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'FAILED TO GET IMAGE',
            path: response.path,
        };
    } catch (error) {
        throw error;
    }
};
