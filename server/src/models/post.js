"use strict";
const { Model } = require("sequelize");
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
        foreignKey: "imgsId",
        targetKey: "id",
        as: "images",
      });
      POST.belongsTo(models.ATTRIBUTE, {
        foreignKey: "attributeId",
        targetKey: "id",
        as: "attribute",
      });
      POST.belongsTo(models.POST_CATEGORY, {
        foreignKey: "typeId",
        targetKey: "id",
        as: "postCategory",
      });
      POST.belongsTo(models.USER, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });
      POST.belongsTo(models.CATEGORY, {
        foreignKey: "categoryCode",
        targetKey: "code",
        as: "category",
      });
    }
  }
  POST.init(
    {
      name: DataTypes.STRING,
      info: DataTypes.TEXT,
      star: DataTypes.STRING,
      dayRented: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      imgsId: DataTypes.STRING,
      categoryCode: DataTypes.STRING,
      attributeId: DataTypes.STRING,
      typeId: DataTypes.STRING,
      userId: DataTypes.STRING,
      acreageCode: DataTypes.STRING,
      priceCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "POST",
    }
  );
  return POST;
};
