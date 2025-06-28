
-- Phan 1: Create Table 
CREATE DATABASE QLcanbo1;
USE QLcanbo;
------------------------------------- ROLE -----------------------------------------
CREATE TABLE Role (
	roleId INT IDENTITY(1,1) PRIMARY KEY,
	roleName NVARCHAR(100) NOT NULL,
	createDate DATETIME DEFAULT GETDATE()
);

CREATE TABLE [User] (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NULL,
    Password NVARCHAR(100) NOT NULL,
    createDate DATETIME DEFAULT GETDATE(),
    FullName NVARCHAR(100) NULL,
    UserType NVARCHAR(100) NULL,
    NoiDungEmail NVARCHAR(MAX) NULL
);
CREATE TABLE Role_User (
	UserId INT NOT NULL,
	roleId INT NOT NULL,
	isActive BIT DEFAULT 1,
	PRIMARY KEY (UserId, roleId),
	FOREIGN KEY (UserId) REFERENCES [User](UserId),
	FOREIGN KEY (roleId) REFERENCES Role(roleId)
);
--------------------------==THAM==------------------------------------------------
-- Bảng đơn vị
CREATE TABLE DonVi (
    MaDV INT IDENTITY(1,1) PRIMARY KEY,
    TenDV NVARCHAR(255) NULL,
    MoTa NVARCHAR(500)
);
-- Bang Can bo
CREATE TABLE CanBo (
[MaCB] [int] IDENTITY(1,1) PRIMARY KEY,
    [HoTenKhaiSinh] [nvarchar](50) NULL,
    [HoTenThuongDung] [nvarchar](50) NULL,
    [BiDanh] [nvarchar](50) NULL,
    [GioiTinh] [nvarchar](3) NULL,
    [CapBac] [nvarchar](20) NULL,
    [ChucVu] [nvarchar](50) NULL,
    [MaDV] [int] NULL,
    [NgaySinh] [date] NULL,
    [NoiSinh] [nvarchar](500) NULL,
    [QueQuan] [nvarchar](500) NULL,
    [NoiDKHK] [nvarchar](500) NULL,
    [NoiTamTru] [nvarchar](500) NULL,
    [DanToc] [nvarchar](15) NULL,
    [TonGiao] [nvarchar](20) NULL,
    [ThanhPhanGD] [nvarchar](50) NULL,
    [NgheNghiep] [nvarchar](50) NULL,
        -- THÔNG TIN ĐẢNG
    [Ngayvaodang] [date] NULL,
    [Ngaychinhthuc] [date] NULL,
    [Chibo] [nvarchar](50) NULL,
    [Ngayvaodoan] [date] NULL,
    [Noiketnap] [nvarchar](50) NULL,
    [Trangthaidang] [nvarchar](50) NULL,
    [QuaTrinhPhanDau] [nvarchar](500) NULL,
        -- THÔNG TIN QUÂN ĐỘI
    [NgayNhapNgu] [date] NULL,
    [NgayCongTac] [date] NULL,
        -- THÔNG TIN KHÁC
    [ThamGiaTCXH] [nvarchar](50) NULL,
    [NgayThamGiaCM] [date] NULL,
    [GDPT] [nvarchar](20) NULL,
    [ChuyenMonNV] [nvarchar](50) NULL,
    [LyLuanCT] [nvarchar](50) NULL,
    [NgoaiNgu] [nvarchar](50) NULL,
    [HocHam] [nvarchar](50) NULL,
    [HocVi] [nvarchar](50) NULL,
    [CongTacDangLam] [nvarchar](100) NULL,
    [SoCCCD] [char](12) NULL,
    [Anh] [image] NULL,
    [TrangThai] [nvarchar](20) NULL,
    [NgayTao] [datetime] NULL,
    [NgaySua] [datetime] NULL,
	FOREIGN KEY (MaDV) REFERENCES DonVi(MaDV)
);
CREATE TABLE ThanNhan (
  MaTN INT PRIMARY KEY IDENTITY(1,1),     
  HoTen NVARCHAR(50),               
  NamSinh INT,                      
  GioiTinh NVARCHAR(3),             
  QuanHe NVARCHAR(20),            
  NgheNghiep NVARCHAR(50),        
  QueQuan NVARCHAR(50),             
  NoiTamTru NVARCHAR(50),           
  MaCB INT,                        
  FOREIGN KEY (MaCB) REFERENCES CanBo(MaCB) ON DELETE CASCADE
);
--đơn xin nghỉ phép
CREATE TABLE DonXinNghiPhep (
  MaDon INT PRIMARY KEY IDENTITY(1,1),
  NgayDon DATE,
  LyDo NVARCHAR(100),
  TuNgay DATE,
  DenNgay DATE,
  TuGio NVARCHAR(15),
  DenGio NVARCHAR(15),
  DiaChi NVARCHAR(50),
  TrangThai NVARCHAR(50),
  NoiNhan INT,
  MaCB INT,
  NgayTao DATETIME,
  NgayDuyet DATETIME,
  FOREIGN KEY (MaCB) REFERENCES CanBo(MaCB) ON DELETE CASCADE,
  FOREIGN KEY (NoiNhan) REFERENCES DonVi(MaDV)
);
--Giấy nghỉ phép
CREATE TABLE GiayNghiPhep (
  MaGiay INT PRIMARY KEY IDENTITY(1,1),
  SoQD INT,
  Ngay DATE,
  MaDon INT,
  FOREIGN KEY (MaDon) REFERENCES DonXinNghiPhep(MaDon)
);
-- BẢNG QUÁ TRÌNH CÔNG TÁC
CREATE TABLE QuaTrinhCongTac (
    MaQTCT INT IDENTITY(1,1) PRIMARY KEY,
    MaCB INT NOT NULL,
    ChucVu NVARCHAR(100),
    DonVi NVARCHAR(255),
    ThoiGianBatDau DATE NOT NULL,
    ThoiGianKetThuc DATE,
    QuyetDinhSo NVARCHAR(100),
    NgayQuyetDinh DATE,
    CoQuanBanHanh NVARCHAR(255),
    NoiDungCongViec NVARCHAR(MAX),
    ThanhTichNoiBat NVARCHAR(MAX),
    GhiChu NVARCHAR(500),
    NguoiTao INT,
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaCB) REFERENCES CanBo(MaCB),
    FOREIGN KEY (NguoiTao) REFERENCES CanBo(MaCB)
);
---------------------------------- Trung -------------------
-- 1. TẠO BẢNG MucLuongCapBac
CREATE TABLE [dbo].[MucLuongCapBac](
    [MaMucLuong] [int] IDENTITY(1,1) NOT NULL,
    [CapBac] [nvarchar](20) NOT NULL,
    [BacLuong] [int] NOT NULL,
    [HeSoLuong] [decimal](5, 2) NOT NULL,
    [LuongCoBan] [decimal](18, 2) NOT NULL,
    [NgayApDung] [date] NOT NULL,
    [NgayKetThuc] [date] NULL,
    [TrangThai] [nvarchar](20) NULL DEFAULT (N'Đang áp dụng'),
    [GhiChu] [nvarchar](500) NULL,
    PRIMARY KEY CLUSTERED ([MaMucLuong] ASC)
);

