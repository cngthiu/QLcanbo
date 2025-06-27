// client/src/pages/QuanLyTTCaNhan/LyLichDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/lylich.api";
import { Button } from "@/components/ui/button";

const LyLichDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.getCBById(id)
      .then((res) => setData(res.data))
      .catch(() => {
        alert("Không tìm thấy cán bộ!");
        navigate("/canbo");
      });
  }, [id]);

  if (!data) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-4">
      <h1 className="text-2xl font-bold text-blue-700">Thông tin chi tiết cán bộ</h1>
      <div className="border rounded p-4 shadow bg-white grid grid-cols-2 gap-4 text-sm">
        <p><strong>Họ tên khai sinh:</strong> {data.HoTenKhaiSinh}</p>
        <p><strong>Họ tên thường dùng:</strong> {data.HoTenThuongDung}</p>
        <p><strong>Bí danh:</strong> {data.BiDanh}</p>
        <p><strong>Giới tính:</strong> {data.GioiTinh}</p>
        <p><strong>Cấp bậc:</strong> {data.CapBac}</p>
        <p><strong>Chức vụ:</strong> {data.ChucVu}</p>
        <p><strong>Đơn vị:</strong> {data?.DonVi?.TenDV || ""}</p>
        <p><strong>Ngày sinh:</strong> {data.NgaySinh?.slice(0, 10)}</p>
        <p><strong>Nơi sinh:</strong> {data.NoiSinh}</p>
        <p><strong>Quê quán:</strong> {data.QueQuan}</p>
        <p><strong>Nơi tạm trú:</strong> {data.NoiTamTru}</p>
        <p><strong>Nơi ĐKHK:</strong> {data.NoiDKHK}</p>
        <p><strong>Dân tộc:</strong> {data.DanToc}</p>
        <p><strong>Tôn giáo:</strong> {data.TonGiao}</p>
        <p><strong>Thành phần gia đình:</strong> {data.ThanhPhanGD}</p>
        <p><strong>Nghề nghiệp:</strong> {data.NgheNghiep}</p>
        <p><strong>Ngày nhập ngũ:</strong> {data.NgayNhapNgu?.slice(0, 10)}</p>
        <p><strong>Ngày về đơn vị:</strong> {data.NgayCongTac?.slice(0, 10)}</p>
        <p><strong>Ngày vào Đảng:</strong> {data.Ngayvaodang?.slice(0, 10)}</p>
        <p><strong>Ngày chính thức:</strong> {data.Ngaychinhthuc?.slice(0, 10)}</p>
        <p><strong>Chi bộ:</strong> {data.Chibo}</p>
        <p><strong>Ngày tham gia CM:</strong> {data.NgayThamGiaCM?.slice(0, 10)}</p>
        <p><strong>Ngày vào Đoàn:</strong> {data.Ngayvaodoan?.slice(0, 10)}</p>
        <p><strong>Tham gia TCXH:</strong> {data.ThamGiaTCXH}</p>
        <p><strong>Giáo dục phổ thông:</strong> {data.GDPT}</p>
        <p><strong>Lý luận chính trị:</strong> {data.LyLuanCT}</p>
        <p><strong>Học hàm:</strong> {data.HocHam}</p>
        <p><strong>Học vị:</strong> {data.HocVi}</p>
        <p><strong>Ngoại ngữ:</strong> {data.NgoaiNgu}</p>
        <p><strong>Chuyên môn nghiệp vụ:</strong> {data.ChuyenMonNV}</p>
        <p><strong>Công tác đang làm:</strong> {data.CongTacDangLam}</p>
        <p><strong>Số CCCD:</strong> {data.SoCCCD}</p>

      </div>

      <Button variant="outline" onClick={() => navigate("/canbo")}>
        Quay lại danh sách
      </Button>
    </div>
  );
};

export default LyLichDetail;
