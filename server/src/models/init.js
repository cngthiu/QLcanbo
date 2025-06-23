const User = require("./User");
const Role = require("./Role");
const Role_User = require("./RoleUser");
const BangCap = require("./BangCap");
const CanBo = require("./CanBo");
const Loai_BC = require("./Loai_BC");
const DonVi = require("./DonVi");
const QuaTrinhCongTac = require("./QuaTrinhCongTac");
const LichSuThayDoi_BC = require("./LichSuThayDoi_BC");

// Import các model mới
const BangLuong = require("./BangLuong");
const MucLuongCapBac = require("./MucLuongCapBac");

console.log("🔍 Checking models:");
console.log("BangLuong:", !!BangLuong);
console.log("CanBo:", !!CanBo);
console.log("DonVi:", !!DonVi);
console.log("MucLuongCapBac:", !!MucLuongCapBac);

// User-Role relationships
User.belongsToMany(Role, { through: Role_User, foreignKey: "UserId" });
Role.belongsToMany(User, { through: Role_User, foreignKey: "roleId" });

// CanBo - DonVi relationships
CanBo.belongsTo(DonVi, { foreignKey: "MaDV" });
DonVi.hasMany(CanBo, { foreignKey: "MaDV" });

// CanBo - QuaTrinhCongTac relationships
CanBo.hasMany(QuaTrinhCongTac, { foreignKey: "MaCB" });
QuaTrinhCongTac.belongsTo(CanBo, { foreignKey: "MaCB" });

// BangCap relationships
BangCap.belongsTo(CanBo, { foreignKey: "MaGV", as: "NguoiSoHuu" });
BangCap.belongsTo(Loai_BC, { foreignKey: "MaLBC" });
BangCap.hasMany(LichSuThayDoi_BC, { foreignKey: "MaBC" });
LichSuThayDoi_BC.belongsTo(BangCap, { foreignKey: "MaBC" });

// BangLuong relationships
BangLuong.belongsTo(CanBo, { foreignKey: "MaCB" });
CanBo.hasMany(BangLuong, { foreignKey: "MaCB" });

console.log("✅ Models relationships established");

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
  BangLuong,
  MucLuongCapBac,
};