import { useEffect, useState } from "react";
import api from "../../services/bangluong.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Calculator } from "lucide-react";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const statusClass = {
  1: "text-yellow-600 font-medium",
  2: "text-green-600 font-medium",
  0: "text-red-600 font-medium",
};

const statusText = {
  1: "Chưa duyệt",
  2: "Đã duyệt",
  0: "Từ chối",
};

const BangLuongList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [filters, setFilters] = useState({ thangNam: "", donVi: "" });
  const [donViList, setDonViList] = useState([]);

  const navigate = useNavigate();

  const fetchBangLuong = async () => {
    try {
      setLoading(true);

      const res = await api.getAll(filters);

      if (res.data && res.data.data) {
        setData(res.data.data);
      } else if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        console.warn("Unexpected data format:", res.data);
        setData([]);
      }
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err);
      toast.error("Không thể tải dữ liệu bảng lương");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const result = await api.remove(idToDelete);
      if (result.data?.message) {
        toast.success(result.data.message);
      } else {
        toast.success("Xóa thành công!");
      }
      fetchBangLuong();
    } catch (err) {
      console.error("Lỗi xóa:", err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Lỗi khi xóa!");
      }
    }
    setShowConfirm(false);
  };

  const handleTinhLuong = async () => {
    if (!filters.thangNam) {
      toast.error("Vui lòng chọn tháng năm!");
      return;
    }

    try {
      const result = await api.tinhLuong({
        thangNam: filters.thangNam,
        donViId: filters.donVi || null,
      });

      if (result.data?.message) {
        toast.success(result.data.message);
      } else {
        toast.success("Tính lương thành công!");
      }
      fetchBangLuong();
    } catch (err) {
      console.error("Lỗi tính lương:", err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Lỗi khi tính lương!");
      }
    }
  };

  const handleApprove = async (id) => {
    try {
      const result = await api.approve(id);
      if (result.data?.message) {
        toast.success(result.data.message);
      } else {
        toast.success("Phê duyệt thành công!");
      }
      fetchBangLuong();
    } catch (err) {
      console.error("Lỗi phê duyệt:", err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Lỗi khi phê duyệt!");
      }
    }
  };

  const handleReject = async (id) => {
    try {
      const result = await api.reject(id);
      if (result.data?.message) {
        toast.success(result.data.message);
      } else {
        toast.success("Từ chối thành công!");
      }
      fetchBangLuong();
    } catch (err) {
      console.error("Lỗi từ chối:", err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Lỗi khi từ chối!");
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount || 0);
  };

  // Load data when component mounts
  useEffect(() => {
    fetchBangLuong();
  }, []); // Load ngay khi component mount

  // Load data when filters change (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchBangLuong();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  useEffect(() => {
    const fetchDonVi = async () => {
      try {
        const res = await api.getDonVi();
        setDonViList(res.data || []);
      } catch (err) {
        console.error("Lỗi tải đơn vị:", err);
      }
    };
    fetchDonVi();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-blue-700">
          QUẢN LÝ BẢNG LƯƠNG CÁN BỘ
        </h1>
        <div className="flex gap-2">
          <Button className="bg-green-600 text-white" onClick={handleTinhLuong}>
            <Calculator className="w-4 h-4 mr-1" /> Tính lương
          </Button>
          <Button
            className="bg-blue-600 text-white"
            onClick={() => navigate("/bangluong/form")}
          >
            <Plus className="w-4 h-4 mr-1" /> Thêm mới
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Input
          type="month"
          placeholder="Chọn tháng năm"
          className="max-w-sm"
          value={filters.thangNam}
          onChange={(e) =>
            setFilters((f) => ({ ...f, thangNam: e.target.value }))
          }
        />
        <select
          className="border rounded px-3 py-2"
          value={filters.donVi}
          onChange={(e) => setFilters((f) => ({ ...f, donVi: e.target.value }))}
        >
          <option value="">Tất cả đơn vị</option>
          {donViList.map((dv) => (
            <option key={dv.MaDV} value={dv.MaDV}>
              {dv.TenDV}
            </option>
          ))}
        </select>
        <Button
          variant="outline"
          onClick={() => setFilters({ thangNam: "", donVi: "" })}
        >
          Xóa bộ lọc
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-4">Đang tải dữ liệu...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">STT</th>
                <th className="border p-2">Mã CB</th>
                <th className="border p-2">Họ và tên</th>
                <th className="border p-2">Tháng/Năm</th>
                <th className="border p-2">Cấp bậc</th>
                <th className="border p-2">Chức vụ</th>
                <th className="border p-2">Đơn vị</th>
                <th className="border p-2">Lương cơ bản</th>
                <th className="border p-2">Phụ cấp</th>
                <th className="border p-2">Thực lãnh</th>
                <th className="border p-2">Trạng thái</th>
                <th className="border p-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={row.MaBL}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">
                      CB{String(row.MaCB).padStart(3, "0")}
                    </td>
                    <td className="border p-2">{row.HoTen}</td>
                    <td className="border p-2 font-medium">{row.ThangNam}</td>
                    <td className="border p-2">{row.CapBac}</td>
                    <td className="border p-2">{row.ChucVu}</td>
                    <td className="border p-2">{row.DonVi}</td>
                    <td className="border p-2">
                      {formatCurrency(row.LuongCoBan)}
                    </td>
                    <td className="border p-2">
                      {formatCurrency(
                        (row.PhuCapChucVu || 0) +
                          (row.PhuCapCapBac || 0) +
                          (row.PhuCapKhac || 0)
                      )}
                    </td>
                    <td className="border p-2 font-bold">
                      {formatCurrency(row.ThucLanh)}
                    </td>
                    <td
                      className={`border p-2 ${
                        statusClass[row.TrangThai] || ""
                      }`}
                    >
                      {statusText[row.TrangThai]}
                    </td>
                    <td className="border p-2 space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/bangluong/view/${row.MaBL}`)}
                      >
                        Xem
                      </Button>
                      <Button
                        className="bg-blue-600 text-white"
                        size="sm"
                        onClick={() =>
                          navigate("/bangluong/form", { state: row })
                        }
                      >
                        Sửa
                      </Button>
                      <Button
                        className="bg-red-600 text-white"
                        size="sm"
                        onClick={() => handleDeleteClick(row.MaBL)}
                      >
                        Xoá
                      </Button>
                      {row.TrangThai === 1 && (
                        <>
                          <Button
                            className="bg-green-600 text-white"
                            size="sm"
                            onClick={() => handleApprove(row.MaBL)}
                          >
                            Duyệt
                          </Button>
                          <Button
                            className="bg-orange-600 text-white"
                            size="sm"
                            onClick={() => handleReject(row.MaBL)}
                          >
                            Từ chối
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center p-4 text-gray-500">
                    {loading ? "Đang tải..." : "Không có dữ liệu"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

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

export default BangLuongList;
