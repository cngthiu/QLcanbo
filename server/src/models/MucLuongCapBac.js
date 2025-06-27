const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MucLuongCapBac = sequelize.define(
  "MucLuongCapBac",
  {
    MaMucLuong: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CapBac: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    BacLuong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    HeSoLuong: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    LuongCoBan: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    NgayApDung: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    NgayKetThuc: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    TrangThai: {
      type: DataTypes.STRING(20),
      defaultValue: "Đang áp dụng",
    },
    GhiChu: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: "MucLuongCapBac",
    timestamps: false,
  }
);

module.exports = MucLuongCapBac;