"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PRICE extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  PRICE.init(
    {
      value: DataTypes.STRING,
      min: DataTypes.STRING,
      max: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PRICE",
    }
  );
  return PRICE;
};
