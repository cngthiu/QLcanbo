const { DaoTao, DMDaoTao, TrangThai, CanBo, DonVi, CTDT_CanBo } = require("../models/init");
const { Op } = require("sequelize");

// Lấy tất cả chương trình đào tạo, có filter nếu cần
const getAllDaoTao = async (filters = {}) => {
  const { keyword = "" } = filters;
  const whereClause = {};
  if (keyword) {
    whereClause.TenCT = { [Op.like]: `%${keyword}%` };
  }
  try {
    const list = await DaoTao.findAll({
      where: whereClause,
      include: [
        {
          model: DMDaoTao,
          as: "DanhMuc",
          attributes: ["MaDM", "TenDM", "MoTa"],
        },
        {
          model: TrangThai,
          as: "TrangThai",
          attributes: ["MaTrangThai", "TenTrangThai"],
        },
      ],
      order: [["MaCT", "DESC"]],
    });
    return list.map((ct) => ct.get({ plain: true }));
  } catch (error) {
    console.error("LỖI KHI LẤY CHƯƠNG TRÌNH ĐÀO TẠO:", error);
    throw error;
  }
};

const getAllTrangThai = async () => {
  return await TrangThai.findAll();
};
// Thêm mới chương trình đào tạo
const createDaoTao = async (data) => {
  return await DaoTao.create(data);
};

// Sửa chương trình đào tạo
const updateDaoTao = async (id, data) => {
  const record = await DaoTao.findByPk(id);
  if (!record) throw new Error("NOT_FOUND");
  await record.update(data);
  return record;
};

// Xóa chương trình đào tạo
const removeDaoTao = async (id) => {
  const record = await DaoTao.findByPk(id);
  if (!record) throw new Error("NOT_FOUND");
  await record.destroy();
  return true;
};
// Truy vấn thông tin tham gia đào tạo (join nhiều bảng)
const getThamGiaByMaCT = async (MaCT) => {
  const where = {};
  if (MaCT) where.MaCT = MaCT;

  const list = await CTDT_CanBo.findAll({
    where,
    include: [
      {
        model: CanBo,
        attributes: ["MaCB", "HoTenKhaiSinh", "CapBac", "MaDV"],
        include: [
          {
            model: DonVi,
            attributes: ["TenDV"],
          },
        ],
      },
      {
        model: DaoTao,
        attributes: ["MaCT", "TenCT", "Khoa", "MaDM", "NgayBatDau", "NgayKetThuc", "DiaDiem"],
        include: [
          {
            model: DMDaoTao,
            as: "DanhMuc",
            attributes: ["TenDM"],
          },
        ],
      },
    ],
    order: [["MaCB", "ASC"]],
  });
  // Map lại dữ liệu phẳng
  return list.map(item => ({
    MaCB: item.CanBo?.MaCB,
    HoTenKhaiSinh: item.CanBo?.HoTenKhaiSinh,
    CapBac: item.CanBo?.CapBac,
    MaDV: item.CanBo?.MaDV,
    TenDV: item.CanBo?.DonVi?.TenDV,
    MaCT: item.DaoTao?.MaCT,
    TenCT: item.DaoTao?.TenCT,
    Khoa: item.DaoTao?.Khoa,
    MaDM: item.DaoTao?.MaDM,
    TenDM: item.DaoTao?.DanhMuc?.TenDM,
    NgayBatDau: item.DaoTao?.NgayBatDau,
    NgayKetThuc: item.DaoTao?.NgayKetThuc,
    DiaDiem: item.DaoTao?.DiaDiem,
  }));
};

// Tìm kiếm cán bộ theo tên
const searchCanBoByName = async (keyword) => {
  try {
    const list = await CanBo.findAll({
      where: {
        HoTenKhaiSinh: { [Op.like]: `%${keyword}%` },
      },
      include: [
        {
          model: DonVi,
          attributes: ["TenDV"],
        },
      ],
      attributes: ["MaCB", "HoTenKhaiSinh", "ChucVu", "CapBac", "MaDV"],
    });
    return list.map((canBo) => canBo.get({ plain: true }));
  } catch (error) {
    console.error("LỖI KHI TÌM KIẾM CÁN BỘ:", error);
    throw error;
  }
};

// Thêm cán bộ vào danh sách tham gia chương trình đào tạo
const addCanBoToCTDT = async (MaCT, data) => {
  try {
    const { MaCB } = data;
    // Check if CanBo exists
    const canBo = await CanBo.findByPk(MaCB);
    if (!canBo) throw new Error("CANBO_NOT_FOUND");
    // Check if DaoTao exists
    const daoTao = await DaoTao.findByPk(MaCT);
    if (!daoTao) throw new Error("DAOTAO_NOT_FOUND");
    // Check if already enrolled
    const existing = await CTDT_CanBo.findOne({ where: { MaCT, MaCB } });
    if (existing) throw new Error("CANBO_ALREADY_ENROLLED");
    // Add to CTDT_CanBo
    const result = await CTDT_CanBo.create({ MaCT, MaCB, ThamGia: "ThamGia" });
    return result.get({ plain: true });
  } catch (error) {
    console.error("LỖI KHI THÊM CÁN BỘ VÀO CTDT:", error);
    throw error;
  }
};

const removeCanBoFromCTDT = async (MaCT, MaCB) => {
  const record = await CTDT_CanBo.findOne({ where: { MaCT, MaCB } });
  if (!record) throw new Error("NOT_FOUND");
  await record.destroy();
  return true;
};

module.exports = {
  getAllDaoTao,
  createDaoTao,
  updateDaoTao,
  removeDaoTao,
  getAllTrangThai,
  getThamGiaByMaCT,
  searchCanBoByName,
  addCanBoToCTDT,
  removeCanBoFromCTDT,
};