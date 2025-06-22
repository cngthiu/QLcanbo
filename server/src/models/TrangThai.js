const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const TrangThai = sequelize.define(
  "TrangThai",
  {
    MaTrangThai: {
      type: DataTypes.CHAR(10),
      primaryKey: true,
      allowNull: true,
    },
    TenTrangThai: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "TrangThai",
    timestamps: false,
  }
);

module.exports = TrangThai;
