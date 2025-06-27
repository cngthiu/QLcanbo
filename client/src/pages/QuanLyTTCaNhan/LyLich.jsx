import { useEffect, useState } from "react";
import api from "../../services/lylich.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import moment from "moment";
import Pagination from "../../components/Pagination";

const LyLich = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [filters, setFilters] = useState({ keyword: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLyLich = async (page = 1, keyword = "") => {
  try {
    const res = await api.getAllCanBo({ page, pageSize: 10, keyword });
    const { items, totalPages } = res.data;

    setData(Array.isArray(items) ? items : []);
    setTotalPages(totalPages || 1);
    setCurrentPage(page);
  } catch (err) {
    console.error("Lỗi lấy dữ liệu:", err);
    setData([]);
  }
};

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchLyLich(newPage);
    }
  };

 useEffect(() => {
  const delay = setTimeout(() => {
    fetchLyLich(currentPage, filters.keyword);
  }, 300);

  return () => clearTimeout(delay);
}, [filters, currentPage]);

  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (await api.deleteCanBo(idToDelete)) {
      toast.success("Xoa thanh cong!");
    }
    fetchLyLich();
    setShowConfirm(false);
  };

  useEffect(() => {
    fetchLyLich();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-blue-700">
          QUẢN LÝ THÔNG TIN CÁ NHÂN
        </h1>
        <Button
          className="bg-blue-600 text-white"
          onClick={() => navigate("/canbo/form")}
        >
          <Plus className="w-4 h-4 mr-1" /> Thêm mới
        </Button>
      </div>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Nhập từ khóa tìm kiếm..."
          className="max-w-sm"
          value={filters.keyword}
          onChange={(e) => {
            setFilters((f) => ({ ...f, keyword: e.target.value }));
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="flex gap-4 mb-4">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">STT</th>
              <th className="border p-2">Mã cán bộ</th>
              <th className="border p-2">Họ và tên</th>
              <th className="border p-2">Cấp bậc</th>
              <th className="border p-2">Chức vụ</th>
              <th className="border p-2">Đơn vị</th>
              <th className="border p-2">Ngày tạo</th>
              <th className="border p-2">Ngày cập nhật</th>
              <th className="border p-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.MaCB}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{`CB${row.MaCB.toString().padStart(
                  3,
                  "0"
                )}`}</td>
                <td className="border p-2">{row.HoTenKhaiSinh}</td>
                <td className="border p-2">{row.CapBac}</td>
                <td className="border p-2">{row.ChucVu}</td>
                <td className="border p-2">{row.DonVi.TenDV}</td>
                <td className="border p-2">
                  {moment(row.NgayTao).format("DD/MM/YYYY")}
                </td>
                <td className="border p-2">
                  {moment(row.NgaySua).format("DD/MM/YYYY")}
                </td>
                <td className="border p-2 space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/canbo/view/${row.MaCB}`)}
                  >
                    Xem
                  </Button>

                  <Button
                    className="bg-blue-600 text-white"
                    size="sm"
                    onClick={async () => {
                      try {
                        const res = await api.getCBById(row.MaCB);
                        navigate(`/canbo/update/${row.MaCB}`, {
                          state: res.data,
                        });
                      } catch (err) {
                        toast.error("Không thể tải dữ liệu cán bộ.");
                      }
                    }}
                  >
                    Sửa
                  </Button>
                  <Button
                    className="bg-red-600 text-white"
                    size="sm"
                    onClick={() => handleDeleteClick(row.MaCB)}
                  >
                    Xoá
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={showConfirm}
        title="XÁC NHẬN"
        message="Bạn có chắc chắn muốn xóa không?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />

      <div className="mt-4 flex justify-end">
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      </div>
      
    </div>
  );
};

export default LyLich;
