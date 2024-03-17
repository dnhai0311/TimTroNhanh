'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PAYMENT extends Model {
        static associate(models) {
            PAYMENT.belongsTo(models.USER, {
                foreignKey: 'userId',
                targetKey: 'id',
                as: 'user',
            });
        }
    }

    PAYMENT.init(
        {
            userId: DataTypes.INTEGER,
            amount: DataTypes.INTEGER,
            type: DataTypes.STRING,
            status: {
                type: DataTypes.ENUM('payment', 'success', 'failure'),
                defaultValue: 'payment',
            },
        },
        {
            sequelize,
            modelName: 'PAYMENT',
        },
    );

    PAYMENT.addHook('afterCreate', (payment, options) => {
        setTimeout(async () => {
            const updatedPayment = await PAYMENT.findByPk(payment.id);
            if (updatedPayment.status !== 'success') {
                await updatedPayment.update({ status: 'failure' });
            }
        }, 15 * 60 * 1000); // 15 phút
    });

    return PAYMENT;
};
