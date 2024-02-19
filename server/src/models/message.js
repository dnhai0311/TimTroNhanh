'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MESSAGE extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            MESSAGE.belongsTo(models.USER, {
                foreignKey: 'sender',
                targetKey: 'id',
                as: 'sentUser',
            });
            MESSAGE.belongsTo(models.USER, {
                foreignKey: 'receiver',
                targetKey: 'id',
                as: 'receiveUser',
            });
        }
    }
    MESSAGE.init(
        {
            sender: DataTypes.INTEGER,
            receiver: DataTypes.INTEGER,
            value: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'MESSAGE',
        },
    );
    return MESSAGE;
};
