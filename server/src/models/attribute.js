"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ATTRIBUTE extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ATTRIBUTE.hasOne(models.POST, {
        foreignKey: "attributeId",
        as: "attribute",
      });
      ATTRIBUTE.belongsTo(models.DISTRICT, {
        foreignKey: "districtId",
        targetKey: "id",
        as: "district",
      });
      ATTRIBUTE.belongsTo(models.CATEGORY, {
        foreignKey: "categoryId",
        targetKey: "id",
        as: "category",
      });
    }
  }
  ATTRIBUTE.init(
    {
      price: DataTypes.STRING,
      area: DataTypes.STRING,
      location: DataTypes.STRING,
      districtId: DataTypes.STRING,
      categoryId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ATTRIBUTE",
    }
  );
  return ATTRIBUTE;
};
