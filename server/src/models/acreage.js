'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ACREAGE extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    ACREAGE.init(
        {
            value: DataTypes.STRING,
            min: DataTypes.STRING,
            max: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'ACREAGE',
        },
    );
    return ACREAGE;
};
