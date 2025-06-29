const { DMDaoTao, TrangThai } = require("../models/init"); // Destructuring để lấy DMDaoTao
const { Op } = require("sequelize");

const getAllDMDaoTao = async (filters = {}) => {
  const { keyword = "", page = 1, pageSize = 5 } = filters;
  const whereClause = {};
  if (keyword) {
    whereClause.TenDM = { [Op.like]: `%${keyword}%` };
  }
  const offset = (parseInt(page) - 1) * parseInt(pageSize);
  const limit = parseInt(pageSize);
  try {
    const { rows, count } = await DMDaoTao.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: TrangThai,
          as: "TrangThai",
          attributes: ["MaTrangThai", "TenTrangThai"],
        },
      ],
      order: [["MaDM", "ASC"]],
      offset,
      limit,
    });
    return {
      data: rows.map((dm) => dm.get({ plain: true })),
      total: count,
    };
  } catch (error) {
    console.error("LỖI KHI LẤY DANH MỤC ĐÀO TẠO:", error);
    throw error;
  }
};
const getAllTrangThai = async () => {
  return await TrangThai.findAll();
};
// Thêm mới danh mục đào tạo
const createDMDaoTao = async (data) => {
  return await DMDaoTao.create(data);
};

// Sửa danh mục đào tạo
const updateDMDaoTao = async (id, data) => {
  const record = await DMDaoTao.findByPk(id);
  if (!record) throw new Error("NOT_FOUND");
  await record.update(data);
  return record;
};

// Xóa danh mục đào tạo
const removeDMDaoTao = async (id) => {
  const record = await DMDaoTao.findByPk(id);
  if (!record) throw new Error("NOT_FOUND");
  if (record.MaTrangThai === '2') return true; // Đã ngưng hoạt động
  await record.update({ MaTrangThai: '2' });
  return true;
};

// const removeDMDaoTao = async (id) => {
//   const record = await DMDaoTao.findByPk(id);
//   if (!record) throw new Error("NOT_FOUND");
//   await record.destroy();
//   return true;
// };
module.exports = {
  getAllDMDaoTao,
  createDMDaoTao,
  updateDMDaoTao,
  removeDMDaoTao,
  getAllTrangThai,
};