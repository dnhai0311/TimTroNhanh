"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DISTRICT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DISTRICT.hasMany(models.ATTRIBUTE, {
        foreignKey: "districtId",
        as: "attributes",
      });
      DISTRICT.belongsTo(models.PROVINCE, {
        foreignKey: "provinceId",
        targetKey: "id",
        as: "province",
      });
    }
  }
  DISTRICT.init(
    {
      value: DataTypes.STRING,
      provinceId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DISTRICT",
    }
  );
  return DISTRICT;
};
