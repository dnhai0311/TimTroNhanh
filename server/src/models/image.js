"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IMAGE extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      IMAGE.hasOne(models.POST, {
        foreignKey: "imgsId",
        as: "images",
      });
    }
  }
  IMAGE.init(
    {
      path: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "IMAGE",
    }
  );
  return IMAGE;
};