-- 2. TẠO BẢNG MucPhuCapChucVu
CREATE TABLE [dbo].[MucPhuCapChucVu](
    [MaPhuCap] [int] IDENTITY(1,1) NOT NULL,
    [ChucVu] [nvarchar](50) NOT NULL,
    [MucPhuCap] [decimal](18, 2) NOT NULL,
    [HeSoPhuCap] [decimal](5, 2) NOT NULL,
    [NgayApDung] [date] NOT NULL,
    [NgayKetThuc] [date] NULL,
    [TrangThai] [nvarchar](20) NULL DEFAULT (N'Đang áp dụng'),
    [GhiChu] [nvarchar](500) NULL,
    PRIMARY KEY CLUSTERED ([MaPhuCap] ASC)
);

-- 3. TẠO BẢNG BangLuong
CREATE TABLE [dbo].[BangLuong](
    [MaBL] [int] IDENTITY(1,1) NOT NULL,
    [MaCB] [int] NOT NULL,
    [ThangNam] [nvarchar](7) NOT NULL,
    [LuongCoBan] [decimal](18, 2) NULL DEFAULT ((0)),
    [PhuCapChucVu] [decimal](18, 2) NULL DEFAULT ((0)),
    [PhuCapCapBac] [decimal](18, 2) NULL DEFAULT ((0)),
    [PhuCapKhac] [decimal](18, 2) NULL DEFAULT ((0)),
    [ThuongThang] [decimal](18, 2) NULL DEFAULT ((0)),
    [KhauTru] [decimal](18, 2) NULL DEFAULT ((0)),
    [ThucLanh] [decimal](18, 2) NULL DEFAULT ((0)),
    [TrangThai] [int] NULL DEFAULT ((1)),
    [NgayTao] [date] NULL DEFAULT (getdate()),
    [NgayDuyet] [date] NULL,
    [NgayChiTra] [date] NULL,
    [MaNguoiTao] [int] NULL,
    [MaNguoiDuyet] [int] NULL,
    [GhiChu] [nvarchar](500) NULL,
    PRIMARY KEY CLUSTERED ([MaBL] ASC)
);

-- 4. TẠO BẢNG LichSuLuong
CREATE TABLE [dbo].[LichSuLuong](
    [MaLichSu] [int] IDENTITY(1,1) NOT NULL,
    [MaCB] [int] NOT NULL,
    [CapBacCu] [nvarchar](20) NULL,
    [CapBacMoi] [nvarchar](20) NULL,
    [ChucVuCu] [nvarchar](50) NULL,
    [ChucVuMoi] [nvarchar](50) NULL,
    [LuongCu] [decimal](18, 2) NULL,
    [LuongMoi] [decimal](18, 2) NULL,
    [NgayThayDoi] [date] NOT NULL,
    [LyDoThayDoi] [nvarchar](255) NULL,
    [SoQuyetDinh] [nvarchar](50) NULL,
    [NgayQuyetDinh] [date] NULL,
    [NguoiThayDoi] [nvarchar](50) NULL,
    [ThoiGianTao] [date] NULL DEFAULT (getdate()),
    PRIMARY KEY CLUSTERED ([MaLichSu] ASC)
);

-- 5. TẠO BẢNG KeHoachKhamSucKhoe
CREATE TABLE [dbo].[KeHoachKhamSucKhoe](
    [MaKHKSK] [int] NOT NULL,
    [TenKeHoach] [nvarchar](200) NULL,
    [Nam] [int] NULL,
    [DotKham] [int] NULL,
    [NgayBatDau] [date] NULL,
    [NgayKetThuc] [date] NULL,
    [DiaDiem] [nvarchar](200) NULL,
    [NoiDungKham] [nvarchar](1000) NULL,
    [DonViToChuc] [nvarchar](200) NULL,
    [TrangThai] [nvarchar](20) NULL,
    [NgayTao] [date] NULL,
    [GhiChu] [nvarchar](500) NULL,
    [MaDV] [int] NULL,
    [MaNguoiTao] [int] NULL,
    PRIMARY KEY CLUSTERED ([MaKHKSK] ASC)
);

-- 6. TẠO BẢNG DanhSachKham
CREATE TABLE [dbo].[DanhSachKham](
    [MaDSK] [int] NOT NULL,
    [TrangThaiThamGia] [nvarchar](20) NULL,
    [NgayDangKy] [date] NULL,
    [GhiChu] [nvarchar](500) NULL,
    [MaKHKSK] [int] NULL,
    [MaCB] [int] NULL,
    PRIMARY KEY CLUSTERED ([MaDSK] ASC)
);

-- 7. TẠO BẢNG TongHopLuong
CREATE TABLE [dbo].[TongHopLuong](
    [MaTongHop] [int] IDENTITY(1,1) NOT NULL,
    [MaDV] [int] NOT NULL,
    [ThangNam] [nvarchar](7) NOT NULL,
    [SoCanBo] [int] NULL DEFAULT ((0)),
    [TongLuongCoBan] [decimal](18, 2) NULL DEFAULT ((0)),
    [TongPhuCap] [decimal](18, 2) NULL DEFAULT ((0)),
    [TongThuong] [decimal](18, 2) NULL DEFAULT ((0)),
    [TongKhauTru] [decimal](18, 2) NULL DEFAULT ((0)),
    [TongThucLanh] [decimal](18, 2) NULL DEFAULT ((0)),
    [TrangThai] [nvarchar](20) NULL DEFAULT (N'Chưa hoàn thành'),
    [NgayTao] [date] NULL DEFAULT (getdate()),
    [NguoiTao] [nvarchar](50) NULL,
    PRIMARY KEY CLUSTERED ([MaTongHop] ASC)
);

-- 8. TẠO CÁC BẢNG KHÁC (SỨC KHỎE)
CREATE TABLE [dbo].[BaoCaoSucKhoe](
    [MaBCSK] [int] NOT NULL,
    [TenBaoCao] [nvarchar](200) NULL,
    [LoaiBaoCao] [nvarchar](50) NULL,
    [TuNgay] [date] NULL,
    [DenNgay] [date] NULL,
    [NoiDung] [nvarchar](1000) NULL,
    [TrangThai] [nvarchar](20) NULL,
    [NgayTao] [date] NULL,
    [FileBaoCao] [nvarchar](500) NULL,
    [MaDV] [int] NULL,
    [MaNguoiTao] [int] NULL,
    PRIMARY KEY CLUSTERED ([MaBCSK] ASC)
);
-- 9. Bang Bao Hiem Y te
CREATE TABLE [dbo].[BaoHiemYTe](
    [MaBHYT] [int] NOT NULL,
    [SoTheBHYT] [nvarchar](20) NULL,
    [NgayCapThe] [date] NULL,
    [NgayHetHan] [date] NULL,
    [NoiCapThe] [nvarchar](200) NULL,
    [NoiDangKyKCB] [nvarchar](200) NULL,
    [SoBaoHiemQuanDoi] [nvarchar](20) NULL,
    [TrangThai] [nvarchar](20) NULL,
    [NgayCapNhat] [date] NULL,
    [MaCB] [int] NULL,
    PRIMARY KEY CLUSTERED ([MaBHYT] ASC)
);

-- 10. TẠO RÀNG BUỘC KHÓA NGOẠI

-- CanBo -> DonVi
ALTER TABLE [dbo].[CanBo] ADD CONSTRAINT [FK_CanBo_DonVi] 
FOREIGN KEY([MaDV]) REFERENCES [dbo].[DonVi] ([MaDV]);

-- BangLuong -> CanBo
ALTER TABLE [dbo].[BangLuong] ADD CONSTRAINT [FK_BangLuong_CanBo] 
FOREIGN KEY([MaCB]) REFERENCES [dbo].[CanBo] ([MaCB]);

ALTER TABLE [dbo].[BangLuong] ADD CONSTRAINT [FK_BangLuong_NguoiTao] 
FOREIGN KEY([MaNguoiTao]) REFERENCES [dbo].[CanBo] ([MaCB]);

ALTER TABLE [dbo].[BangLuong] ADD CONSTRAINT [FK_BangLuong_NguoiDuyet] 
FOREIGN KEY([MaNguoiDuyet]) REFERENCES [dbo].[CanBo] ([MaCB]);

-- LichSuLuong -> CanBo
ALTER TABLE [dbo].[LichSuLuong] ADD CONSTRAINT [FK_LichSuLuong_CanBo] 
FOREIGN KEY([MaCB]) REFERENCES [dbo].[CanBo] ([MaCB]);

-- KeHoachKhamSucKhoe -> DonVi, CanBo
ALTER TABLE [dbo].[KeHoachKhamSucKhoe] ADD CONSTRAINT [FK_KeHoachKham_DonVi] 
FOREIGN KEY([MaDV]) REFERENCES [dbo].[DonVi] ([MaDV]);

ALTER TABLE [dbo].[KeHoachKhamSucKhoe] ADD CONSTRAINT [FK_KeHoachKham_NguoiTao] 
FOREIGN KEY([MaNguoiTao]) REFERENCES [dbo].[CanBo] ([MaCB]);

-- DanhSachKham -> KeHoachKhamSucKhoe, CanBo
ALTER TABLE [dbo].[DanhSachKham] ADD CONSTRAINT [FK_DanhSachKham_KeHoach] 
FOREIGN KEY([MaKHKSK]) REFERENCES [dbo].[KeHoachKhamSucKhoe] ([MaKHKSK]);

ALTER TABLE [dbo].[DanhSachKham] ADD CONSTRAINT [FK_DanhSachKham_CanBo] 
FOREIGN KEY([MaCB]) REFERENCES [dbo].[CanBo] ([MaCB]);

-- TongHopLuong -> DonVi
ALTER TABLE [dbo].[TongHopLuong] ADD CONSTRAINT [FK_TongHopLuong_DonVi] 
FOREIGN KEY([MaDV]) REFERENCES [dbo].[DonVi] ([MaDV]);

------------------- THIEU --------------------------------

CREATE TABLE Loai_BC (
    MaLBC INT IDENTITY(1,1) PRIMARY KEY,
    LoaiBangCap NVARCHAR(100) NOT NULL
);

CREATE TABLE BangCap (
    MaBC INT IDENTITY(1,1) PRIMARY KEY,
    MaGV INT NOT NULL,
    MaLBC INT NOT NULL,
    NguoiTao NVARCHAR(100),
    SoHieuVanBan NVARCHAR(100) NOT NULL,
    ChuyenNganh NVARCHAR(255),
    NamTotNghiep NVARCHAR(10),
    TruongCapBang NVARCHAR(255),
    HeDaoTao NVARCHAR(100),
    NgayCap DATE,
    FileScan NVARCHAR(500),
    TrangThai NVARCHAR(50) DEFAULT N'Chờ duyệt',
    ThoiGianTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaGV) REFERENCES CanBo(MaCB),
    FOREIGN KEY (MaLBC) REFERENCES Loai_BC(MaLBC)
);

CREATE TABLE LichSuThayDoi_BC (
    MaLSTD INT IDENTITY(1,1) PRIMARY KEY,
    MaBC INT NOT NULL,
    NoiDungThayDoi NVARCHAR(MAX),
    ThoiGianThayDoi DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaBC) REFERENCES BangCap(MaBC)
);

CREATE TABLE HocPhan (
    MaHP INT IDENTITY(1,1) PRIMARY KEY,
    TenMonHoc NVARCHAR(255),
    SoTinChi NVARCHAR(10),
    SoTiet NVARCHAR(10),
    NgayBatDau DATE,
    NgayKetThuc DATE,
    HinhThucThi NVARCHAR(50) DEFAULT N'Vấn đáp',
    GhiChu NVARCHAR(MAX)
);

CREATE TABLE NoiDung_HP (
	MaNDHP INT IDENTITY(1,1) PRIMARY KEY,
	MaHP INT NOT NULL,
	TenBai NVARCHAR(255),
	HinhThuc NVARCHAR(255),
	GhiChu NVARCHAR(500),
	FOREIGN KEY (MaHP) REFERENCES HocPhan(MaHP)
);
CREATE TABLE DeXuatHocPhan (
	MaDXHP INT IDENTITY(1,1) PRIMARY KEY,
    MaHP INT NOT NULL,
    TaiLieu NVARCHAR(MAX),
    KhoiKienThuc NVARCHAR(255),
    TrangThai NVARCHAR(50) DEFAULT N'Chờ duyệt',
    MaNguoiDuyet INT NOT NULL,
    NgayDuyet DATE,
    ThoiGianTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaHP) REFERENCES HocPhan(MaHP),
    FOREIGN KEY (MaNguoiDuyet) REFERENCES CanBo(MaCB)
);

CREATE TABLE KeHoachGiangDay (
    MaKH INT IDENTITY(1,1) PRIMARY KEY,
    MaHP INT NOT NULL,
    MaBoMon INT NOT NULL, 
    NamHoc NVARCHAR(10),
    Lop NVARCHAR(10),
    KhoaHoc NVARCHAR(10),
    HocKy NVARCHAR(10),
    NganhDaoTao NVARCHAR(100),
    MaNguoiTao INT NOT NULL,
    TrangThai NVARCHAR(50) DEFAULT N'Chờ duyệt',
    NgayTao DATETIME DEFAULT GETDATE(),
    MaNguoiDuyet INT NOT NULL,
    NgayDuyet DATE,
    MaGV INT NOT NULL,
    FOREIGN KEY (MaBoMon) REFERENCES DonVi(MaDV),
    FOREIGN KEY (MaHP) REFERENCES HocPhan(MaHP),
    FOREIGN KEY (MaNguoiTao) REFERENCES CanBo(MaCB),
    FOREIGN KEY (MaNguoiDuyet) REFERENCES CanBo(MaCB),
    FOREIGN KEY (MaGV) REFERENCES CanBo(MaCB)
);

CREATE TABLE TaiLieuHocTap (
    MaTL INT IDENTITY(1,1) PRIMARY KEY,
    MaKH INT NOT NULL,
    TenTaiLieu NVARCHAR(255),
    LoaiTaiLieu NVARCHAR(50),
    FileScan NVARCHAR(500),
    FOREIGN KEY (MaKH) REFERENCES KeHoachGiangDay(MaKH)
);

