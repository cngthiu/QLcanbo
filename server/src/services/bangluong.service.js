const { BangLuong, CanBo, DonVi, MucLuongCapBac } = require("../models/init");
const { Op } = require("sequelize");

const getAllBangLuong = async (filters) => {
  const { thangNam = "", donVi = "" } = filters;
  const whereClause = {};
  
  // Chỉ filter theo tháng nếu có
  if (thangNam && thangNam.trim() !== "") {
    whereClause.ThangNam = thangNam;
  }

  console.log("Filter conditions:", { thangNam, donVi, whereClause });

  try {
    const list = await BangLuong.findAll({
      where: whereClause,
      include: [
        {
          model: CanBo,
          attributes: ["MaCB", "HoTenKhaiSinh", "CapBac", "ChucVu"],
          required: false, // LEFT JOIN thay vì INNER JOIN
          include: [
            {
              model: DonVi,
              attributes: ["TenDV"],
              required: false,
              ...(donVi && donVi.trim() !== "" ? {
                where: { TenDV: { [Op.like]: `%${donVi}%` } }
              } : {})
            }
          ]
        },
      ],
      order: [["NgayTao", "DESC"]],
    });

    console.log(`Found ${list.length} records`);

    const result = list.map((bl) => ({
      MaBL: bl.MaBL,
      MaCB: bl.MaCB,
      ThangNam: bl.ThangNam,
      LuongCoBan: parseFloat(bl.LuongCoBan) || 0,
      PhuCapChucVu: parseFloat(bl.PhuCapChucVu) || 0,
      PhuCapCapBac: parseFloat(bl.PhuCapCapBac) || 0,
      PhuCapKhac: parseFloat(bl.PhuCapKhac) || 0,
      ThuongThang: parseFloat(bl.ThuongThang) || 0,
      KhauTru: parseFloat(bl.KhauTru) || 0,
      ThucLanh: parseFloat(bl.ThucLanh) || 0,
      TrangThai: bl.TrangThai,
      GhiChu: bl.GhiChu,
      NgayTao: bl.NgayTao,
      // Safely access nested objects
      HoTen: bl.CanBo?.HoTenKhaiSinh || 'N/A',
      CapBac: bl.CanBo?.CapBac || 'N/A',
      ChucVu: bl.CanBo?.ChucVu || 'N/A',
      DonVi: bl.CanBo?.DonVi?.TenDV || 'N/A',
    }));

    console.log("Processed result:", result);
    return result;

  } catch (error) {
    console.error("Error in getAllBangLuong:", error);
    throw error;
  }
};

const createBangLuong = async (data) => {
  // Kiểm tra đã có bảng lương tháng này chưa
  const existing = await BangLuong.findOne({
    where: { MaCB: data.MaCB, ThangNam: data.ThangNam }
  });

  if (existing) {
    throw new Error("Đã có bảng lương cho tháng này");
  }

  // Tính toán lương tự động nếu chưa có
  let luongCoBan = data.LuongCoBan;
  if (!luongCoBan || luongCoBan == 0) {
    const canbo = await CanBo.findByPk(data.MaCB);
    const mucLuong = await MucLuongCapBac.findOne({
      where: { 
        CapBac: canbo.CapBac,
        TrangThai: "Đang áp dụng"
      }
    });
    luongCoBan = mucLuong ? mucLuong.HeSoLuong * mucLuong.LuongCoBan : 0;
  }

  const thucLanh = luongCoBan + (data.PhuCapChucVu || 0) + (data.PhuCapCapBac || 0) + 
                   (data.PhuCapKhac || 0) + (data.ThuongThang || 0) - (data.KhauTru || 0);

  const record = await BangLuong.create({
    ...data,
    LuongCoBan: luongCoBan,
    ThucLanh: thucLanh,
    TrangThai: 1, // Chưa duyệt
    MaNguoiTao: 1, // TODO: lấy từ user đang login
  });

  return record;
};

