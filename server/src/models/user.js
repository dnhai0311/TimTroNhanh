"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class USER extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      USER.hasMany(models.POST, {
        foreignKey: "userId",
        as: "posts",
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
      modelName: "USER",
    }
  );
  return USER;
};