CREATE TABLE DeTai (
    MaDT INT IDENTITY(1,1) PRIMARY KEY,
    TenDeTai NVARCHAR(255) NOT NULL,
    LinhVuc NVARCHAR(255),
    KinhPhiDK DECIMAL(18,2),
    CapQuanLy NVARCHAR(100),
    NgayBatDau DATE,
    NgayKetThucDK DATE,
    TrangThai NVARCHAR(100),
    MucTieu NVARCHAR(MAX),
    DonViChuTri INT NOT NULL,
    FOREIGN KEY (DonViChuTri) REFERENCES DonVi(MaDV)
);

CREATE TABLE ThanhVienDeTai (
    MaTVDT INT IDENTITY(1,1) PRIMARY KEY,
    MaDT INT NOT NULL,
    MaGV INT NOT NULL,
    VaiTro NVARCHAR(100),
    FOREIGN KEY (MaDT) REFERENCES DeTai(MaDT),
    FOREIGN KEY (MaGV) REFERENCES CanBo(MaCB)
);

CREATE TABLE TaiChinhDeTai (
    MaTCDT INT IDENTITY(1,1) PRIMARY KEY,
    MaDT INT NOT NULL,
    TenKhoanChi NVARCHAR(255),
    LoaiChiPhi NVARCHAR(100),
    DuToan DECIMAL(18,2),
    ThucChi DECIMAL(18,2),
    NgayChi DATE,
    TrangThai NVARCHAR(100) DEFAULT N'Chưa cấp kinh phí',
    GhiChu NVARCHAR(MAX),
    NguoiThucHien INT NOT NULL,
    FileHoaDon NVARCHAR(500),
    FOREIGN KEY (MaDT) REFERENCES DeTai(MaDT),
    FOREIGN KEY (NguoiThucHien) REFERENCES ThanhVienDeTai(MaTVDT)
);

CREATE TABLE TienDoDeTai (
    MaTDDT INT IDENTITY(1,1) PRIMARY KEY,
    MaDT INT NOT NULL,
    MocThoiGian DATE,
    NoiDung NVARCHAR(MAX),
    TrangThai NVARCHAR(100),
    KetQua NVARCHAR(MAX),
    KhoKhan NVARCHAR(MAX),
    FOREIGN KEY (MaDT) REFERENCES DeTai(MaDT)
);

CREATE TABLE TaiLieuDeTai (
    MaTLDT INT IDENTITY(1,1) PRIMARY KEY,
    MaDT INT NOT NULL,
    TieuDe NVARCHAR(255),
    FileScan NVARCHAR(500),
    FOREIGN KEY (MaDT) REFERENCES DeTai(MaDT)
);

-----------------== AN ==-------------------------------
CREATE TABLE ChuongTrinhDaoTao (
    MaCT INT IDENTITY(1,1) PRIMARY KEY,
    TenCT NVARCHAR(50) NULL,
    MaDM INT NULL,
    NgayBatDau DATE NULL,
    NgayKetThuc DATE NULL,
    DiaDiem NVARCHAR(50) NULL,
    MaTrangThai NCHAR(10) NULL,
    Khoa NVARCHAR(50) NULL
);

CREATE TABLE CTDT_CanBo (
    MaCT INT NOT NULL,
    MaCB INT NOT NULL,
    ThamGia NVARCHAR(50) NULL,
    PRIMARY KEY (MaCT, MaCB)
);

