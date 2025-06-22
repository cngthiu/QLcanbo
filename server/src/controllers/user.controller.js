//server/src/controllers/user.controller.js
const userService = require("../services/user.service");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Lỗi getAllUsers:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.createUser = async (req, res) => {
  try {
    console.log("Dữ liệu nhận được ở controller:", req.body);
    const result = await userService.createUser(req.body);
    res.json(result);
  } catch (err) {
    console.error("Lỗi createUser:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const result = await userService.updateUser(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.error("Lỗi updateUser:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.json(result);
  } catch (err) {
    console.error("Lỗi deleteUser:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.getEmailsByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "Thiếu userId" });
    const emails = await userService.getEmailsByUserId(userId);
    res.json(emails);
  } catch (err) {
    console.error("Lỗi getEmailsByUserId:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};