const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CTDT_CanBo = sequelize.define(
  "CTDT_CanBo",
  {
    MaCT: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    MaCB: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    ThamGia: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "CTDT_CanBo",
    timestamps: false,
  }
);

module.exports = CTDT_CanBo;