CREATE TABLE DanhMucDaoTao (
    MaDM INT IDENTITY(1,1) PRIMARY KEY,
    TenDM NVARCHAR(50) NULL,
    MoTa NVARCHAR(50) NULL,
    MaTrangThai NCHAR(10) NULL,
    NgayCapNhat DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE KhenThuong (
    MaKT INT IDENTITY(1,1) PRIMARY KEY,
    LyDo NVARCHAR(50) NULL,
    MaTrangThai NCHAR(10) NOT NULL,
    MaLoaiKT NCHAR(10) NULL,
    ThoiGianTao DATETIME NULL
);

CREATE TABLE KhenThuong_CanBo (
    MaKT INT NOT NULL,
    MaCB INT NOT NULL,
    NgayQuyetDinh DATE NULL,
    PRIMARY KEY (MaKT, MaCB)
);

CREATE TABLE KyLuat (
    MaKL INT IDENTITY(1,1) PRIMARY KEY,
    LyDo NVARCHAR(50) NULL,
    MaTrangThai NCHAR(10) NULL,
    MaLoaiKL NCHAR(10) NULL,
    ThoiGianTao DATETIME NULL
);
CREATE TABLE KyLuat_CanBo (
    MaKL INT NOT NULL,
    MaCB INT NOT NULL,
    NgayQuyetDinh DATE NULL,
    PRIMARY KEY (MaKL, MaCB)
);
CREATE TABLE LoaiKhenThuong (
    MaLoaiKT NCHAR(10) PRIMARY KEY,
    LoaiKhenThuong NVARCHAR(50) NULL
);

CREATE TABLE LoaiKyLuat (
    MaLoaiKL NCHAR(10) PRIMARY KEY,
    LoaiKyLuat NVARCHAR(50) NULL
);

CREATE TABLE TrangThai (
    MaTrangThai NCHAR(10) PRIMARY KEY,
    TenTrangThai NVARCHAR(50) NULL
);

ALTER TABLE CTDT_CanBo
ADD CONSTRAINT FK_CTDT_CanBo_CanBo FOREIGN KEY (MaCB)
REFERENCES CanBo(MaCB);

ALTER TABLE KhenThuong_CanBo
ADD CONSTRAINT FK_KhenThuong_CanBo_CanBo FOREIGN KEY (MaCB)
REFERENCES CanBo(MaCB);

ALTER TABLE KyLuat_CanBo
ADD CONSTRAINT FK_KyLuat_CanBo_CanBo FOREIGN KEY (MaCB)
REFERENCES CanBo(MaCB);
ALTER TABLE CTDT_CanBo
ADD CONSTRAINT FK_CTDT_CanBo_ChuongTrinhDaoTao FOREIGN KEY (MaCT)
REFERENCES ChuongTrinhDaoTao(MaCT);
ALTER TABLE ChuongTrinhDaoTao
ADD CONSTRAINT FK_ChuongTrinhDaoTao_DanhMucDaoTao FOREIGN KEY (MaDM)
REFERENCES DanhMucDaoTao(MaDM);
ALTER TABLE ChuongTrinhDaoTao
ADD CONSTRAINT FK_ChuongTrinhDaoTao_TrangThai FOREIGN KEY (MaTrangThai)
REFERENCES TrangThai(MaTrangThai);
ALTER TABLE DanhMucDaoTao
ADD CONSTRAINT FK_DanhMucDaoTao_TrangThai FOREIGN KEY (MaTrangThai)
REFERENCES TrangThai(MaTrangThai);
ALTER TABLE KhenThuong
ADD CONSTRAINT FK_KhenThuong_LoaiKhenThuong FOREIGN KEY (MaLoaiKT)
REFERENCES LoaiKhenThuong(MaLoaiKT);
ALTER TABLE KhenThuong
ADD CONSTRAINT FK_KhenThuong_TrangThai FOREIGN KEY (MaTrangThai)
REFERENCES TrangThai(MaTrangThai);
ALTER TABLE KyLuat
ADD CONSTRAINT FK_KyLuat_LoaiKyLuat FOREIGN KEY (MaLoaiKL)
REFERENCES LoaiKyLuat(MaLoaiKL);
ALTER TABLE KyLuat
ADD CONSTRAINT FK_KyLuat_TrangThai FOREIGN KEY (MaTrangThai)
REFERENCES TrangThai(MaTrangThai);
ALTER TABLE KhenThuong_CanBo
ADD CONSTRAINT FK_KhenThuong_CanBo_KhenThuong FOREIGN KEY (MaKT)
REFERENCES KhenThuong(MaKT);
ALTER TABLE KyLuat_CanBo
ADD CONSTRAINT FK_KyLuat_CanBo_KyLuat FOREIGN KEY (MaKL)
REFERENCES KyLuat(MaKL);

-------------------------------HIEU-----------------------------
-- 1. Bảng loại biến động
CREATE TABLE LoaiBienDong (
    MaLBD INT IDENTITY(1,1) PRIMARY KEY,
    TenLoai NVARCHAR(100) NOT NULL,
    MoTa NVARCHAR(255)
);

-- 2. BẢNG BIẾN ĐỘNG NHÂN SỰ
CREATE TABLE BienDongNhanSu (
    MaBD INT IDENTITY(1,1) PRIMARY KEY,
    MaCB INT NOT NULL,
    MaLBD INT NOT NULL,
    NgayBienDong DATE NOT NULL,
    NgayHieuLuc DATE,
    NoiDung NVARCHAR(500) NOT NULL,
    DonViCu INT NULL,
    DonViMoi INT NULL,
    ChucVuCu NVARCHAR(100),
    ChucVuMoi NVARCHAR(100),
    CapBacCu NVARCHAR(30),
    CapBacMoi NVARCHAR(30),
    QuyetDinhSo NVARCHAR(100),
    NgayQuyetDinh DATE,
    CoQuanBanHanh NVARCHAR(255),
    TrangThai NVARCHAR(50) DEFAULT N'Chờ duyệt',
    NguoiTao INT NOT NULL,
    NgayTao DATETIME DEFAULT GETDATE(),
    NguoiDuyet INT NULL,
    NgayDuyet DATE NULL,
    LyDo NVARCHAR(500),
    GhiChu NVARCHAR(500),
    FOREIGN KEY (MaCB) REFERENCES CanBo(MaCB),
    FOREIGN KEY (MaLBD) REFERENCES LoaiBienDong(MaLBD),
    FOREIGN KEY (DonViCu) REFERENCES DonVi(MaDV),
    FOREIGN KEY (DonViMoi) REFERENCES DonVi(MaDV),
    FOREIGN KEY (NguoiTao) REFERENCES CanBo(MaCB),
    FOREIGN KEY (NguoiDuyet) REFERENCES CanBo(MaCB)
);

-- 3. BẢNG HỒ SƠ CHÍNH TRỊ
CREATE TABLE HoSoChinhTri (
    MaHS INT IDENTITY(1,1) PRIMARY KEY,
    MaCB INT NOT NULL,
    -- THÔNG TIN ĐOÀN
    NgayVaoDoan DATE,
    NoiVaoDoan NVARCHAR(255),
    ChucVuDoan NVARCHAR(100),
    -- THÔNG TIN ĐẢNG
    NgayVaoDang DATE,
    NoiVaoDang NVARCHAR(255),
    NgayChinhThuc DATE,
    ChiBo NVARCHAR(255),
    ChucVuDang NVARCHAR(100),
    -- THÔNG TIN GIA ĐÌNH
    ThanhPhanGiaDinh NVARCHAR(255),
    NgheNghiepGiaDinh NVARCHAR(255),
    -- QUÁ TRÌNH HOẠT ĐỘNG
    QuaTrinhCongTac NVARCHAR(MAX),
    QuaTrinhHocTap NVARCHAR(MAX),
    KhenThuongKyLuat NVARCHAR(MAX),
    -- ĐÁNH GIÁ
    DanhGiaXepLoai NVARCHAR(100),
    DanhGiaHangNam NVARCHAR(MAX),
    KhuyetDiem NVARCHAR(MAX),
    HuongPhatTrien NVARCHAR(MAX),
    -- TRẠNG THÁI
    TrangThai NVARCHAR(50) DEFAULT N'Hoạt động',
    NgayCapNhat DATETIME DEFAULT GETDATE(),
    NguoiCapNhat INT,
    FOREIGN KEY (MaCB) REFERENCES CanBo(MaCB),
    FOREIGN KEY (NguoiCapNhat) REFERENCES CanBo(MaCB)
);

-- 4. BẢNG ĐẢNG PHÍ
CREATE TABLE DangPhi (
    MaDP INT IDENTITY(1,1) PRIMARY KEY,
    MaCB INT NOT NULL,
    Nam INT NOT NULL,
    Thang INT NOT NULL,
    SoTien DECIMAL(18,2) NOT NULL,
    NgayNop DATE,
    TrangThai NVARCHAR(50) DEFAULT N'Chưa đóng',
    NguoiThu INT NULL,
    HinhThucDong NVARCHAR(50), -- Tiền mặt, chuyển khoản
    SoPhieuThu NVARCHAR(50),
    GhiChu NVARCHAR(255),
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaCB) REFERENCES CanBo(MaCB),
    FOREIGN KEY (NguoiThu) REFERENCES CanBo(MaCB)
);

