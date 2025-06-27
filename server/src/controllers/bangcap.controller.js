//server/src/controllers/bangcap/js
const {
  BangCap,
  Loai_BC,
  CanBo,
  LichSuThayDoi_BC,
  DonVi,
  QuaTrinhCongTac,
} = require("../models/init");
const { Op } = require("sequelize");
// GET /api/bangcap?keyword=abc&dv=cntt&type=ths
exports.getAll = async (req, res) => {
  try {
    const { keyword = "", dv = "", type = "" } = req.query;

    const whereClause = {};
    const includeClause = [
      {
        model: CanBo,
        as: "NguoiSoHuu",
        attributes: ["MaCB", "HoTenKhaiSinh", "MaDV"],
        include: [
          {
            model: DonVi,
            attributes: ["TenDV"],
            ...(dv && {
              where: {
                TenDV: { [Op.like]: `%${dv}%` },
              },
            }),
          },
        ],
      },
      {
        model: Loai_BC,
        attributes: ["LoaiBangCap"],
        ...(type && {
          where: {
            LoaiBangCap: { [Op.like]: `%${type}%` },
          },
        }),
      },
    ];

    if (keyword) {
      whereClause[Op.or] = [
        { SoHieuVanBan: { [Op.like]: `%${keyword}%` } },
        { ChuyenNganh: { [Op.like]: `%${keyword}%` } },
        { TruongCapBang: { [Op.like]: `%${keyword}%` } },
      ];
    }

    const list = await BangCap.findAll({
      where: whereClause,
      include: includeClause,
      order: [["ThoiGianTao", "DESC"]],
    });

    const result = list.map((b) => ({
      MaBC: b.MaBC,
      MaGV: b.MaGV,
      MaLBC: b.MaLBC,
      SoHieuVanBan: b.SoHieuVanBan,
      ChuyenNganh: b.ChuyenNganh,
      NamTotNghiep: b.NamTotNghiep,
      TruongCapBang: b.TruongCapBang,
      HeDaoTao: b.HeDaoTao,
      NgayCap: b.NgayCap,
      TrangThai: b.TrangThai,
      HoTen: b.NguoiSoHuu?.HoTenKhaiSinh,
      LoaiBangCap: b.Loai_BC?.LoaiBangCap,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Lỗi truy vấn", error: error.message });
  }
};

// Tạo bằng cấp mới
exports.create = async (req, res) => {
  try {
    const {
      MaGV,
      MaLBC,
      SoHieuVanBan,
      ChuyenNganh,
      NamTotNghiep,
      TruongCapBang,
      HeDaoTao,
      NgayCap,
    } = req.body;

    if (
      !MaGV ||
      !MaLBC ||
      !SoHieuVanBan ||
      !ChuyenNganh ||
      !NamTotNghiep ||
      !TruongCapBang ||
      !HeDaoTao ||
      !NgayCap
    ) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    const FileScan = req.file ? req.file.path : null;

    const record = await BangCap.create({
      MaGV,
      MaLBC,
      SoHieuVanBan,
      ChuyenNganh,
      NamTotNghiep,
      TruongCapBang,
      HeDaoTao,
      NgayCap,
      FileScan,
      NguoiTao: req.user?.fullname || "",
    });

    await LichSuThayDoi_BC.create({
      MaBC: record.MaBC,
      NoiDungThayDoi: `Tạo mới bằng cấp với số hiệu: ${SoHieuVanBan}`,
    });

    res.json(record);
  } catch (error) {
    console.error("Lỗi tạo BC:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi tạo bằng cấp", error: error.message });
  }
};

// Cập nhật bằng cấp
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const old = await BangCap.findByPk(id);
    if (!old) return res.status(404).json({ message: "Không tìm thấy" });

    const oldData = old.get({ plain: true });

    const {
      MaLBC,
      SoHieuVanBan,
      ChuyenNganh,
      NamTotNghiep,
      TruongCapBang,
      HeDaoTao,
      NgayCap,
    } = req.body;

    const FileScan = req.file ? req.file.path : oldData.FileScan;

    const payload = {
      MaLBC,
      SoHieuVanBan,
      ChuyenNganh,
      NamTotNghiep,
      TruongCapBang,
      HeDaoTao,
      NgayCap,
      FileScan,
    };

    const changes = [];
    for (const key in payload) {
      // So sánh nếu khác và giá trị cũ không null
      if (
        key !== "ThoiGianTao" &&
        oldData.hasOwnProperty(key) &&
        payload[key] != oldData[key]
      ) {
        changes.push(`${key}: ${oldData[key]} -> ${payload[key]}`);
      }
    }

    await BangCap.update(payload, { where: { MaBC: id } });

    if (changes.length > 0) {
      await LichSuThayDoi_BC.create({
        MaBC: id,
        NoiDungThayDoi: `Cập nhật: ${changes.join(", ")}`,
      });
    }
    res.json({ message: "Đã cập nhật" });
  } catch (error) {
    console.error("Lỗi update BC:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật", error: error.message });
  }
};

// Xóa bằng cấp
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const record = await BangCap.findByPk(id);
    if (!record) {
      return res.status(404).json({ message: "Bằng cấp không tồn tại" });
    }

    // ✅ Xóa lịch sử liên quan trước
    await LichSuThayDoi_BC.destroy({ where: { MaBC: id } });

    // ✅ Sau đó mới xóa bằng cấp
    await BangCap.destroy({ where: { MaBC: id } });

    res.json({ message: `Đã xóa bằng cấp số hiệu: ${record.SoHieuVanBan}` });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa bằng cấp",
      error: error.message,
    });
  }
};

// server/src/controllers/bangcap.controller.js
exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const bc = await BangCap.findByPk(id, {
      include: [
        {
          model: CanBo,
          as: "NguoiSoHuu",
          attributes: ["HoTenKhaiSinh"],
        },
        {
          model: Loai_BC,
          attributes: ["LoaiBangCap"],
        },
      ],
    });

    if (!bc) return res.status(404).json({ message: "Không tìm thấy" });

    res.json({
      ...bc.get(),
      HoTen: bc.NguoiSoHuu?.HoTenKhaiSinh,
      LoaiBangCap: bc.Loai_BC?.LoaiBangCap,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy chi tiết", error: error.message });
  }
};

// Lấy lịch sử thay đổi của một bằng cấp
exports.getHistory = async (req, res) => {
  try {
    const id = req.params.id;

    const list = await LichSuThayDoi_BC.findAll({
      where: { MaBC: id },
      order: [["ThoiGianThayDoi", "DESC"]],
    });

    res.json(list);
  } catch (error) {
    console.error("Lỗi lấy lịch sử bằng cấp:", error);
    res.status(500).json({
      message: "Lỗi khi lấy lịch sử bằng cấp",
      error: error.message,
    });
  }
};
