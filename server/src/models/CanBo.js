// //server/src/models/CanBo.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CanBo = sequelize.define(
  "CanBo",
  {
    MaCB: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    HoTenKhaiSinh: DataTypes.STRING(50),
    HoTenThuongDung: DataTypes.STRING(50),
    BiDanh: DataTypes.STRING(50),
    GioiTinh: DataTypes.STRING(3),
    CapBac: DataTypes.STRING(20),
    ChucVu: DataTypes.STRING(50),
    MaDV: DataTypes.INTEGER,
    NgaySinh: DataTypes.DATEONLY,
    NoiSinh: DataTypes.STRING(500),
    QueQuan: DataTypes.STRING(500),
    NoiDKHK: DataTypes.STRING(500),
    NoiTamTru: DataTypes.STRING(500),
    DanToc: DataTypes.STRING(15),
    TonGiao: DataTypes.STRING(20),
    ThanhPhanGD: DataTypes.STRING(50),
    NgheNghiep: DataTypes.STRING(50),
    Ngayvaodang: {type: DataTypes.DATEONLY, allowNull: true},
    Ngaychinhthuc: {type: DataTypes.DATEONLY, allowNull: true},
    Chibo: DataTypes.STRING(50),
    Ngayvaodoan: {type: DataTypes.DATEONLY, allowNull: true},
    Noiketnap: DataTypes.STRING(50),
    Trangthaidang: DataTypes.STRING(50),
    QuaTrinhPhanDau: DataTypes.STRING(500),
    NgayNhapNgu: {type: DataTypes.DATEONLY, allowNull: true},
    NgayCongTac: {type: DataTypes.DATEONLY, allowNull: true},
    ThamGiaTCXH: DataTypes.STRING(50),
    NgayThamGiaCM: {type: DataTypes.DATEONLY, allowNull: true},
    GDPT: DataTypes.STRING(20),
    ChuyenMonNV: DataTypes.STRING(50),
    LyLuanCT: DataTypes.STRING(50),
    NgoaiNgu: DataTypes.STRING(50),
    HocHam: DataTypes.STRING(50),
    HocVi: DataTypes.STRING(50),
    CongTacDangLam: DataTypes.STRING(100),
    SoCCCD: DataTypes.CHAR(12),
    TrangThai: DataTypes.STRING(20),
    NgayTao: DataTypes.DATEONLY,
    NgaySua: DataTypes.DATEONLY,
  },
  {
    tableName: "CanBo",
    timestamps: false,
  }
);

module.exports = CanBo;
