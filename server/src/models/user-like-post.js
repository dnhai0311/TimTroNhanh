'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class USER_LIKE_POST extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            USER_LIKE_POST.hasMany(models.USER, {
                foreignKey: 'id',
                as: 'user',
            });
            USER_LIKE_POST.hasMany(models.POST, {
                foreignKey: 'id',
                as: 'post',
            });
        }
    }
    USER_LIKE_POST.init(
        {
            userId: DataTypes.INTEGER,
            postId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'USER_LIKE_POST',
        },
    );
    return USER_LIKE_POST;
};
