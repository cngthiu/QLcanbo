//server/src/models/init.js
const User = require("./User");
const Role = require("./Role");
const Role_User = require("./RoleUser");
const BangCap = require("./BangCap");
const CanBo = require("./CanBo");
const Loai_BC = require("./Loai_BC");
const DonVi = require("./DonVi");
const QuaTrinhCongTac = require("./QuaTrinhCongTac");
const LichSuThayDoi_BC = require("./LichSuThayDoi_BC");
const DMDaoTao = require("./DMDaoTao");
const TrangThai = require("./TrangThai");
const DaoTao = require("./DaoTao");
const CTDT_CanBo = require("./CTDT_CanBo");

// User-Role
User.belongsToMany(Role, { through: Role_User, foreignKey: "UserId" });
Role.belongsToMany(User, { through: Role_User, foreignKey: "roleId" });
// CanBo - DonVi
CanBo.belongsTo(DonVi, { foreignKey: "MaDV" });
DonVi.hasMany(CanBo, { foreignKey: "MaDV" });

// CanBo - QuaTrinhCongTac
CanBo.hasMany(QuaTrinhCongTac, { foreignKey: "MaCB" });
QuaTrinhCongTac.belongsTo(CanBo, { foreignKey: "MaCB" });

// BangCap - CanBo (người sở hữu)
BangCap.belongsTo(CanBo, { foreignKey: "MaGV", as: "NguoiSoHuu" });

// BangCap - Loai_BC
BangCap.belongsTo(Loai_BC, { foreignKey: "MaLBC" });

// BangCap - LichSuThayDoi_BC
BangCap.hasMany(LichSuThayDoi_BC, { foreignKey: "MaBC" });
LichSuThayDoi_BC.belongsTo(BangCap, { foreignKey: "MaBC" });

// DMDaoTao - TrangThai
DMDaoTao.belongsTo(TrangThai, { foreignKey: "MaTrangThai" });
TrangThai.hasMany(DMDaoTao, { foreignKey: "MaTrangThai" });

// DaoTao - DMDaoTao
DMDaoTao.hasMany(DaoTao, { foreignKey: "MaDM" });
DaoTao.belongsTo(DMDaoTao, { foreignKey: "MaDM", as: "DanhMuc" });
// DaoTao - TrangThai
TrangThai.hasMany(DaoTao, { foreignKey: "MaTrangThai" });
DaoTao.belongsTo(TrangThai, { foreignKey: "MaTrangThai", as: "TrangThai" });

// Liên kết CTDT_CanBo với CanBo và DaoTao
CanBo.belongsToMany(DaoTao, { through: CTDT_CanBo, foreignKey: "MaCB", otherKey: "MaCT" });
DaoTao.belongsToMany(CanBo, { through: CTDT_CanBo, foreignKey: "MaCT", otherKey: "MaCB" });

CTDT_CanBo.belongsTo(CanBo, { foreignKey: "MaCB" });
CTDT_CanBo.belongsTo(DaoTao, { foreignKey: "MaCT" });
CanBo.hasMany(CTDT_CanBo, { foreignKey: "MaCB" });
DaoTao.hasMany(CTDT_CanBo, { foreignKey: "MaCT" });

module.exports = {
  User,
  Role,
  Role_User,
  BangCap,
  CanBo,
  DonVi,
  Loai_BC,
  QuaTrinhCongTac,
  LichSuThayDoi_BC,
  DMDaoTao,
  TrangThai,
  DaoTao,
  CTDT_CanBo,
};
