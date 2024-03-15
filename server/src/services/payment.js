import db from '../models';

export const createPayment = async (id, userId, type, amount, status) => {
    try {
        const response = await db.PAYMENT.create({
            id,
            userId,
            type,
            amount,
            status: status || 'pending',
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

export const isTopUped = async (id) => {
    try {
        const response = await db.PAYMENT.findByPk(id);

        if (response.status === 'pending') {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
        throw error;
    }
};

export const updatePaymentStatus = async (id, status) => {
    try {
        await db.PAYMENT.update({ status }, { where: { id } });
        return {
            err: 0,
            msg: 'Cập nhật trạng thái Thành công',
        };
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
        throw error;
    }
};

export const getAllPaymentsFromUserId = async (userId) => {
    try {
        const response = await db.PAYMENT.findAndCountAll({
            raw: true,
            where: {
                userId,
            },
            attributes: ['id', 'amount', 'type', 'status', 'createdAt', 'updatedAt'],
        });

        return {
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'FAILED TO GET PAYMENT FORM USER',
            response,
        };
    } catch (error) {
        throw error;
    }
};

export const getTotalPaymentsByStatus = async () => {
    try {
        const response = await db.PAYMENT.findAll({
            attributes: ['status', [db.sequelize.fn('COUNT', 'status'), 'count']],
            group: ['status'],
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getTotalPaymentsByMonth = async () => {
    try {
        const response = await db.PAYMENT.findAll({
            attributes: [
                [db.sequelize.literal("DATE_FORMAT(updatedAt, '%Y-%m')"), 'month'],
                'type',
                'status',
                [db.sequelize.fn('SUM', db.sequelize.col('amount')), 'totalAmount'],
            ],
            where: {
                status: 'success',
            },
            group: ['month', 'type', 'status'],
        });
        return response;
    } catch (error) {
        throw error;
    }
};
