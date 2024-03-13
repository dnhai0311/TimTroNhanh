'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ADMIN extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    ADMIN.init(
        {
            name: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'ADMIN',
        },
    );
    return ADMIN;
};
