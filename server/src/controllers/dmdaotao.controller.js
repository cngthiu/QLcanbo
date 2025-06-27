const { DMDaoTao } = require("../models/init");
const service = require("../services/dmdaotao.service");

exports.getAll = async (req, res) => {
  const list = await service.getAllDMDaoTao();
  res.json(list);
};
exports.getAllTrangThai = async (req, res) => {
  const list = await service.getAllTrangThai();
  res.json(list);
};
exports.create = async (req, res) => {
  const record = await service.createDMDaoTao(req.body);
  res.json(record);
};

exports.update = async (req, res) => {
  const record = await service.updateDMDaoTao(req.params.id, req.body);
  res.json(record);
};

exports.remove = async (req, res) => {
  await service.removeDMDaoTao(req.params.id);
  res.json({ message: "Xóa thành công" });
};