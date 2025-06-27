const { CanBo, DonVi } = require("../models/init");
const { Op } = require("sequelize");

const getAllCanBo = async (filters = {}) => {
  const {
    keyword = "",
    page = 1,
    pageSize = 10,
  } = filters;

  const offset = (page - 1) * pageSize;

  const whereClause = keyword
    ? {
        [Op.or]: [
          { HoTenKhaiSinh: { [Op.like]: `%${keyword}%` } },
          { CapBac: { [Op.like]: `%${keyword}%` } },
          { ChucVu: { [Op.like]: `%${keyword}%` } },
          { "$DonVi.TenDV$": { [Op.like]: `%${keyword}%` } },
        ],
      }
    : {};

  const { count, rows } = await CanBo.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: DonVi,
        attributes: ["MaDV", "TenDV"],
      },
    ],
    order: [["MaCB", "DESC"]],
    limit: parseInt(pageSize),
    offset: parseInt(offset),
  });

  const items = rows.map((cb) => ({
    MaCB: cb.MaCB,
    HoTenKhaiSinh: cb.HoTenKhaiSinh,
    ChucVu: cb.ChucVu,
    CapBac: cb.CapBac,
    DonVi: { TenDV: cb.DonVi?.TenDV },
    NgaySinh: cb.NgaySinh,
    NgayTao: cb.NgayTao,
    NgaySua: cb.NgaySua,
  }));

  return {
    items,
    totalPages: Math.ceil(count / pageSize),
    currentPage: parseInt(page),
  };
};

const getCanBoById = async (id) => {
  const canbo = await CanBo.findByPk(id, {
    include: [{ model: DonVi, attributes: ["MaDV", "TenDV"] }],
  });
  if (!canbo) throw new Error("NOT_FOUND");
  return canbo;
};

const createCanBo = async (data) => {
  const newCB = await CanBo.create(data);
  return newCB;
};

const updateCanBo = async (id, data) => {
  const oldCB = await CanBo.findByPk(id);
  if (!oldCB) throw new Error("NOT_FOUND");
  await CanBo.update(data, { where: { MaCB: id } });
};

const deleteCanBo = async (id) => {
  const cb = await CanBo.findByPk(id);
  if (!cb) throw new Error("NOT_FOUND");
  await CanBo.destroy({ where: { MaCB: id } });
};

module.exports = {
  getAllCanBo,
  getCanBoById,
  createCanBo,
  updateCanBo,
  deleteCanBo,
};
