'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PROVINCE extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            PROVINCE.hasMany(models.DISTRICT, {
                foreignKey: 'provinceId',
                as: 'districts',
            });
        }
    }
    PROVINCE.init(
        {
            value: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'PROVINCE',
        },
    );
    return PROVINCE;
};
