import db from '../models';

export const getPricesService = async () => {
    try {
        const response = await db.PRICE.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'value', 'min', 'max'],
        });

        return {
            err: response.length > 0 ? 0 : 1,
            msg: response.length > 0 ? 'OK' : 'FAILED TO GET PRICES',
            response: response,
        };
    } catch (error) {
        throw error;
    }
};
