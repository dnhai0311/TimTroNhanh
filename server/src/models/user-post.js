'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class USER_POST extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            USER_POST.hasMany(models.USER, {
                foreignKey: 'id',
                as: 'user',
            });
            USER_POST.hasMany(models.POST, {
                foreignKey: 'id',
                as: 'post',
            });
        }
    }
    USER_POST.init(
        {
            userId: DataTypes.INTEGER,
            postId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'USER_POST',
        },
    );
    return USER_POST;
};
