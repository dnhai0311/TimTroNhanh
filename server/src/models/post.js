'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class POST extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            POST.belongsTo(models.IMAGE, {
                foreignKey: 'imgsId',
                targetKey: 'id',
                as: 'images',
            });
            POST.belongsTo(models.ATTRIBUTE, {
                foreignKey: 'attributeId',
                targetKey: 'id',
                as: 'attribute',
            });
            POST.belongsTo(models.POST_CATEGORY, {
                foreignKey: 'typePostId',
                targetKey: 'id',
                as: 'postCategory',
            });
            POST.belongsTo(models.USER, {
                foreignKey: 'userId',
                targetKey: 'id',
                as: 'user',
            });
            POST.belongsTo(models.CATEGORY, {
                foreignKey: 'categoryCode',
                targetKey: 'code',
                as: 'category',
            });
            POST.belongsToMany(models.USER, { through: models.USER_POST, foreignKey: 'postId' });
        }
    }
    POST.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            star: DataTypes.STRING,
            status: {
                type: DataTypes.ENUM('payment', 'pending', 'approved', 'rejected', 'expired'),
                defaultValue: 'payment',
            },
            imgsId: DataTypes.INTEGER,
            categoryCode: DataTypes.STRING,
            attributeId: DataTypes.INTEGER,
            typePostId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            expiredAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'POST',
        },
    );

    // Phải thay đổi ngày hết hạn thì mới chạy, sau này cài node cron -> set định kỳ mỗi ngày set status lại
    // POST.addHook('beforeUpdate', (post, options) => {
    //     if (post.changed('expiredAt') && post.expiredAt <= new Date()) {
    //         post.status = 'expired';
    //     }
    // });

    return POST;
};
