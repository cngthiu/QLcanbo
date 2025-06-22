import { useEffect, useState } from "react";
import api from "../../services/daotao.api";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const GuiEmail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thamGiaList, setThamGiaList] = useState([]);
  const [selectedDonVi, setSelectedDonVi] = useState([]);

  useEffect(() => {
    api.getThamGiaByMaCT(id)
      .then((res) => setThamGiaList(res.data))
      .catch(() => setThamGiaList([]));
  }, [id]);

  const handleCheck = (id) => {
    setSelectedDonVi((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleSendEmail = async () => {
    if (uniqueDonVi.length === 0) {
      toast.error("Không có đơn vị nào phù hợp để gửi email.");
      return;
    }
    if (selectedDonVi.length === 0) {
      toast.error("Vui lòng chọn ít nhất một đơn vị để gửi email.");
      return;
    }
    try {
      const emailContent = document.querySelector('.print-area')?.innerHTML;
      console.log("Nội dung email sẽ gửi:", emailContent);
      if (!emailContent) {
        toast.error("Không tìm thấy nội dung email để gửi.");
        return;
      }
      await api.sendEmailForTraining(id, { content: emailContent });
      toast.success("Đã gửi email thành công!");
      navigate(-1);
    } catch (error) {
      console.error("Lỗi khi gửi email:", error);
      toast.error("Gửi email thất bại: " + (error.response?.data?.message || error.message));
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDonVi(uniqueDonVi);
    } else {
      setSelectedDonVi([]);
    }
  };

  const uniqueDonVi = [...new Set(thamGiaList.map(cb => cb.TenDV))];
  const info = thamGiaList.length > 0 ? thamGiaList[0] : null;

  const formatDate = (dateString) => {
    if (!dateString) return "DD/MM/YYYY";
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="p-4 w-full">
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .print-area, .print-area * { visibility: visible !important; }
          .print-area { position: absolute; left: 0; top: 0; width: 100vw; background: white; z-index: 9999; }
          .no-print { display: none !important; }
        }
      `}</style>
      <h1
        className="text-2xl font-bold text-blue-700 mb-6 text-left cursor-pointer hover:underline"
        onClick={() => navigate(`/user/emails`)}
      >
        GỬI EMAIL
      </h1>
      <div className="flex gap-8 items-start">
        {/* Cột trái: Công văn + bảng */}
        <div className="print-area border bg-white p-6" style={{ minWidth: 500, maxWidth: 600 }}>
          <div className="flex justify-between items-start mb-4">
            <div className="w-1/2 text-center">
              <div className="text-xs font-bold leading-tight">
                HỌC VIỆN KỸ THUẬT QUÂN SỰ<br />
                <span className="font-extrabold">PHÒNG ĐÀO TẠO</span><br />
                Số: 144/ĐT-KH
              </div>
            </div>
            <div className="w-1/2 text-center">
              <div className="text-xs font-bold leading-tight">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br />
                Độc lập - Tự do - Hạnh phúc
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start text-xs mt-4">
            <div className="w-1/2 text-center">
              <p>
                V/v cho phép cán bộ tham gia các khóa đào tạo và các lớp chứng chỉ
              </p>
            </div>
            <div className="w-1/2 text-center italic">
              <p>{`Hà Nội, ngày ${new Date().getDate()} tháng ${new Date().getMonth() + 1} năm ${new Date().getFullYear()}`}</p>
            </div>
          </div>
          <div className="text-xs font-bold mb-2 flex justify-center">
            {uniqueDonVi.length > 0 && (
              <div className="grid grid-cols-[auto_1fr] gap-x-2">
                <div className="row-span-full self-start">Kính gửi:</div>
                <div className="col-start-2">- Thủ trưởng {uniqueDonVi[0]}</div>
                {uniqueDonVi.slice(1).map((tenDV, index) => (
                  <div key={index} className="col-start-2">- Thủ trưởng {tenDV}</div>
                ))}
              </div>
            )}
          </div>
          <div className="text-xs mb-2">
            <p className="indent-8 mb-2">
              Căn cứ vào Kế hoạch số 01/KH-HV ngày 11/1/2000 của Học viện về tổ chức các khóa đào tạo ngắn hạn và chứng chỉ quốc tế cho cán bộ, giảng viên.
            </p>
            <p className="indent-8 mb-2">
              Căn cứ Quyết định số 100/QĐ-HV ngày 12/10/2010 của Giám đốc Học viện phê duyệt Kết quả lựa chọn nhà thầu gói thầu: Đào tạo và thi chứng chỉ quốc tế.
            </p>
            <p className="indent-8">
              Để nâng cao năng lực cho cán bộ, giảng viên trong toàn Học viện, Phòng Đào tạo đề nghị các đơn vị cho phép các đồng chí cán bộ có tên sau được tham gia khóa học đào tạo:
            </p>
            <p className="text-center ">(Có Danh sách kèm theo)</p>
          </div>
          <div className="text-xs mb-2">
            <p className="indent-8 mb-2">
              Các khóa học ngắn hạn được tổ chức tại Học viện, hình thức đào tạo trực tiếp hoặc trực tuyến. Thời lượng mỗi khóa khoảng 60 buổi học và 01 buổi thi.
            </p>
            <p className="indent-8">
              Thời gian tổ chức dự kiến từ tháng {formatDate(info?.NgayBatDau)} đến tháng {formatDate(info?.NgayKetThuc)}. Tại {info?.DiaDiem}. Khi có lịch đi học chính thức, Phòng đào tạo sẽ có thông báo cụ thể sau.
            </p>
          </div>
          <div className="text-xs mb-2 indent-8">
            Phòng Đào tạo xin trân trọng cảm ơn !
          </div>
          <div className="flex text-xs mt-4 mb-2">
            <div className="w-1/2 pl-[40px] text-[10px]">Nơi nhận:<br />-P1, V4<br />-d1, d3<br />-Lưu: P2</div>
            <div className="w-1/2 text-center font-bold">TRƯỞNG PHÒNG</div>
          </div>
          <br />
          {/* Bảng danh sách */}
          <div className="mt-2">
            <div className="text-center font-bold text-sm mb-2">DANH SÁCH</div>
            <div className="text-center font-bold text-xs mb-2">
              CÁN BỘ, GIẢNG VIÊN THAM GIA KHÓA ĐÀO TẠO VÀ THI CHỨNG CHỈ
            </div>
            <div className="text-center text-xs mb-2">
              (Kèm theo Công văn số: 144/ĐT-KH ngày {formatDate(new Date())} của Phòng Đào tạo)
            </div>
            <div className="text-left font-bold text-xs mb-2">
              1. Lớp {info?.TenCT || "..."} : {thamGiaList.length} đồng chí
            </div>
            <table className="w-full border text-xs mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-1">TT</th>
                  <th className="border p-1">Họ và tên</th>
                  <th className="border p-1">Cấp bậc</th>
                  <th className="border p-1">Đơn vị</th>
                  <th className="border p-1">Lớp</th>
                  <th className="border p-1">Khóa</th>
                </tr>
              </thead>
              <tbody>
                {thamGiaList.map((cb, idx) => (
                  <tr key={cb.MaCB}>
                    <td className="border p-1 text-center">{idx + 1}</td>
                    <td className="border p-1">{cb.HoTenKhaiSinh}</td>
                    <td className="border p-1">{cb.CapBac}</td>
                    <td className="border p-1">{cb.TenDV}</td>
                    <td className="border p-1">{cb.TenCT}</td>
                    <td className="border p-1 text-center">{cb.Khoa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Cột phải: chọn đơn vị nhận thông báo (chỉ làm giao diện giả lập) */}
        <div className="bg-white border rounded p-6 min-w-[320px] max-w-[340px] ml-8">
          <div className="font-bold mb-2">Chọn đơn vị nhận thông báo</div>
          <table className="w-full text-sm mb-6">
            <thead>
              <tr>
                <th className="w-8 text-center">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={uniqueDonVi.length > 0 && selectedDonVi.length === uniqueDonVi.length}
                    className="accent-blue-600"
                  />
                </th>
                <th className="text-left pb-2">Đơn vị</th>
              </tr>
            </thead>
            <tbody>
              {uniqueDonVi.map((tenDV, index) => (
                <tr key={index}>
                  <td className="w-8 py-1 text-center">
                    <input
                      type="checkbox"
                      id={`donvi-checkbox-${index}`}
                      checked={selectedDonVi.includes(tenDV)}
                      onChange={() => handleCheck(tenDV)}
                      className="accent-blue-600"
                    />
                  </td>
                  <td className="py-1">
                    <label htmlFor={`donvi-checkbox-${index}`} className="cursor-pointer block w-full">
                      {tenDV}
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end gap-4 mt-8">
            <Button
              variant="outline"
              className="bg-red-600 text-white px-8 py-2 text-lg"
              onClick={() => navigate(-1)}
            >
              Hủy
            </Button>
            <Button
              className="bg-blue-600 text-white px-8 py-2 text-lg"
              onClick={handleSendEmail}
            >
              Gửi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuiEmail;