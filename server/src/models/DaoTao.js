const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DaoTao = sequelize.define(
  "DaoTao",
  {
    MaCT: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    TenCT: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    MaDM: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    NgayBatDau: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    NgayKetThuc: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    DiaDiem: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    MaTrangThai: {
      type: DataTypes.CHAR(10),
      allowNull: true,
    },
    Khoa: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "ChuongTrinhDaoTao",
    timestamps: false,
  }
);

module.exports = DaoTao;