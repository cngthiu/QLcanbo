const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const TrangThai = require("./TrangThai");

const DMDaoTao = sequelize.define(
  "DMDaoTao",
  {
    MaDM: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    TenDM: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    MoTa: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    MaTrangThai: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    NgayCapNhat: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "DanhMucDaoTao",
    timestamps: false,
  }
);


TrangThai.hasMany(DMDaoTao, { foreignKey: "MaTrangThai" });

module.exports = DMDaoTao;
