"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CATEGORY extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CATEGORY.hasMany(models.POST, {
        foreignKey: "categoryCode",
        as: "posts",
      });
    }
  }
  CATEGORY.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CATEGORY",
    }
  );
  return CATEGORY;
};
