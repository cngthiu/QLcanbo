import { useEffect, useState } from "react";
import api from "../../services/daotao.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const DaoTaoList = () => {
  const [data, setData] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const fetchDaoTao = async () => {
    try {
      const res = await api.getAll({ keyword: search, page, pageSize });
      setData(res.data || []);
      setTotal(res.total || 0);
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err);
      toast.error("Không thể tải dữ liệu đào tạo.");
    }
  };

  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await api.remove(idToDelete);
      toast.success("Xóa thành công!");
      fetchDaoTao();
    } catch (err) {
      console.error("Lỗi xóa dữ liệu:", err);
      toast.error("Xóa thất bại!");
    } finally {
      setShowConfirm(false);
    }
  };

  useEffect(() => {
    fetchDaoTao();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1); // reset về trang 1 khi tìm kiếm
      fetchDaoTao();
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [search]);

  useEffect(() => {
    fetchDaoTao();
  }, [page]);

  // Hàm format ngày dd/MM/yyyy
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-blue-700">QUẢN LÝ ĐÀO TẠO</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Button
          className="bg-blue-600 text-white"
          onClick={() => navigate("/dmdaotao")}
        >
          Danh mục đào tạo
        </Button>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Nhập từ khóa tìm kiếm..."
              className="max-w-sm pl-8"
              value={search}
              onChange={(e) => {
                const forbiddenChars = "!@#$%^&*()+\\/";
                let cleanValue = "";
                for (const char of e.target.value) {
                  if (!forbiddenChars.includes(char)) {
                    cleanValue += char;
                  }
                }
                setSearch(cleanValue.trimStart());
              }}
            />
          </div>
          <Button
            className="bg-blue-600 text-white"
            onClick={() => navigate("/daotao/form")}
          >
            <Plus className="w-4 h-4 mr-1" /> Thêm mới
          </Button>
        </div>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">STT</th>
            <th className="border p-2">Tên chương trình đào tạo</th>
            <th className="border p-2">Khóa</th>
            <th className="border p-2">Danh mục đào tạo</th>
            <th className="border p-2">Ngày bắt đầu</th>
            <th className="border p-2">Ngày kết thúc</th>
            <th className="border p-2">Địa điểm</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.MaCT}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                {row.TenCT ? (
                  <button
                    className="hover:underline cursor-pointer font-medium"
                    onClick={() => navigate(`/daotao/thamgia/${row.MaCT}`)}
                  >
                    {row.TenCT}
                  </button>
                ) : "N/A"}
              </td>
              <td className="border p-2">{row.Khoa || "N/A"}</td>
              <td className="border p-2">{row.DanhMuc?.TenDM || "N/A"}</td>
              <td className="border p-2">{formatDate(row.NgayBatDau)}</td>
              <td className="border p-2">{formatDate(row.NgayKetThuc)}</td>
              <td className="border p-2">{row.DiaDiem || "N/A"}</td>
              <td className={`border p-2 ${row.TrangThai?.TenTrangThai === "Ngưng hoạt động" ? "text-red-600 font-medium" : "text-green-600 font-medium"}`}>
                {row.TrangThai?.TenTrangThai || "N/A"}
              </td>
              <td className="border p-2 space-x-1 flex justify-center">
                <Button
                  className="bg-orange-400 text-white"
                  size="sm"
                  onClick={() => navigate(`/daotao/thamgia/${row.MaCT}/print`, { state: row })}
                >
                  In
                </Button>
                <Button
                  className="bg-green-600 text-white"
                  size="sm"
                  onClick={() => navigate(`/daotao/thamgia/${row.MaCT}/send`, { state: row })}
                >
                  Gửi email
                </Button>
                <Button
                  className="bg-blue-600 text-white"
                  size="sm"
                  onClick={() => navigate("/daotao/form", { state: row })}
                >
                  Sửa
                </Button>
                <Button
                  className="bg-red-600 text-white"
                  size="sm"
                  onClick={() => handleDeleteClick(row.MaCT)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end items-center mt-4">
        <Button
          className="bg-white border-2 text-blue-600 font-bold rounded-none"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Quay lại
        </Button>
        <span className="border px-3 py-1 bg-blue-600 font-bold">{page}</span>
        <Button
          className="bg-white border-2 text-blue-600 font-bold rounded-none"
          disabled={page * pageSize >= total}
          onClick={() => setPage((p) => p + 1)}
        >
          Tiếp tục
        </Button>
      </div>

      <ConfirmDialog
        open={showConfirm}
        title="XÁC NHẬN"
        message="Bạn có chắc chắn muốn xóa không?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default DaoTaoList;