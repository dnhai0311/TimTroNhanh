'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class USER_RATE_POST extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            USER_RATE_POST.hasMany(models.USER, {
                foreignKey: 'id',
                as: 'user',
            });
            USER_RATE_POST.hasMany(models.POST, {
                foreignKey: 'id',
                as: 'post',
            });
        }
    }
    USER_RATE_POST.init(
        {
            userId: DataTypes.INTEGER,
            postID: DataTypes.INTEGER,
            comment: DataTypes.STRING,
            star: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'USER_RATE_POST',
        },
    );
    return USER_RATE_POST;
};
