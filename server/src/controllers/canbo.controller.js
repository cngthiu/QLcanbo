//server/src/controllers/canbo.controller.js
const { CanBo, DonVi } = require("../models/init");
const canboService = require("../services/canbo.service");

const { getAllCanBo } = require("../services/canbo.service");

exports.getAllCanBo = async (req, res) => {
  try {
    const filters = req.query; 
    const data = await getAllCanBo(filters); 
    res.json(data);
  } catch (err) {
    console.error("Lỗi getAllCanBo:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.getDonVi = async (req, res) => {
  const list = await DonVi.findAll({ attributes: ["MaDV", "TenDV"] });
  res.json(list);
};

exports.createCanBo = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.Anh = req.file.filename; 
    }

    const today = new Date(); 

    const newCanBo = await CanBo.create({
      ...data,
      NgayTao: today, 
    });

    res.status(201).json(newCanBo);
  } catch (error) {
    console.error("Lỗi thêm cán bộ:", error);
    res.status(500).json({ message: "Lỗi khi thêm cán bộ", error });
  }
};



exports.updateCanBo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const canBo = await CanBo.findByPk(id);
    if (!canBo) {
      return res.status(404).json({ message: "Không tìm thấy cán bộ." });
    }

    const today = new Date(); 

    await canBo.update({
      ...data,
      NgaySua: today, 
    });

    res.json({ message: "Cập nhật thành công", canBo });
  } catch (error) {
    console.error("Lỗi cập nhật cán bộ:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật cán bộ", error });
  }
};



exports.deleteCanBo = async (req, res) => {
  try {
    console.log(">> DELETE cán bộ:", req.params.id);
    const { id } = req.params;

    const canBo = await CanBo.findByPk(id);
    if (!canBo) {
      return res.status(404).json({ message: "Không tìm thấy cán bộ." });
    }

    await canBo.destroy();
    res.json({ message: "Xóa cán bộ thành công" });
  } catch (error) {
    console.error("Lỗi xóa cán bộ:", error);
    res.status(500).json({ message: "Lỗi khi xóa cán bộ", error });
  }
};

exports.getCBById = async (req, res) => {
  try {
    const cb = await canboService.getCanBoById(req.params.id);
    if (!cb) {
      console.log("Không tìm thấy cán bộ trong DB!");
    }
    res.json(cb);
  } catch (error) {
    const status = error.message === "NOT_FOUND" ? 404 : 500;
    res.status(status).json({ message: "Lỗi chi tiết", error: error.message });
  }
};
