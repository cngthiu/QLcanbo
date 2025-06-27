const { User, Role, Role_User } = require("../models/init");
const bcrypt = require("bcryptjs");

const getAllUsers = async () => {
  const users = await User.findAll({
    include: {
      model: Role,
      attributes: ["roleId", "roleName"],
      through: { attributes: ["isActive"] },
    },
  });

  return users.map((u) => ({
    UserId: u.UserId,
    UserName: u.UserName,
    Email: u.Email,
    FullName: u.FullName,
    RoleId: u.Roles[0]?.roleId,
    RoleName: u.Roles[0]?.roleName,
  }));
};

const createUser = async ({ UserName, Email, FullName, PassWord, RoleId }) => {
  const hash = bcrypt.hashSync(PassWord, 8);
  const newUser = await User.create({ UserName, FullName, Email, PassWord: hash });

  await Role_User.create({
    UserId: newUser.UserId,
    roleId: RoleId,
    isActive: true,
  });

  return { message: "Tạo mới thành công" };
};

const updateUser = async (id, { UserName, FullName, Email, RoleId }) => {
  await User.update({ UserName, Email, FullName }, { where: { UserId: id } });

  await Role_User.destroy({ where: { UserId: id } });
  await Role_User.create({ UserId: id, roleId: RoleId, isActive: true });

  return { message: "Cập nhật thành công" };
};

const deleteUser = async (id) => {
  await Role_User.destroy({ where: { UserId: id } });
  await User.destroy({ where: { UserId: id } });

  return { message: "Xóa thành công" };
};

const sendEmailToAll = async (emailContent) => {
  const users = await User.findAll();
  const currentDate = new Date();
  for (const user of users) {
    let emails = user.NoiDungEmail ? JSON.parse(user.NoiDungEmail || "[]") : [];
    emails.push({ content: emailContent, sentAt: currentDate });
    user.NoiDungEmail = JSON.stringify(emails);
    await user.save();
  }
  return { message: "Gửi email thành công đến tất cả người dùng" };
};

const getEmailsByUserId = async (userId) => {
  const id = parseInt(userId, 10);
  if (isNaN(id)) return [];
  const user = await User.findByPk(id);
  if (!user) return [];
  return (user.NoiDungEmail ? JSON.parse(user.NoiDungEmail) : []).map(email => ({
    ...email,
    userId: user.UserId,
    userName: user.UserName,
  }));
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  sendEmailToAll,
  getEmailsByUserId
};