-- Phan 2: Insert Sample Data 
----- PHAN CHUNG CUA NHOM  -------
INSERT INTO Role (roleName) VALUES (N'ADMIN'), (N'PhongDaoTao'), (N'GiangVien');
INSERT INTO [User] (Username, Email, Password, FullName, UserType, NoiDungEmail)
 VALUES ('admin1', null, N'$2b$10$CkBKz1CiMntvIe3XjVvJ8Or63odPg5dKo5Wi0QFHdaTimZXBaFhsa',N'Vu Cong Thieu',N'Giang Vien', null);
INSERT INTO Role_User (UserId, roleId, isActive ) VALUES (1,1,1);
----------------------------------- END CHUNG -------------------------
INSERT INTO DonVi (TenDV) VALUES
(N'Tiểu đoàn 1'),
(N'Tiểu đoàn 2'),
(N'Đại đội 157'),
(N'Khoa Công nghệ thông tin'),
(N'Khoa Điện tử viễn thông'),
(N'Phòng Đào Tạo'),
(N'Phòng Tổ chức cán bộ'),
(N'Bộ môn Công nghệ phần mềm'),
(N'Bộ môn Hệ thống thông tin'),
(N'Phòng Tham Mưu'),
(N'Phòng Hậu Cần'),
(N'Phòng Chính Trị'),
(N'Đại Đội Trinh Sát'),
(N'Phòng Kỹ Thuật'),
(N'Ban Chỉ Huy'),
(N'Phòng Tài Chính'),
(N'Viện mô phỏng');


INSERT INTO QuaTrinhCongTac (MaCB, ChucVu, DonVi, ThoiGianBatDau, ThoiGianKetThuc, QuyetDinhSo, NgayQuyetDinh, CoQuanBanHanh, NoiDungCongViec, NguoiTao) VALUES 
(1, N'Giảng viên', N'Khoa CNTT', '2015-09-01', NULL, N'123/QĐ-HVKTQS', '2015-08-20', N'Học viện KTQS', N'Giảng dạy các môn chuyên ngành CNTT', 1),
(2, N'Phó trưởng khoa', N'Khoa CNTT', '2021-01-01', NULL, N'125/QĐ-HVKTQS', '2020-12-20', N'Học viện KTQS', N'Phụ trách đào tạo và NCKH', 1),
(3, N'Trưởng bộ môn', N'Bộ môn Viễn thông', '2017-07-01', NULL, N'127/QĐ-HVKTQS', '2017-06-20', N'Học viện KTQS', N'Quản lý bộ môn và đào tạo', 1),
(4, N'Trưởng phòng', N'Phòng Tổ chức cán bộ', '2020-01-01', NULL, N'101/QĐ-HVKTQS', '2019-12-20', N'Học viện KTQS', N'Quản lý toàn diện công tác cán bộ', 1);

INSERT INTO Loai_BC (LoaiBangCap)
VALUES 
(N'Cử nhân'),
(N'Thạc sĩ'),
(N'Tiến sĩ'),
(N'CCNVSP');

