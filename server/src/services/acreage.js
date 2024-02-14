import db from '../models';

export const getAcreagesService = async () => {
    try {
        const response = await db.ACREAGE.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'value', 'min', 'max'],
        });

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'FAILED TO GET PRICES',
            response,
        };
    } catch (error) {
        throw error;
    }
};
