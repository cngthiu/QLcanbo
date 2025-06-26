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

const DMDaoTaoList = () => {
  const [data, setData] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.getAllDMDaoTao({ page, pageSize });
      setData(res.data || []);
      setTotal(res.total || 0);
    } catch (err) {
      console.error("Error fetching DMDaoTao:", err);
      toast.error("Không thể tải dữ liệu danh mục đào tạo.");
    }
  };

  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await api.removeDMDaoTao(idToDelete);
      toast.success("Xóa thành công!");
      fetchData();
    } catch (err) {
      console.error("Error deleting DMDaoTao:", err);
      toast.error("Xóa thất bại!");
    } finally {
      setShowConfirm(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-blue-700">
          QUẢN LÝ DANH MỤC ĐÀO TẠO
        </h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Button
          className="bg-blue-600 text-white"
          onClick={() => navigate("/daotao")}
        >
          Chương trình đào tạo
        </Button>
        <div className="flex items-center gap-4">
          <Button
            className="bg-blue-600 text-white"
            onClick={() => navigate("/dmdaotao/form")}
          >
            <Plus className="w-4 h-4 mr-1" /> Thêm mới
          </Button>
        </div>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">STT</th>
            <th className="border p-2">Tên danh mục</th>
            <th className="border p-2">Mô tả</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.MaDM}>
              <td className="border p-2 ">{(page - 1) * pageSize + idx + 1}</td>
              <td className="border p-2">{row.TenDM || "N/A"}</td>
              <td className="border p-2 ">{row.MoTa || "N/A"}</td>
              <td className={`border p-2 ${row.TrangThai?.TenTrangThai === "Ngưng hoạt động" ? "text-red-600 font-medium" : "text-green-600 font-medium"}`}>
                {row.TrangThai?.TenTrangThai || "N/A"}
              </td>
              <td className="border p-2 space-x-1 flex justify-center">
                <Button
                  className="bg-blue-600 text-white"
                  size="sm"
                  onClick={() => navigate("/dmdaotao/form", { state: row })}
                >
                  Sửa
                </Button>
                <Button
                  className="bg-red-600 text-white"
                  size="sm"
                  onClick={() => handleDeleteClick(row.MaDM)}
                >
                  Xoá
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

export default DMDaoTaoList;