INSERT INTO BangCap (MaGV, MaLBC, NguoiTao, SoHieuVanBan, ChuyenNganh, NamTotNghiep, TruongCapBang, HeDaoTao, NgayCap, FileScan, TrangThai)
VALUES 
(1, 1, null, N'SHV001', N'Công nghệ phần mềm', '2008', N'Đại học Bách Khoa', N'Chính quy', '2008-06-01', null, N'Đã duyệt'),
(2, 2, null, N'SHV002', N'Viễn thông', '2012', N'ĐH Bách Khoa Hà Nội', N'Văn bằng 2', '2012-06-01', null, N'Chờ duyệt'),
(3, 3, null, N'CC223344', N'Trí tuệ nhân tạo', '2015', N'ĐH CNTT TPHCM', N'Chứng chỉ', '2015-06-01', null, N'Bị từ chối');
INSERT INTO MonHoc (MaGV, TenMonHoc, SoTinChi, SoTiet, NgayBatDau, NgayKetThuc, HinhThuc, GhiChu) VALUES 
(2, 'Cơ sở dữ liệu', 3, 45, '2025-01-15', '2025-05-30', 'Lý thuyết', 'BTL'),
  (2, 'Kỹ thuật lập trình', 3, 45, '2025-01-15', '2025-05-30', 'Lý thuyết', null),
  (3, 'Kinh tế chính trị', 3, 60, '2025-01-15', '2025-05-30', 'Lý thuyết', 'Vấn đáp TL'),
  (4, 'Toán rời rạc', 3, 45, '2025-01-15', '2025-05-30', 'Lý thuyết', 'Viết');
   INSERT INTO HocPhan (TenMonHoc, SoTinChi, SoTiet, NgayBatDau, NgayKetThuc, HinhThucThi, GhiChu) VALUES 
  ('CSKT Điện tử quân sự', '3', '45', '2025-03-03','2025-04-18', 'Viết', null),
  ('TH Điện tử cơ bản', '3', '60', '2025-04-21','2025-05-16', 'Viết', 'Thực hành tại Lab DT01'),
	(N'Lập trình Python', '3', '45', '2024-01-15', '2024-05-15', N'Trắc nghiệm',null),
	(N'Thiết kế mạch số', '3', '45', '2024-02-01', '2024-06-01', N'Thực hành',null),
	(N'Trí tuệ nhân tạo', '4', '60', '2024-03-01', '2024-07-01', N'Viết',null);

   INSERT INTO HocPhan (TenMonHoc, SoTinChi, SoTiet, NgayBatDau, NgayKetThuc, HinhThucThi, GhiChu) VALUES 
  ('CSKT Điện tử quân sự', '3', '45', '2025-03-03','2025-04-18', 'Viết', null),
  ('TH Điện tử cơ bản', '3', '60', '2025-04-21','2025-05-16', 'Viết', 'Thực hành tại Lab DT01'),
	(N'Lập trình Python', '3', '45', '2024-01-15', '2024-05-15', N'Trắc nghiệm',null),
	(N'Thiết kế mạch số', '3', '45', '2024-02-01', '2024-06-01', N'Thực hành',null),
	(N'Trí tuệ nhân tạo', '4', '60', '2024-03-01', '2024-07-01', N'Viết',null);

INSERT INTO DeTai (TenDeTai, LinhVuc, KinhPhiDK, CapQuanLy, NgayBatDau, NgayKetThucDK, TrangThai, MucTieu, DonViChuTri)
VALUES 
(N'Ứng dụng trí tuệ nhân tạo trong giảng dạy', 'Công nghệ thông tin - GD',250000000,'Cấp bộ', '2025-01-01','2025-12-31','Đang nghiên cứu','Ứng dụng trí tuệ nhân tạo trong giảng dạy và học tập',4),
(N'Ứng dụng AI trong giáo dục', N'Trí tuệ nhân tạo', 20000000000, N'Cấp trường', '2024-01-01', '2024-12-31', N'Chưa bắt đầu', N'Tối ưu hóa hệ thống quản lý học tập', 8),
(N'Phân tích dữ liệu lớn', N'Khoa học dữ liệu', 30000000000, N'Cấp bộ', '2024-02-01', '2024-12-31', N'Đang nghiên cứu', N'Tăng tốc xử lý big data', 9),
(N'Bảo mật hệ thống mạng quân sự', N'An toàn thông tin', 50000000000, N'Cấp nhà nước', '2024-03-01', '2025-03-01', N'Hoàn thành nghiên cứu', N'Đảm bảo an ninh thông tin mạng', 4);

insert into TienDoDeTai (MaDT,MocThoiGian,NoiDung,TrangThai,KetQua,KhoKhan) values 
(1,'2025-3-4','Khảo sát thực trạng quản lý tại các HVQS','Đã hoàn thành','Thu thập dữ liệu từ 5 học viên',null);

insert into TaiChinhDeTai (MaDT,TenKhoanChi, LoaiChiPhi,DuToan,ThucChi,NgayChi,TrangThai,GhiChu,NguoiThucHien,FileHoaDon) values 
(1,'Chi phí nhân sự giai đoạn 1','Nhân công',100000000,95000000,'2025-02-12','Đã quyết toán',null,2,null),
(2,'Mua thiết bị AI','Vật tư',150000000,145000000,'2025-03-04','Đã quyết toán',null,2,null);

 INSERT INTO KeHoachGiangDay (MaHP, MaBoMon, NamHoc, Lop, HocKy, NganhDaoTao, MaNguoiTao, TrangThai, NgayTao, MaNguoiDuyet, NgayDuyet, MaGV) VALUES 
  (1, 5, '2024-2025', 'VK-1', '2', 'Kỹ thuật điện tử vũ khí',1, 'Đã duyệt', '2025-02-11 12:00:00',2,'2025-02-14',1);
 INSERT INTO KeHoachGiangDay (MaHP, MaBoMon, NamHoc, Lop, HocKy, NganhDaoTao, MaNguoiTao, TrangThai, NgayTao, MaNguoiDuyet, NgayDuyet, MaGV) VALUES 
  (1, 5, '2024-2025', 'VK-1', '2', 'Kỹ thuật điện tử vũ khí',1, 'Đã duyệt', '2025-02-11 12:00:00',2,'2025-02-14',1);
