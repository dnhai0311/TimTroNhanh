'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class POST_CATEGORY extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            POST_CATEGORY.hasMany(models.POST, {
                foreignKey: 'typePostId',
                as: 'posts',
            });
        }
    }
    POST_CATEGORY.init(
        {
            name: DataTypes.STRING,
            info: DataTypes.STRING,
            perDay: DataTypes.STRING,
            perWeek: DataTypes.STRING,
            perMonth: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'POST_CATEGORY',
        },
    );
    return POST_CATEGORY;
};
