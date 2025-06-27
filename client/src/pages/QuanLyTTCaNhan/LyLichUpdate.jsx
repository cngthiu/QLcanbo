import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "../../services/lylich.api";
import { toast } from "react-hot-toast";

const LyLichUpdate = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({
    MaCB: "",
    HoTenKhaiSinh: "",
    HoTenThuongDung: "",
    BiDanh: "",
    CapBac: "",
    MaDV: "",
    GioiTinh: "",
    ChucVu: "",
    NgaySinh: "",
    SoCCCD: "",
    NgayNhapNgu: "",
    NoiSinh: "",
    NoiDKHK: "",
    DanToc: "",
    ThanhPhanGD: "",
    NgayThamGiaCM: "",
    Ngaychinhthuc: "",
    Ngayvaodoan: "",
    GDPT: "",
    LyLuanCT: "",
    HocHam: "",
    CongTacDangLam: "",
    QueQuan: "",
    NoiTamTru: "",
    TonGiao: "",
    NgheNghiep: "",
    NgayCongTac: "",
    Ngayvaodang: "",
    Chibo: "",
    ThamGiaTCXH: "",
    ChuyenMonNV: "",
    NgoaiNgu: "",
    HocVi: "",
  });

  const [donViList, setDonViList] = useState([]);

  useEffect(() => {
    console.log("STATE RECEIVED:", state);
    if (state) {
      setForm({
        ...form,
        ...state,
        NgaySinh: state.NgaySinh?.slice(0, 10) || "",
        NgayNhapNgu: state.NgayNhapNgu?.slice(0, 10) || "",
        NgayThamGiaCM: state.NgayThamGiaCM?.slice(0, 10) || "",
        Ngaychinhthuc: state.Ngaychinhthuc?.slice(0, 10) || "",
        Ngayvaodoan: state.Ngayvaodoan?.slice(0, 10) || "",
        Ngayvaodang: state.Ngayvaodang?.slice(0, 10) || "",
        NgayCongTac: state.NgayCongTac?.slice(0, 10) || "",
      });
    }
  }, [state]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [dvRes] = await Promise.all([api.getDonVi()]);
        setDonViList(dvRes.data);
      } catch {
        toast.error("Không thể tải dữ liệu danh mục.");
      }
    };
    fetchDropdowns();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "HoTenKhaiSinh",
      "HoTenThuongDung",
      "CapBac",
      "MaDV",
      "GioiTinh",
      "ChucVu",
      "NgaySinh",
      "NgayNhapNgu",
      "SoCCCD",
    ];

    for (const field of requiredFields) {
      if (!form[field] || String(form[field]).trim() === "") {
        toast.error("Vui lòng nhập đầy đủ các trường bắt buộc *");
        return;
      }
    }
    try {
      const processedForm = { ...form };

      const dateFields = [
        "NgayNhapNgu",
        "NgayThamGiaCM",
        "Ngaychinhthuc",
        "Ngayvaodoan",
        "Ngayvaodang",
        "NgayCongTac",
      ];
      dateFields.forEach((field) => {
        if (processedForm[field] === "") {
          processedForm[field] = null;
        }
      });

      await api.updateCanBo(processedForm.MaCB, processedForm);
      toast.success("Cập nhật thành công!");
      navigate("/canbo");
    } catch (error) {
      toast.error("Lỗi khi cập nhật dữ liệu!");
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-blue-700 mb-6">CẬP NHẬT LÝ LỊCH</h1>

      <div className="grid grid-cols-2 gap-6 text-sm">
        <div className="space-y-4">
          <div>
            <Label>
              Họ và tên khai sinh <span className="text-red-500">*</span>
            </Label>
            <Input
              name="HoTenKhaiSinh"
              value={form.HoTenKhaiSinh}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Bí danh</Label>
            <Input name="BiDanh" value={form.BiDanh} onChange={handleChange} />
          </div>
          <div>
            <Label>
              Cấp bậc <span className="text-red-500">*</span>
            </Label>
            <select
              name="CapBac"
              value={form.CapBac}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Chọn --</option>
              <option value="Thiếu úy">Thiếu úy</option>
              <option value="Trung úy">Trung úy</option>
              <option value="Thượng úy">Thượng úy</option>
              <option value="Đại úy">Đại úy</option>
              <option value="Thiếu tá">Thiếu tá</option>
              <option value="Trung tá">Trung tá</option>
              <option value="Thượng tá">Thượng tá</option>
              <option value="Đại tá">Đại tá</option>
              <option value="Thiếu tướng">Thiếu tướng</option>
              <option value="Trung tướng">Trung tướng</option>
              <option value="Thượng tướng">Thượng tướng</option>
              <option value="Đại tướng">Đại tướng</option>
            </select>
          </div>
          <div>
            <Label>
              Đơn vị <span className="text-red-500">*</span>
            </Label>
            <select
              name="MaDV"
              value={form.MaDV}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Chọn --</option>
              {donViList.map((dv) => (
                <option key={dv.MaDV} value={dv.MaDV}>
                  {dv.TenDV}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Nơi sinh</Label>
            <Input
              name="NoiSinh"
              value={form.NoiSinh}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Nơi đăng ký hộ khẩu thường trú</Label>
            <Input
              name="NoiDKHK"
              value={form.NoiDKHK}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Dân tộc</Label>
            <Input name="DanToc" value={form.DanToc} onChange={handleChange} />
          </div>
          <div>
            <Label>Thành phần gia đình</Label>
            <Input
              name="ThanhPhanGD"
              value={form.ThanhPhanGD}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>
              Ngày nhập ngũ <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              name="NgayNhapNgu"
              value={form.NgayNhapNgu}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Ngày tham gia cách mạng</Label>
            <Input
              type="date"
              name="NgayThamGiaCM"
              value={form.NgayThamGiaCM}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Ngày chính thức</Label>
            <Input
              type="date"
              name="Ngaychinhthuc"
              value={form.Ngaychinhthuc}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Ngày vào Đoàn</Label>
            <Input
              type="date"
              name="Ngayvaodoan"
              value={form.Ngayvaodoan}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Giáo dục phổ thông</Label>
            <Input name="GDPT" value={form.GDPT} onChange={handleChange} />
          </div>
          <div>
            <Label>Lý luận chính trị</Label>
            <select
              name="LyLuanCT"
              value={form.LyLuanCT}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Chọn --</option>
              <option value="Cử nhân">Cử nhân</option>
              <option value="Cao cấp">Cao cấp</option>
              <option value="Trung cấp">Trung cấp</option>
              <option value="Sơ cấp">Sơ cấp</option>
            </select>
          </div>
          <div>
            <Label>Học hàm</Label>
            <Input name="HocHam" value={form.HocHam} onChange={handleChange} />
          </div>
          <div>
            <Label>Công tác đang làm</Label>
            <select
              name="CongTacDangLam"
              value={form.CongTacDangLam}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Chọn --</option>
              <option value="Chỉ huy - TM">Chỉ huy - TM</option>
              <option value="Chính trị">Chính trị</option>
              <option value="Hậu cần">Hậu cần</option>
              <option value="Kỹ thuật">Kỹ thuật</option>
              <option value="Giảng viên">Giảng viên</option>
              <option value="Nghiên cứu khoa học">Nghiên cứu khoa học</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>
              Họ và tên thường dùng <span className="text-red-500">*</span>
            </Label>
            <Input
              name="HoTenThuongDung"
              value={form.HoTenThuongDung}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>
              Giới tính <span className="text-red-500">*</span>
            </Label>
            <select
              name="GioiTinh"
              value={form.GioiTinh}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Chọn --</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div>
            <Label>
              Chức vụ <span className="text-red-500">*</span>
            </Label>
            <Input name="ChucVu" value={form.ChucVu} onChange={handleChange} />
          </div>
          <div>
            <Label>
              Ngày sinh <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              name="NgaySinh"
              value={form.NgaySinh}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Quê quán</Label>
            <Input
              name="QueQuan"
              value={form.QueQuan}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Nơi tạm trú hiện nay</Label>
            <Input
              name="NoiTamTru"
              value={form.NoiTamTru}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Tôn giáo</Label>
            <Input
              name="TonGiao"
              value={form.TonGiao}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Nghề nghiệp trước khi nhập ngũ</Label>
            <Input
              name="NgheNghiep"
              value={form.NgheNghiep}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Ngày về đơn vị hiện tại</Label>
            <Input
              type="date"
              name="NgayCongTac"
              value={form.NgayCongTac}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Ngày vào Đảng</Label>
            <Input
              type="date"
              name="Ngayvaodang"
              value={form.Ngayvaodang}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Tại chi bộ</Label>
            <Input name="Chibo" value={form.Chibo} onChange={handleChange} />
          </div>
          <div>
            <Label>Tham gia các tổ chức khácc</Label>
            <Input
              name="ThamGiaTCXH"
              value={form.ThamGiaTCXH}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Chuyên môn nghiệp vụ</Label>
            <Input
              name="ChuyenMonNV"
              value={form.ChuyenMonNV}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Ngoại ngữ</Label>
            <Input
              name="NgoaiNgu"
              value={form.NgoaiNgu}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Học vị</Label>
            <Input name="HocVi" value={form.HocVi} onChange={handleChange} />
          </div>
          <div>
            <Label>
              Số CCCD <span className="text-red-500">*</span>
            </Label>
            <Input name="SoCCCD" value={form.SoCCCD} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate("/canbo")}>
          Đóng
        </Button>
        <Button className="bg-blue-600 text-white" onClick={handleSubmit}>
          Cập nhật
        </Button>
      </div>
    </div>
  );
};

export default LyLichUpdate;
