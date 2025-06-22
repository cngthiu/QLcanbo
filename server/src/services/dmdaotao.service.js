const { DMDaoTao, TrangThai } = require("../models/init"); // Destructuring để lấy DMDaoTao
const { Op } = require("sequelize");

const getAllDMDaoTao = async () => {
  try {
    const list = await DMDaoTao.findAll({
      include: [
        {
          model: TrangThai,
          as: "TrangThai",
          attributes: ["MaTrangThai", "TenTrangThai"], // Bao gồm cả MaTrangThai để debug
        },
      ],
      order: [["MaDM", "ASC"]],
    });
    return list;
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
  await record.destroy();
  return true;
};

module.exports = {
  getAllDMDaoTao,
  createDMDaoTao,
  updateDMDaoTao,
  removeDMDaoTao,
  getAllTrangThai,
};