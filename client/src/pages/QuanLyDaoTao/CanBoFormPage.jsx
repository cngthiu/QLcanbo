import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "../../services/daotao.api";
import { toast } from "react-hot-toast";

const CanBoFormPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Contains data if editing
  const { id } = useParams(); // Get MaCT from URL (e.g., /daotao/thamgia/2/form)

  const [form, setForm] = useState({
    HoTenKhaiSinh: "",
    ChucVu: "",
    CapBac: "",
    MaDV: "",
  });

  const [tenDonVi, setTenDonVi] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCanBo, setSelectedCanBo] = useState(null);

  // NOTE: The APIs for fetching CapBac and DonVi lists are not available in the provided daotao.api.js
  // We will proceed by making the fields read-only after selecting a CanBo from search results.
  // useEffect(() => {
  //   const fetchDropdowns = async () => {
  //     try {
  //       // These API calls don't exist in the provided file, so they are commented out.
  //       // const capBacRes = await api.getAllCapBac();
  //       // const donViRes = await api.getAllDonVi();
  //       // setCapBacList(capBacRes.data || []);
  //       // setDonViList(donViRes.data || []);
  //     } catch {
  //       toast.error("Không thể tải danh sách cấp bậc hoặc đơn vị");
  //     }
  //   };
  //   fetchDropdowns();
  // }, []);

  useEffect(() => {
    if (state) {
      setForm({
        HoTenKhaiSinh: state.HoTenKhaiSinh || "",
        ChucVu: state.ChucVu || "",
        CapBac: state.CapBac || "",
        MaDV: state.MaDV || "",
      });
    }
  }, [state]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "HoTenKhaiSinh") {
      const sanitizedValue = value.replace(/[0-9!@#$%^&*()\-+/\\]/g, '');
      setForm((prev) => ({ ...prev, [name]: sanitizedValue }));
      
      setSelectedCanBo(null);
      setTenDonVi("");

      if (sanitizedValue.length >= 2) {
        setIsSearching(true);
        try {
          const response = await api.searchCanBoByName(sanitizedValue);
          setSearchResults(response.data || []);
        } catch (error) {
          console.error("Lỗi tìm kiếm cán bộ:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectCanBo = (canBo) => {
    setSelectedCanBo(canBo);
    setForm({
      HoTenKhaiSinh: canBo.HoTenKhaiSinh || "",
      ChucVu: canBo.ChucVu || "",
      CapBac: canBo.CapBac || "",
      MaDV: canBo.MaDV || "",
    });
    setTenDonVi(canBo.DonVi?.TenDV || "N/A");
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleSubmit = async () => {
    if (!selectedCanBo || !selectedCanBo.MaCB) {
      toast.error("Vui lòng tìm kiếm và chọn một cán bộ từ danh sách.");
      return;
    }

    try {
      const dataToSend = { MaCB: selectedCanBo.MaCB };
      await api.addCanBoToCTDT(id, dataToSend);
      toast.success("Thêm cán bộ thành công!");
      navigate(`/daotao/thamgia/${id}`);
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      const errorMessage =
        error.response?.data?.error === "CANBO_ALREADY_ENROLLED"
          ? "Cán bộ đã có trong danh sách tham gia!"
          : "Lỗi khi lưu dữ liệu!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-blue-700 mb-6">
        {state ? "SỬA CÁN BỘ" : "THÊM CÁN BỘ THAM GIA"}
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <div className="col-span-2 flex items-center gap-4 relative">
          <Label className="min-w-[140px]">
            Họ và Tên <span className="text-red-500">(*)</span>
          </Label>
          <Input
            name="HoTenKhaiSinh"
            value={form.HoTenKhaiSinh}
            onChange={handleChange}
            className="flex-1"
            placeholder="Nhập họ tên để tìm kiếm..."
            autoComplete="off"
          />
          {searchResults.length > 0 && (
            <div className="absolute top-10 left-[150px] right-0 bg-white border rounded shadow-lg max-h-60 overflow-y-auto z-10">
              {isSearching ? (
                 <div className="p-2 text-gray-500">Đang tìm kiếm...</div>
              ) : (
                searchResults.map((canBo) => (
                  <div
                    key={canBo.MaCB}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectCanBo(canBo)}
                  >
                    {canBo.HoTenKhaiSinh} - {canBo.DonVi?.TenDV || "Không có đơn vị"}
                  </div>
                ))
              )}
            </div>
          )}
          <Label className="min-w-[140px]">
            Chức vụ <span className="text-red-500">(*)</span>
          </Label>
          <Input
            name="ChucVu"
            value={form.ChucVu}
            onChange={handleChange}
            className="flex-1"
            readOnly={!!selectedCanBo}
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="min-w-[140px]">
            Cấp bậc <span className="text-red-500">(*)</span>
          </Label>
          <Input
            name="CapBac"
            value={form.CapBac}
            onChange={handleChange}
            className="flex-1"
            readOnly={!!selectedCanBo}
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="min-w-[140px]">
            Đơn vị <span className="text-red-500">(*)</span>
          </Label>
           <Input
            name="MaDV"
            value={selectedCanBo ? tenDonVi : form.MaDV}
            onChange={handleChange}
            className="flex-1"
            readOnly={!!selectedCanBo}
          />
        </div>
      </div>

      <div className="mt-8 flex gap-4 justify-end">
        <Button variant="outline" onClick={() => navigate(`/daotao/thamgia/${id}`)}>
          Hủy
        </Button>
        <Button className="bg-blue-700 text-white hover:bg-blue-800" onClick={handleSubmit}>
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default CanBoFormPage;