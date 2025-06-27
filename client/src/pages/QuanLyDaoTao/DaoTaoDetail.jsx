import { useEffect, useState } from "react";
import api from "../../services/daotao.api";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { Plus} from "lucide-react";
import toast from "react-hot-toast";
import ConfirmDialog from "../../components/ConfirmDialog";

const DaoTaoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thamGiaList, setThamGiaList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [maCBToDelete, setMaCBToDelete] = useState(null);

  useEffect(() => {
    fetchThamGiaList();
  }, [id]);

  const fetchThamGiaList = async () => {
    try {
      const res = await api.getThamGiaByMaCT(id);
      setThamGiaList(res.data || []);
    } catch (err) {
      console.error("Lỗi lấy danh sách tham gia:", err);
      setThamGiaList([]);
    }
  };
  
  const handleDeleteClick = (maCB) => {
    setMaCBToDelete(maCB);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await api.removeCanBoFromCTDT(id, maCBToDelete);
      toast.success("Xóa cán bộ thành công!");
      fetchThamGiaList();
    } catch (error) {
      console.error("Lỗi khi xóa cán bộ:", error);
      toast.error("Lỗi khi xóa cán bộ!");
    } finally {
      setShowConfirm(false);
    }
  };

  if (thamGiaList.length === 0) return (
    <div className="p-4">
       <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-blue-700">QUẢN LÝ DANH SÁCH CÁN BỘ THAM GIA CHƯƠNG TRÌNH ĐÀO TẠO</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-end w-full">
          <Button
            className="bg-blue-600 text-white"
            onClick={() => navigate(`/daotao/thamgia/${id}/form`)}
          >
            <Plus className="w-4 h-4 " /> Thêm cán bộ
          </Button>
        </div>
      </div>
      <p className="text-center mt-4">Chưa có cán bộ nào tham gia chương trình này.</p>
    </div>
    );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-blue-700">QUẢN LÝ DANH SÁCH CÁN BỘ THAM GIA CHƯƠNG TRÌNH ĐÀO TẠO</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-end w-full">
          <Button
            className="bg-blue-600 text-white"
            onClick={() => navigate(`/daotao/thamgia/${id}/form`)}
          >
            <Plus className="w-4 h-4 " /> Thêm cán bộ
          </Button>
        </div>
      </div>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">STT</th>
            <th className="border p-2">Họ và tên</th>
            <th className="border p-2">Cấp bậc</th>
            <th className="border p-2">Lớp khóa</th>
            <th className="border p-2">Khóa học</th>
            <th className="border p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {thamGiaList.map((cb, idx) => (
            <tr key={cb.MaCB}>
              <td className="border p-2 text-center">{idx + 1}</td>
              <td className="border p-2">{cb.HoTenKhaiSinh}</td>
              <td className="border p-2">{cb.CapBac}</td>
              <td className="border p-2">{cb.TenCT}</td>
              <td className="border p-2">{cb.Khoa}</td>
              <td className="border p-2 space-x-1 flex justify-center">
                <Button
                  className="bg-red-600 text-white"
                  size="sm"
                  onClick={() => handleDeleteClick(cb.MaCB)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <ConfirmDialog
        open={showConfirm}
        title="XÁC NHẬN"
        message="Bạn có chắc chắn muốn xóa cán bộ này khỏi danh sách?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </div>
    
  );
};

export default DaoTaoDetail;