const updateBangLuong = async (id, data) => {
  const old = await BangLuong.findByPk(id);
  if (!old) throw new Error("NOT_FOUND");

  // Tính toán lại lương
  const thucLanh = (data.LuongCoBan !== undefined ? data.LuongCoBan : old.LuongCoBan) + 
                   (data.PhuCapChucVu !== undefined ? data.PhuCapChucVu : old.PhuCapChucVu) + 
                   (data.PhuCapCapBac !== undefined ? data.PhuCapCapBac : old.PhuCapCapBac) + 
                   (data.PhuCapKhac !== undefined ? data.PhuCapKhac : old.PhuCapKhac) + 
                   (data.ThuongThang !== undefined ? data.ThuongThang : old.ThuongThang) - 
                   (data.KhauTru !== undefined ? data.KhauTru : old.KhauTru);

  await BangLuong.update({ ...data, ThucLanh: thucLanh }, { where: { MaBL: id } });
};

const deleteBangLuong = async (id) => {
  const record = await BangLuong.findByPk(id);
  if (!record) throw new Error("NOT_FOUND");

  await BangLuong.destroy({ where: { MaBL: id } });
  return "Đã xóa bảng lương";
};

const getBangLuongById = async (id) => {
  const bl = await BangLuong.findByPk(id, {
    include: [
      { 
        model: CanBo, 
        attributes: ["MaCB", "HoTenKhaiSinh", "CapBac", "ChucVu"],
        include: [{ model: DonVi, attributes: ["TenDV"] }]
      },
    ],
  });

  if (!bl) throw new Error("NOT_FOUND");
  return bl;
};

const tinhLuongTheoThang = async (thangNam, donViId = null) => {
  const whereClause = donViId ? { MaDV: donViId } : {};
  
  const danhSachCanBo = await CanBo.findAll({
    where: whereClause,
    include: [{ model: DonVi, attributes: ["TenDV"] }]
  });

  const ketQua = [];
  
  for (const canbo of danhSachCanBo) {
    // Kiểm tra đã có bảng lương tháng này chưa
    const existing = await BangLuong.findOne({
      where: { MaCB: canbo.MaCB, ThangNam: thangNam }
    });

    if (!existing) {
      const mucLuong = await MucLuongCapBac.findOne({
        where: { 
          CapBac: canbo.CapBac,
          TrangThai: "Đang áp dụng"
        }
      });

      const luongCoBan = mucLuong ? mucLuong.HeSoLuong * mucLuong.LuongCoBan : 0;
      
      await BangLuong.create({
        MaCB: canbo.MaCB,
        ThangNam: thangNam,
        LuongCoBan: luongCoBan,
        PhuCapChucVu: 0,
        PhuCapCapBac: 0,
        PhuCapKhac: 0,
        ThuongThang: 0,
        KhauTru: 0,
        ThucLanh: luongCoBan,
        TrangThai: 1,
        MaNguoiTao: 1,
      });
    }

    ketQua.push({
      MaCB: canbo.MaCB,
      HoTen: canbo.HoTenKhaiSinh,
      CapBac: canbo.CapBac,
      ChucVu: canbo.ChucVu,
      DonVi: canbo.DonVi?.TenDV,
      LuongCoBan: existing?.LuongCoBan || luongCoBan,
      ThucLanh: existing?.ThucLanh || luongCoBan,
    });
  }

  return ketQua;
};

const approveBangLuong = async (id, nguoiDuyet) => {
  const record = await BangLuong.findByPk(id);
  if (!record) throw new Error("NOT_FOUND");

  await BangLuong.update({
    TrangThai: 2, // Đã duyệt
    NgayDuyet: new Date(),
    MaNguoiDuyet: nguoiDuyet
  }, { where: { MaBL: id } });

  return "Đã phê duyệt bảng lương";
};

const rejectBangLuong = async (id, nguoiDuyet) => {
  const record = await BangLuong.findByPk(id);
  if (!record) throw new Error("NOT_FOUND");

  await BangLuong.update({
    TrangThai: 0, // Từ chối
    NgayDuyet: new Date(),
    MaNguoiDuyet: nguoiDuyet
  }, { where: { MaBL: id } });

  return "Đã từ chối bảng lương";
};

module.exports = {
  getAllBangLuong,
  createBangLuong,
  updateBangLuong,
  deleteBangLuong,
  getBangLuongById,
  tinhLuongTheoThang,
  approveBangLuong,
  rejectBangLuong,
};