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
            USER_RATE_POST.belongsTo(models.USER, {
                foreignKey: 'userId',
                as: 'rated_user',
            });

            USER_RATE_POST.belongsTo(models.POST, {
                foreignKey: 'postId',
                as: 'rated_post',
            });
        }
    }
    USER_RATE_POST.init(
        {
            userId: DataTypes.INTEGER,
            postId: DataTypes.INTEGER,
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
