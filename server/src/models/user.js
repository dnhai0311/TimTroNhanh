'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class USER extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            USER.hasMany(models.POST, {
                foreignKey: 'userId',
                as: 'posts',
            });
            USER.hasMany(models.MESSAGE, {
                foreignKey: 'sender',
                as: 'sentMessages',
            });
            USER.hasMany(models.MESSAGE, {
                foreignKey: 'receiver',
                as: 'receivedMessages',
            });
            USER.belongsToMany(models.POST, {
                through: models.USER_LIKE_POST,
                foreignKey: 'userId',
                as: 'user_like_post',
            });
            USER.belongsTo(models.USER_LIKE_POST, {
                foreignKey: 'id',
                target: 'userId',
                as: 'liked_posts',
            });
            USER.belongsToMany(models.POST, {
                through: models.USER_RATE_POST,
                foreignKey: 'userId',
                as: 'user_rate_post',
            });
            USER.belongsTo(models.USER_RATE_POST, {
                foreignKey: 'id',
                target: 'userId',
                as: 'rated_posts',
            });
        }
    }
    USER.init(
        {
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            phone: DataTypes.STRING,
            money: DataTypes.FLOAT,
            facebook: DataTypes.STRING,
            avatar: DataTypes.STRING,
            type: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'USER',
        },
    );
    return USER;
};
