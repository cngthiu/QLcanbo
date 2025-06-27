import { useEffect, useState } from "react";
import api from "../../services/daotao.api";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";

const InDanhSachCanBo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thamGiaList, setThamGiaList] = useState([]);

  useEffect(() => {
    api.getThamGiaByMaCT(id)
      .then((res) => setThamGiaList(res.data))
      .catch(() => setThamGiaList([]));
  }, [id]);

  return (
    <div className="p-4 flex flex-col items-center">
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .print-area, .print-area * { visibility: visible !important; }
          .print-area { position: absolute; left: 0; top: 0; width: 100vw; background: white; z-index: 9999; }
          .no-print { display: none !important; }
        }
      `}</style>
      <div className="print-area w-full flex flex-col items-center">
        <h1 className="text-xl font-bold text-blue-700 mb-6 text-left w-full no-print">
          IN DANH SÁCH CÁN BỘ THAM GIA
        </h1>
        <div className="border mx-auto p-8 bg-white" style={{ minWidth: 600 }}>
          <div className="text-center font-bold text-lg mb-2">DANH SÁCH</div>
          <div className="text-center font-bold mb-2">
            CÁN BỘ, GIẢNG VIÊN THAM GIA KHÓA ĐÀO TẠO VÀ THI CHỨNG CHỈ
          </div>
          <div className="text-center text-sm mb-2">
            (Kèm theo Công văn số: 144/ĐT-KH ngày 12/5/2025 của Phòng Đào tạo)
          </div>
          <div className="text-left font-bold mb-2">
            2. Lớp {thamGiaList[0]?.TenCT || "..."} : {thamGiaList.length} đồng chí
          </div>
          <table className="w-full border text-sm mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">TT</th>
                <th className="border p-2">Họ và tên</th>
                <th className="border p-2">Cấp bậc</th>
                <th className="border p-2">Đơn vị</th>
                <th className="border p-2">Lớp</th>
                <th className="border p-2">Khóa</th>
              </tr>
            </thead>
            <tbody>
              {thamGiaList.map((cb, idx) => (
                <tr key={cb.MaCB}>
                  <td className="border p-2 text-center">{idx + 1}</td>
                  <td className="border p-2">{cb.HoTenKhaiSinh}</td>
                  <td className="border p-2">{cb.CapBac}</td>
                  <td className="border p-2">{cb.TenDV}</td>
                  <td className="border p-2">{cb.TenCT}</td>
                  <td className="border p-2 text-center">{cb.Khoa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end gap-8 mt-8 no-print w-full mr-[400px]">
        <Button
          variant="outline"
          className=" bg-red-600 text-white px-8 py-2 text-lg"
          onClick={() => navigate(-1)}
        >
          Hủy
        </Button>
        <Button
          className="bg-blue-600 text-white px-8 py-2 text-lg"
          onClick={() => window.print()}
        >
          Đồng ý
        </Button>
      </div>
    </div>
  );
};

export default InDanhSachCanBo;