'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ATTRIBUTE extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ATTRIBUTE.hasOne(models.POST, {
                foreignKey: 'attributeId',
                as: 'post',
            });
            ATTRIBUTE.belongsTo(models.DISTRICT, {
                foreignKey: 'districtId',
                targetKey: 'id',
                as: 'district',
            });
        }
    }
    ATTRIBUTE.init(
        {
            price: DataTypes.FLOAT,
            acreage: DataTypes.FLOAT,
            address: DataTypes.STRING,
            districtId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'ATTRIBUTE',
        },
    );
    return ATTRIBUTE;
};
