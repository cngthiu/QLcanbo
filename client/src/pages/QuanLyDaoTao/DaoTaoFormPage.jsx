import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "../../services/daotao.api";
import { toast } from "react-hot-toast";

const DaoTaoFormPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // chứa data nếu đang sửa

  const [form, setForm] = useState({
    TenCT: "",
    MaDM: "",
    NgayBatDau: "",
    NgayKetThuc: "",
    DiaDiem: "",
    MaTrangThai: "",
    Khoa: "",
  });

  // Danh sách danh mục và trạng thái (lấy từ API)
  const [danhMucList, setDanhMucList] = useState([]);
  const [trangThaiList, setTrangThaiList] = useState([]);
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const dmRes = await api.getAllDMDaoTao();
        setDanhMucList(dmRes.data?.data || []);
        const ttRes = await api.getAllTrangThai();
        setTrangThaiList(ttRes.data || []);
      } catch {
        toast.error("Không thể tải danh mục hoặc trạng thái");
      }
    };
    fetchDropdowns();
  }, []);

  useEffect(() => {
    if (state) {
      setForm({
        TenCT: state.TenCT || "",
        MaDM: state.MaDM || "",
        NgayBatDau: state.NgayBatDau ? state.NgayBatDau.slice(0, 10) : "",
        NgayKetThuc: state.NgayKetThuc ? state.NgayKetThuc.slice(0, 10) : "",
        DiaDiem: state.DiaDiem || "",
        MaTrangThai: state.MaTrangThai || "",
        Khoa: state.Khoa || "",
      });
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "TenCT" || name === "DiaDiem") {
      const forbiddenChars = "!@#$%^&*()+\\/";
      let cleanValue = "";
      for (const char of value) {
        if (!forbiddenChars.includes(char)) {
          cleanValue += char;
        }
      }
      setForm((prev) => ({ ...prev, [name]: cleanValue }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!form.Khoa || isNaN(form.Khoa) || parseInt(form.Khoa) <= 0) {
      toast.error("Vui lòng nhập Khóa là số nguyên dương!");
      return;
    }
    try {
      if (state?.MaCT) {
        await api.update(state.MaCT, form);
        toast.success("Cập nhật chương trình thành công!");
      } else {
        await api.create(form);
        toast.success("Thêm mới chương trình thành công!");
      }
      navigate("/daotao");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Lỗi khi lưu dữ liệu!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-blue-700 mb-6">
        {state ? "SỬA CHƯƠNG TRÌNH ĐÀO TẠO" : "THÊM MỚI CHƯƠNG TRÌNH ĐÀO TẠO"}
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <div className="col-span-2 flex items-center gap-4">
          <Label className="min-w-[140px]">
            Tên chương trình <span className="text-red-500">(*)</span>
          </Label>
          <Input
            name="TenCT"
            value={form.TenCT}
            onChange={handleChange}
            className="flex-1"
          />
          <Label className="min-w-[140px]">
            Danh mục đào tạo <span className="text-red-500">(*)</span>
          </Label>
          <select
            name="MaDM"
            value={form.MaDM}
            onChange={handleChange}
            className="flex-1 border rounded px-2 py-1.5"
          >
            <option value="">-- Chọn danh mục --</option>
            {danhMucList.map((item) => (
              <option key={item.MaDM} value={item.MaDM}>
                {item.TenDM}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <Label className="min-w-[140px]">
            Ngày bắt đầu <span className="text-red-500">(*)</span>
          </Label>
          <Input
            type="date"
            name="NgayBatDau"
            value={form.NgayBatDau}
            onChange={handleChange}
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="min-w-[140px]">
            Ngày kết thúc <span className="text-red-500">(*)</span>
          </Label>
          <Input
            type="date"
            name="NgayKetThuc"
            value={form.NgayKetThuc}
            onChange={handleChange}
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="min-w-[140px]">
            Địa điểm <span className="text-red-500">(*)</span>
          </Label>
          <Input
            name="DiaDiem"
            value={form.DiaDiem}
            onChange={handleChange}
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="min-w-[140px]">
            Khóa <span className="text-red-500">(*)</span>
          </Label>
          <Input
            type="number"
            name="Khoa"
            value={form.Khoa}
            onChange={handleChange}
            className="flex-1"
            min="1"
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="min-w-[140px]">
            Trạng thái <span className="text-red-500">(*)</span>
          </Label>
          <select
            name="MaTrangThai"
            value={form.MaTrangThai}
            onChange={handleChange}
            className="flex-1 border rounded px-2 py-1.5"
          >
            <option value="">-- Chọn trạng thái --</option>
            {trangThaiList.map((item) => (
              <option key={item.MaTrangThai} value={item.MaTrangThai}>
                {item.TenTrangThai}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 flex gap-4 ml-[900px]">
        <Button variant="outline" onClick={() => navigate("/daotao")}>
          Hủy
        </Button>
        <Button className="bg-blue-700 text-white hover:bg-blue-800" onClick={handleSubmit}>
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default DaoTaoFormPage;
