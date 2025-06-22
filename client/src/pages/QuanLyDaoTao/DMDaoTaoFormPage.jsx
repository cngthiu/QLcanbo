import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "../../services/daotao.api";
import { toast } from "react-hot-toast";

const DMDaoTaoFormPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // chứa data nếu đang sửa

  const [form, setForm] = useState({
    TenDM: "",
    MoTa: "",
    MaTrangThai: "",
  });

  const [trangThaiList, setTrangThaiList] = useState([]);

  useEffect(() => {
    if (state) {
      setForm({
        TenDM: state.TenDM || "",
        MoTa: state.MoTa || "",
        MaTrangThai: state.MaTrangThai || "",
      });
    }
  }, [state]);

  useEffect(() => {
    const fetchTrangThai = async () => {
      try {
        const res = await api.getAllTrangThai();
        setTrangThaiList(res.data || []);
      } catch {
        toast.error("Không thể tải trạng thái");
      }
    };
    fetchTrangThai();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "TenDM" || name === "MoTa") {
      const forbiddenChars = "!@#$%^&*()+\\/0123456789";
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
    try {
      if (state?.MaDM) {
        await api.updateDMDaoTao(state.MaDM, form);
        toast.success("Cập nhật thành công!");
      } else {
        await api.createDMDaoTao(form);
        toast.success("Thêm mới thành công!");
      }
      navigate("/dmdaotao");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Lỗi khi lưu dữ liệu!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-blue-700 mb-6">
        {state ? "SỬA DANH MỤC ĐÀO TẠO" : "THÊM MỚI DANH MỤC ĐÀO TẠO"}
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <div className="col-span-2 flex items-center gap-4">
          <Label className="min-w-[140px]">
            Tên danh mục <span className="text-red-500">(*)</span>
          </Label>
          <Input
            name="TenDM"
            value={form.TenDM}
            onChange={handleChange}
            className="flex-1"
          />
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

        <div className="flex items-center gap-4">

        </div>

        <div className="flex items-center gap-4">

        </div>

        <div className="flex items-center gap-4">
          <Label className="min-w-[140px]">
            Mô tả <span className="text-red-500">(*)</span>
          </Label>
          <textarea
            name="MoTa"
            value={form.MoTa}
            onChange={handleChange}
            className="flex-1 border rounded px-3 py-2"
            rows={5}
          />
        </div>

        
      </div>

      <div className="mt-8 flex gap-4 ml-[900px]">
        <Button variant="outline" onClick={() => navigate("/dmdaotao")}>
          Hủy
        </Button>
        <Button className="bg-blue-700 text-white hover:bg-blue-800" onClick={handleSubmit}>
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default DMDaoTaoFormPage;
