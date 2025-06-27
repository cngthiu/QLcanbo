const service = require("../services/daotao.service");
const userService = require("../services/user.service");

exports.getAll = async (req, res) => {
  try {
    const result = await service.getAllDaoTao(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Lỗi truy vấn", error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const record = await service.createDaoTao(req.body);
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo chương trình", error: error.message });
  }
};

exports.getAllTrangThai = async (req, res) => {
  const list = await service.getAllTrangThai();
  res.json(list);
};

exports.update = async (req, res) => {
  try {
    await service.updateDaoTao(req.params.id, req.body);
    res.json({ message: "Đã cập nhật" });
  } catch (error) {
    const status = error.message === "NOT_FOUND" ? 404 : 500;
    res.status(status).json({ message: "Lỗi cập nhật", error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await service.removeDaoTao(req.params.id);
    res.json({ message: "Đã xóa" });
  } catch (error) {
    const status = error.message === "NOT_FOUND" ? 404 : 500;
    res.status(status).json({ message: "Lỗi xóa", error: error.message });
  }
};

exports.getThamGiaByMaCT = async (req, res) => {
  try {
    const result = await service.getThamGiaByMaCT(req.query.MaCT);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Lỗi truy vấn tham gia đào tạo", error: error.message });
  }
};

exports.searchCanBo = async (req, res) => {
  try {
    const { keyword } = req.query;
    const result = await service.searchCanBoByName(keyword);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tìm kiếm cán bộ", error: error.message });
  }
};

exports.addCanBoToCTDT = async (req, res) => {
  try {
    console.log("CHECKING DATA:", { MaCT: req.params.MaCT, MaCB: req.body.MaCB });
    const result = await service.addCanBoToCTDT(req.params.MaCT, req.body);
    res.json(result);
  } catch (error) {
    const status = error.message.includes("NOT_FOUND") || error.message.includes("ALREADY_ENROLLED") ? 400 : 500;
    res.status(status).json({ message: "Lỗi khi thêm cán bộ", error: error.message });
  }
};

exports.removeCanBoFromCTDT = async (req, res) => {
  try {
    await service.removeCanBoFromCTDT(req.params.MaCT, req.params.MaCB);
    res.json({ message: "Đã xóa cán bộ khỏi danh sách" });
  } catch (error) {
    const status = error.message === "NOT_FOUND" ? 404 : 500;
    res.status(status).json({ message: "Lỗi khi xóa cán bộ", error: error.message });
  }
};

exports.sendEmailForTraining = async (req, res) => {
  try {
    const { content } = req.body;
    const { MaCT } = req.params;
    console.log("Sending email for MaCT:", MaCT, "with content:", content);
    if (!content) {
      return res.status(400).json({ message: "Nội dung email không được để trống" });
    }
    // We can use MaCT here if needed in the future, e.g. logging which training it was for
    const result = await userService.sendEmailToAll(content);
    res.json(result);
  } catch (err) {
    console.error("Lỗi khi gửi email đào tạo:", err);
    res.status(500).json({ message: "Lỗi server khi gửi email" });
  }
};
exports.getAllEmails = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const emails = users.flatMap(user =>
      JSON.parse(user.NoiDungEmail || "[]").map(email => ({
        ...email,
        userId: user.UserId,
        userName: user.UserName
      }))
    );
    res.json(emails);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách email:", err);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách email" });
  }
};