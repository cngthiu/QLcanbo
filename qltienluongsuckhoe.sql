-- ===============================================================
-- SCRIPT TẠO DATABASE VÀ THÊM DỮ LIỆU HOÀN CHỈNH
-- Database: QLTienLuongsuckhoe
-- ===============================================================

-- 1. TẠO DATABASE
CREATE DATABASE QLTienLuongsuckhoe;
GO

USE QLTienLuongsuckhoe;
GO

PRINT N'=== TẠO CÁC BẢNG ===';

-- 2. TẠO BẢNG DonVi
CREATE TABLE [dbo].[DonVi](
    [MaDV] [int] IDENTITY(1,1) NOT NULL,
    [TenDV] [nvarchar](50) NULL,
    [MaTDV] [int] NULL,
    CONSTRAINT [PK_DonVi] PRIMARY KEY CLUSTERED ([MaDV] ASC)
);

-- 3. TẠO BẢNG CanBo
CREATE TABLE [dbo].[CanBo](
    [MaCB] [int] IDENTITY(1,1) NOT NULL,
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
    [Ngayvaodang] [date] NULL,
    [Ngaychinhthuc] [date] NULL,
    [Chibo] [nvarchar](50) NULL,
    [Ngayvaodoan] [date] NULL,
    [Noiketnap] [nvarchar](50) NULL,
    [Trangthaidang] [nvarchar](50) NULL,
    [QuaTrinhPhanDau] [nvarchar](500) NULL,
    [NgayNhapNgu] [date] NULL,
    [NgayCongTac] [date] NULL,
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
    CONSTRAINT [PK_CanBo] PRIMARY KEY CLUSTERED ([MaCB] ASC)
);

-- 4. TẠO BẢNG MucLuongCapBac
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

-- 5. TẠO BẢNG MucPhuCapChucVu
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

-- 6. TẠO BẢNG BangLuong
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

-- 7. TẠO BẢNG LichSuLuong
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

-- 8. TẠO BẢNG KeHoachKhamSucKhoe
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

-- 9. TẠO BẢNG DanhSachKham
CREATE TABLE [dbo].[DanhSachKham](
    [MaDSK] [int] NOT NULL,
    [TrangThaiThamGia] [nvarchar](20) NULL,
    [NgayDangKy] [date] NULL,
    [GhiChu] [nvarchar](500) NULL,
    [MaKHKSK] [int] NULL,
    [MaCB] [int] NULL,
    PRIMARY KEY CLUSTERED ([MaDSK] ASC)
);

-- 10. TẠO BẢNG TongHopLuong
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

-- 11. TẠO CÁC BẢNG KHÁC (SỨC KHỎE)
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

-- 12. TẠO RÀNG BUỘC KHÓA NGOẠI
PRINT N'=== TẠO RÀNG BUỘC KHÓA NGOẠI ===';

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

PRINT N'=== THÊM DỮ LIỆU ===';

-- 13. THÊM DỮ LIỆU MucLuongCapBac
SET IDENTITY_INSERT [dbo].[MucLuongCapBac] ON;
INSERT [dbo].[MucLuongCapBac] ([MaMucLuong], [CapBac], [BacLuong], [HeSoLuong], [LuongCoBan], [NgayApDung], [TrangThai], [GhiChu]) VALUES 
-- Trung tá
(1, N'Trung tá', 1, 5.20, 9360000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương cơ bản'),
(2, N'Trung tá', 2, 5.40, 9720000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương nâng bậc'),
(3, N'Trung tá', 3, 5.60, 10080000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương cao nhất'),
-- Thiếu tá  
(4, N'Thiếu tá', 1, 4.40, 7920000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương cơ bản'),
(5, N'Thiếu tá', 2, 4.60, 8280000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương nâng bậc'),
(6, N'Thiếu tá', 3, 4.80, 8640000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương cao nhất'),
-- Đại úy
(7, N'Đại úy', 1, 3.60, 6480000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương cơ bản'),
(8, N'Đại úy', 2, 3.80, 6840000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương nâng bậc'),
(9, N'Đại úy', 3, 4.00, 7200000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương cao nhất'),
-- Trung úy
(10, N'Trung úy', 1, 3.00, 5400000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương cơ bản'),
(11, N'Trung úy', 2, 3.20, 5760000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương nâng bậc'),
(12, N'Trung úy', 3, 3.40, 6120000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương cao nhất'),
-- Thiếu úy
(13, N'Thiếu úy', 1, 2.60, 4680000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương cơ bản'),
(14, N'Thiếu úy', 2, 2.80, 5040000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương nâng bậc'),
(15, N'Thiếu úy', 3, 3.00, 5400000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương cao nhất'),
-- Trung Sĩ
(16, N'Trung Sĩ', 1, 2.20, 3960000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương cơ bản'),
(17, N'Trung Sĩ', 2, 2.40, 4320000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương nâng bậc'),
(18, N'Trung Sĩ', 3, 2.60, 4680000.00, '2024-01-01', N'Đang áp dụng', N'Mức lương cao nhất');
SET IDENTITY_INSERT [dbo].[MucLuongCapBac] OFF;

-- 14. THÊM DỮ LIỆU MucPhuCapChucVu
SET IDENTITY_INSERT [dbo].[MucPhuCapChucVu] ON;
INSERT [dbo].[MucPhuCapChucVu] ([MaPhuCap], [ChucVu], [MucPhuCap], [HeSoPhuCap], [NgayApDung], [TrangThai], [GhiChu]) VALUES 
(1, N'Trưởng phòng', 1500000.00, 0.83, '2024-01-01', N'Đang áp dụng', N'Phụ cấp trách nhiệm'),
(2, N'Phó Trưởng phòng', 1200000.00, 0.67, '2024-01-01', N'Đang áp dụng', N'Phụ cấp trách nhiệm'),
(3, N'Nhân viên', 800000.00, 0.44, '2024-01-01', N'Đang áp dụng', N'Phụ cấp chức vụ cơ bản'),
(4, N'Học Viên', 500000.00, 0.28, '2024-01-01', N'Đang áp dụng', N'Phụ cấp học viên');
SET IDENTITY_INSERT [dbo].[MucPhuCapChucVu] OFF;

-- 15. THÊM DỮ LIỆU DonVi
SET IDENTITY_INSERT [dbo].[DonVi] ON;
INSERT [dbo].[DonVi] ([MaDV], [TenDV], [MaTDV]) VALUES 
(1, N'C157', NULL),
(2, N'Phòng Tham Mưu', NULL),
(3, N'Phòng Hậu Cần', NULL),
(4, N'Phòng Chính Trị', NULL),
(5, N'Tiểu Đoàn 1', NULL),
(6, N'Tiểu Đoàn 2', NULL),
(7, N'Đại Đội Trinh Sát', NULL),
(8, N'Phòng Kỹ Thuật', NULL),
(9, N'Ban Chỉ Huy', NULL),
(10, N'Phòng Tài Chính', NULL);
SET IDENTITY_INSERT [dbo].[DonVi] OFF;

-- 16. THÊM DỮ LIỆU CanBo (30 CÁN BỘ)
SET IDENTITY_INSERT [dbo].[CanBo] ON;
INSERT [dbo].[CanBo] ([MaCB], [HoTenKhaiSinh], [GioiTinh], [CapBac], [ChucVu], [MaDV], [NgaySinh], [TrangThai], [NgayTao]) VALUES 
-- C157 (MaDV = 1)
(1, N'Nguyễn Đức Trung', N'Nam', N'Trung Sĩ', N'Học Viên', 1, '2000-05-15', N'Đang công tác', '2024-01-01'),
(2, N'Trần Thị Hương', N'Nữ', N'Trung tá', N'Trưởng phòng', 1, '1980-03-20', N'Đang công tác', '2024-01-01'),
(3, N'Lê Văn Hoàng', N'Nam', N'Thiếu tá', N'Phó Trưởng phòng', 1, '1985-07-12', N'Đang công tác', '2024-01-01'),

-- Phòng Tham Mưu (MaDV = 2)
(4, N'Nguyễn Văn An', N'Nam', N'Thiếu tá', N'Phó Trưởng phòng', 2, '1986-03-15', N'Đang công tác', '2024-01-01'),
(5, N'Trần Thị Bình', N'Nữ', N'Đại úy', N'Nhân viên', 2, '1988-07-20', N'Đang công tác', '2024-01-01'),
(6, N'Phạm Văn Cường', N'Nam', N'Trung úy', N'Nhân viên', 2, '1992-11-10', N'Đang công tác', '2024-01-01'),
(7, N'Lê Thị Mai', N'Nữ', N'Thiếu úy', N'Nhân viên', 2, '1995-05-25', N'Đang công tác', '2024-01-01'),
(8, N'Vũ Văn Đức', N'Nam', N'Trung Sĩ', N'Học Viên', 2, '1999-09-08', N'Đang công tác', '2024-01-01'),

-- Phòng Hậu Cần (MaDV = 3)
(9, N'Hoàng Văn Minh', N'Nam', N'Trung tá', N'Trưởng phòng', 3, '1982-06-25', N'Đang công tác', '2024-01-01'),
(10, N'Vũ Thị Lan', N'Nữ', N'Thiếu tá', N'Phó Trưởng phòng', 3, '1987-09-18', N'Đang công tác', '2024-01-01'),
(11, N'Đỗ Văn Hùng', N'Nam', N'Đại úy', N'Nhân viên', 3, '1989-01-12', N'Đang công tác', '2024-01-01'),
(12, N'Bùi Thị Nga', N'Nữ', N'Trung úy', N'Nhân viên', 3, '1993-04-08', N'Đang công tác', '2024-01-01'),

-- Phòng Chính Trị (MaDV = 4)
(13, N'Lý Văn Tuấn', N'Nam', N'Trung tá', N'Trưởng phòng', 4, '1981-12-30', N'Đang công tác', '2024-01-01'),
(14, N'Phạm Thị Hoa', N'Nữ', N'Thiếu tá', N'Phó Trưởng phòng', 4, '1984-02-15', N'Đang công tác', '2024-01-01'),
(15, N'Ngô Văn Dũng', N'Nam', N'Đại úy', N'Nhân viên', 4, '1990-08-22', N'Đang công tác', '2024-01-01'),
(16, N'Đinh Thị Thu', N'Nữ', N'Trung úy', N'Nhân viên', 4, '1994-11-05', N'Đang công tác', '2024-01-01'),

-- Tiểu Đoàn 1 (MaDV = 5)
(17, N'Trịnh Văn Khoa', N'Nam', N'Thiếu tá', N'Phó Trưởng phòng', 5, '1985-04-18', N'Đang công tác', '2024-01-01'),
(18, N'Cao Văn Nam', N'Nam', N'Đại úy', N'Nhân viên', 5, '1989-10-12', N'Đang công tác', '2024-01-01'),
(19, N'Phan Thị Linh', N'Nữ', N'Trung úy', N'Nhân viên', 5, '1992-06-08', N'Đang công tác', '2024-01-01'),
(20, N'Lương Văn Tài', N'Nam', N'Thiếu úy', N'Nhân viên', 5, '1996-01-25', N'Đang công tác', '2024-01-01'),

-- Tiểu Đoàn 2 (MaDV = 6)
(21, N'Võ Văn Tài', N'Nam', N'Đại úy', N'Nhân viên', 6, '1988-12-15', N'Đang công tác', '2024-01-01'),
(22, N'Lê Thị Yến', N'Nữ', N'Trung úy', N'Nhân viên', 6, '1991-03-28', N'Đang công tác', '2024-01-01'),
(23, N'Hoàng Văn Đức', N'Nam', N'Thiếu úy', N'Nhân viên', 6, '1995-08-10', N'Đang công tác', '2024-01-01'),

-- Đại Đội Trinh Sát (MaDV = 7)
(24, N'Nguyễn Thị Kim', N'Nữ', N'Trung Sĩ', N'Học Viên', 7, '1999-05-20', N'Đang công tác', '2024-01-01'),
(25, N'Trần Văn Long', N'Nam', N'Trung Sĩ', N'Học Viên', 7, '1998-10-30', N'Đang công tác', '2024-01-01'),
(26, N'Lê Thị Oanh', N'Nữ', N'Trung Sĩ', N'Học Viên', 7, '2000-02-14', N'Đang công tác', '2024-01-01'),

-- Phòng Kỹ Thuật (MaDV = 8)
(27, N'Đặng Văn Quang', N'Nam', N'Thiếu tá', N'Phó Trưởng phòng', 8, '1983-11-07', N'Đang công tác', '2024-01-01'),
(28, N'Vương Thị Hằng', N'Nữ', N'Đại úy', N'Nhân viên', 8, '1987-04-22', N'Đang công tác', '2024-01-01'),

-- Ban Chỉ Huy (MaDV = 9)
(29, N'Lương Văn Sơn', N'Nam', N'Trung tá', N'Trưởng phòng', 9, '1979-07-18', N'Đang công tác', '2024-01-01'),
(30, N'Phạm Thị Xuân', N'Nữ', N'Thiếu tá', N'Phó Trưởng phòng', 9, '1984-09-12', N'Đang công tác', '2024-01-01');
SET IDENTITY_INSERT [dbo].[CanBo] OFF;

-- 17. THÊM DỮ LIỆU BangLuong (30 BẢN GHI CHO THÁNG 6/2025)
INSERT [dbo].[BangLuong] ([MaCB], [ThangNam], [LuongCoBan], [PhuCapChucVu], [ThuongThang], [KhauTru], [ThucLanh], [TrangThai], [NgayTao], [MaNguoiTao]) VALUES 
-- C157
(1, '2025-06', 3960000.00, 500000.00, 300000.00, 415800.00, 4344200.00, 1, '2025-06-01', 1),
(2, '2025-06', 10080000.00, 1500000.00, 1300000.00, 1058400.00, 11821600.00, 1, '2025-06-01', 1),
(3, '2025-06', 8280000.00, 1200000.00, 1000000.00, 869400.00, 9610600.00, 1, '2025-06-01', 1),
-- Phòng Tham Mưu
(4, '2025-06', 8280000.00, 1200000.00, 1000000.00, 869400.00, 9610600.00, 1, '2025-06-01', 1),
(5, '2025-06', 6840000.00, 800000.00, 800000.00, 718200.00, 7721800.00, 1, '2025-06-01', 1),
(6, '2025-06', 5400000.00, 800000.00, 600000.00, 567000.00, 6233000.00, 1, '2025-06-01', 1),
(7, '2025-06', 5040000.00, 800000.00, 500000.00, 529200.00, 5810800.00, 1, '2025-06-01', 1),
(8, '2025-06', 4320000.00, 500000.00, 300000.00, 453600.00, 4666400.00, 1, '2025-06-01', 1),
-- Phòng Hậu Cần
(9, '2025-06', 9360000.00, 1500000.00, 1200000.00, 982800.00, 11077200.00, 1, '2025-06-01', 1),
(10, '2025-06', 8280000.00, 1200000.00, 1000000.00, 869400.00, 9610600.00, 1, '2025-06-01', 1),
(11, '2025-06', 6840000.00, 800000.00, 800000.00, 718200.00, 7721800.00, 1, '2025-06-01', 1),
(12, '2025-06', 5760000.00, 800000.00, 600000.00, 604800.00, 6555200.00, 1, '2025-06-01', 1),
-- Phòng Chính Trị
(13, '2025-06', 9360000.00, 1500000.00, 1200000.00, 982800.00, 11077200.00, 1, '2025-06-01', 1),
(14, '2025-06', 8280000.00, 1200000.00, 1000000.00, 869400.00, 9610600.00, 1, '2025-06-01', 1),
(15, '2025-06', 7200000.00, 800000.00, 800000.00, 756000.00, 8044000.00, 1, '2025-06-01', 1),
(16, '2025-06', 6120000.00, 800000.00, 600000.00, 642600.00, 6877400.00, 1, '2025-06-01', 1),
-- Tiểu Đoàn 1
(17, '2025-06', 7920000.00, 1200000.00, 900000.00, 831600.00, 9188400.00, 1, '2025-06-01', 1),
(18, '2025-06', 6480000.00, 800000.00, 700000.00, 680400.00, 7299600.00, 1, '2025-06-01', 1),
(19, '2025-06', 5760000.00, 800000.00, 600000.00, 604800.00, 6555200.00, 1, '2025-06-01', 1),
(20, '2025-06', 4680000.00, 800000.00, 500000.00, 491400.00, 5488600.00, 1, '2025-06-01', 1),
-- Tiểu Đoàn 2
(21, '2025-06', 6480000.00, 800000.00, 700000.00, 680400.00, 7299600.00, 1, '2025-06-01', 1),
(22, '2025-06', 5760000.00, 800000.00, 600000.00, 604800.00, 6555200.00, 1, '2025-06-01', 1),
(23, '2025-06', 5400000.00, 800000.00, 500000.00, 567000.00, 6133000.00, 1, '2025-06-01', 1),
-- Đại Đội Trinh Sát
(24, '2025-06', 4320000.00, 500000.00, 300000.00, 453600.00, 4666400.00, 1, '2025-06-01', 1),
(25, '2025-06', 3960000.00, 500000.00, 300000.00, 415800.00, 4344200.00, 1, '2025-06-01', 1),
(26, '2025-06', 4680000.00, 500000.00, 300000.00, 491400.00, 4988600.00, 1, '2025-06-01', 1),
-- Phòng Kỹ Thuật
(27, '2025-06', 7920000.00, 1200000.00, 900000.00, 831600.00, 9188400.00, 1, '2025-06-01', 1),
(28, '2025-06', 6840000.00, 800000.00, 700000.00, 718200.00, 7621800.00, 1, '2025-06-01', 1),
-- Ban Chỉ Huy
(29, '2025-06', 10080000.00, 1500000.00, 1300000.00, 1058400.00, 11821600.00, 1, '2025-06-01', 1),
(30, '2025-06', 8280000.00, 1200000.00, 1000000.00, 869400.00, 9610600.00, 1, '2025-06-01', 1);

-- 18. THÊM DỮ LIỆU LichSuLuong (15 BẢN GHI)
INSERT [dbo].[LichSuLuong] ([MaCB], [CapBacCu], [CapBacMoi], [ChucVuCu], [ChucVuMoi], [LuongCu], [LuongMoi], [NgayThayDoi], [LyDoThayDoi], [SoQuyetDinh], [NgayQuyetDinh], [NguoiThayDoi]) VALUES 
-- Thay đổi lương tháng 12/2024 cho đơn vị MaDV = 2 (Phòng Tham Mưu)
(4, N'Đại úy', N'Thiếu tá', N'Nhân viên', N'Phó Trưởng phòng', 6840000.00, 8280000.00, '2024-12-01', N'Thăng cấp bậc và chức vụ', N'01/QĐ-HV', '2024-11-25', N'Admin'),
(5, N'Trung úy', N'Đại úy', N'Nhân viên', N'Nhân viên', 5760000.00, 6840000.00, '2024-12-15', N'Đủ điều kiện thăng cấp bậc', N'02/QĐ-HV', '2024-11-30', N'Admin'),
(6, N'Thiếu úy', N'Trung úy', N'Nhân viên', N'Nhân viên', 4680000.00, 5400000.00, '2024-12-20', N'Đủ điều kiện thăng cấp bậc', N'03/QĐ-HV', '2024-12-10', N'Admin'),
-- Thay đổi chức vụ tháng 12/2024
(9, N'Thiếu tá', N'Trung tá', N'Phó Trưởng phòng', N'Trưởng phòng', 8280000.00, 9360000.00, '2024-12-01', N'Bổ nhiệm chức vụ Trưởng phòng', N'04/QĐ-HV', '2024-11-15', N'Admin'),
(13, N'Thiếu tá', N'Trung tá', N'Phó Trưởng phòng', N'Trưởng phòng', 8280000.00, 9360000.00, '2024-12-01', N'Bổ nhiệm chức vụ Trưởng phòng', N'05/QĐ-HV', '2024-11-15', N'Admin'),
(29, N'Thiếu tá', N'Trung tá', N'Phó Trưởng phòng', N'Trưởng phòng', 8280000.00, 10080000.00, '2024-12-01', N'Bổ nhiệm chức vụ Trưởng phòng', N'06/QĐ-HV', '2024-11-15', N'Admin'),
-- Thêm các thay đổi khác tháng 06/2025
(7, N'Thiếu úy', N'Thiếu úy', N'Nhân viên', N'Nhân viên', 4680000.00, 5040000.00, '2025-06-01', N'Nâng bậc lương', N'07/QĐ-HV', '2025-05-25', N'Admin'),
(16, N'Trung úy', N'Trung úy', N'Nhân viên', N'Nhân viên', 5760000.00, 6120000.00, '2025-06-15', N'Nâng bậc lương', N'08/QĐ-HV', '2025-06-10', N'Admin'),
(23, N'Thiếu úy', N'Thiếu úy', N'Nhân viên', N'Nhân viên', 4680000.00, 5400000.00, '2025-06-20', N'Nâng bậc lương', N'09/QĐ-HV', '2025-06-15', N'Admin'),
-- Thêm thay đổi tháng 11/2024
(10, N'Đại úy', N'Thiếu tá', N'Nhân viên', N'Phó Trưởng phòng', 6840000.00, 8280000.00, '2024-11-01', N'Thăng cấp bậc và chức vụ', N'10/QĐ-HV', '2024-10-25', N'Admin'),
(14, N'Đại úy', N'Thiếu tá', N'Nhân viên', N'Phó Trưởng phòng', 6840000.00, 8280000.00, '2024-11-15', N'Thăng cấp bậc và chức vụ', N'11/QĐ-HV', '2024-11-05', N'Admin'),
(17, N'Đại úy', N'Thiếu tá', N'Nhân viên', N'Phó Trưởng phòng', 6840000.00, 7920000.00, '2024-11-20', N'Thăng cấp bậc và chức vụ', N'12/QĐ-HV', '2024-11-10', N'Admin'),
-- Thêm thay đổi tháng 10/2024
(18, N'Trung úy', N'Đại úy', N'Nhân viên', N'Nhân viên', 5760000.00, 6480000.00, '2024-10-01', N'Đủ điều kiện thăng cấp bậc', N'13/QĐ-HV', '2024-09-25', N'Admin'),
(21, N'Trung úy', N'Đại úy', N'Nhân viên', N'Nhân viên', 5760000.00, 6480000.00, '2024-10-15', N'Đủ điều kiện thăng cấp bậc', N'14/QĐ-HV', '2024-10-05', N'Admin'),
(28, N'Trung úy', N'Đại úy', N'Nhân viên', N'Nhân viên', 5760000.00, 6840000.00, '2024-10-20', N'Đủ điều kiện thăng cấp bậc', N'15/QĐ-HV', '2024-10-10', N'Admin');

-- 19. THÊM DỮ LIỆU KeHoachKhamSucKhoe (5 KẾ HOẠCH)
INSERT [dbo].[KeHoachKhamSucKhoe] ([MaKHKSK], [TenKeHoach], [Nam], [DotKham], [NgayBatDau], [NgayKetThuc], [DiaDiem], [NoiDungKham], [DonViToChuc], [TrangThai], [NgayTao], [MaDV], [MaNguoiTao]) VALUES 
(1, N'Kế hoạch khám sức khỏe định kỳ năm 2025 - Đợt 1', 2025, 1, '2025-07-01', '2025-07-15', N'Bệnh viện Quân y 103', N'Khám tổng quát, xét nghiệm máu, chụp X-quang phổi', N'Bệnh viện Quân y 103', N'Đang thực hiện', '2025-06-15', 1, 2),
(2, N'Kế hoạch khám sức khỏe Phòng Tham Mưu', 2025, 1, '2025-08-01', '2025-08-10', N'Bệnh viện Quân y 108', N'Khám chuyên sâu tim mạch, thần kinh', N'Bệnh viện Quân y 108', N'Chuẩn bị', '2025-06-20', 2, 4),
(3, N'Kế hoạch khám sức khỏe Tiểu Đoàn 1', 2025, 2, '2025-09-01', '2025-09-20', N'Trạm Y tế Quân đội', N'Khám tổng quát, tiêm phòng', N'Trạm Y tế Quân đội', N'Đã duyệt', '2025-06-25', 5, 17),
(4, N'Kế hoạch khám sức khỏe tổng hợp', 2025, 3, '2025-10-01', '2025-10-15', N'Bệnh viện Quân y 175', N'Khám chuyên khoa sâu', N'Bệnh viện Quân y 175', N'Chuẩn bị', '2025-06-30', 9, 29),
(5, N'Kế hoạch khám sức khỏe Phòng Kỹ Thuật', 2025, 2, '2025-11-01', '2025-11-10', N'Bệnh viện Quân y 108', N'Khám chuyên sâu mắt và thần kinh', N'Bệnh viện Quân y 108', N'Đang chuẩn bị', '2025-07-05', 8, 27);

-- 20. THÊM DỮ LIỆU DanhSachKham (20 BẢN GHI)
INSERT [dbo].[DanhSachKham] ([MaDSK], [TrangThaiThamGia], [NgayDangKy], [GhiChu], [MaKHKSK], [MaCB]) VALUES 
-- Cho kế hoạch khám MaKHKSK = 1
(1, N'Đã đăng ký', '2025-06-16', N'Cán bộ khỏe mạnh', 1, 1),
(2, N'Đã đăng ký', '2025-06-16', N'Bình thường', 1, 2),
(3, N'Đã đăng ký', '2025-06-17', N'Bình thường', 1, 3),
(4, N'Đã đăng ký', '2025-06-17', N'Cần theo dõi', 1, 13),
(5, N'Đã đăng ký', '2025-06-18', N'Khỏe mạnh', 1, 29),
-- Cho kế hoạch khám MaKHKSK = 2  
(6, N'Đã đăng ký', '2025-06-21', N'Cần khám tim mạch', 2, 4),
(7, N'Đã đăng ký', '2025-06-21', N'Khám thần kinh', 2, 5),
(8, N'Đã đăng ký', '2025-06-22', N'Bình thường', 2, 6),
(9, N'Đã đăng ký', '2025-06-22', N'Kiểm tra mắt', 2, 7),
(10, N'Đã đăng ký', '2025-06-23', N'Theo dõi sức khỏe', 2, 8),
-- Cho kế hoạch khám MaKHKSK = 3
(11, N'Đã đăng ký', '2025-06-26', N'Cán bộ khỏe mạnh', 3, 17),
(12, N'Đã đăng ký', '2025-06-26', N'Cần tiêm phòng', 3, 18),
(13, N'Chưa đăng ký', '2025-06-27', N'Đang công tác xa', 3, 19),
(14, N'Đã đăng ký', '2025-06-27', N'Bình thường', 3, 20),
-- Cho kế hoạch khám MaKHKSK = 4
(15, N'Đã đăng ký', '2025-06-30', N'Khám tổng quát', 4, 29),
(16, N'Đã đăng ký', '2025-06-30', N'Kiểm tra gan', 4, 30),
(17, N'Đã đăng ký', '2025-07-01', N'Theo dõi đường huyết', 4, 14),
(18, N'Đã đăng ký', '2025-07-01', N'Khám tim mạch', 4, 10),
-- Cho kế hoạch khám MaKHKSK = 5
(19, N'Đã đăng ký', '2025-07-05', N'Khám mắt chuyên sâu', 5, 27),
(20, N'Đã đăng ký', '2025-07-05', N'Kiểm tra thần kinh', 5, 28);

PRINT N'=== HOÀN THÀNH THÊM DỮ LIỆU ===';



PRINT N'';
PRINT N'===============================================================';
PRINT N'=== CÁC QUERY MẪU BIỂU ===';
PRINT N'===============================================================';

-- 22. QUERY 1: MẪU BIỂU QUYẾT ĐỊNH TĂNG LƯƠNG CHO CÁN BỘ THĂNG QUÂN HÀM
PRINT N'';
PRINT N'1. MẪU BIỂU QUYẾT ĐỊNH TĂNG LƯƠNG CHO CÁN BỘ THĂNG QUÂN HÀM (MaCB = 1):';
SELECT 
    CB.HoTenKhaiSinh,
    CB.CapBac,
    CB.ChucVu,
    DV.TenDV,
    BL.LuongCoBan,
    ML.HeSoLuong,
    BL.ThangNam
FROM CanBo CB
INNER JOIN DonVi DV ON CB.MaDV = DV.MaDV
INNER JOIN BangLuong BL ON CB.MaCB = BL.MaCB
INNER JOIN MucLuongCapBac ML ON CB.CapBac = ML.CapBac AND BL.LuongCoBan = ML.LuongCoBan
WHERE BL.ThangNam = '2025-06' AND CB.MaCB = 1;

-- 23. QUERY 2: MẪU BIỂU DANH SÁCH CÁN BỘ TĂNG GIẢM LƯƠNG
PRINT N'';
PRINT N'2. MẪU BIỂU DANH SÁCH CÁN BỘ TĂNG GIẢM LƯƠNG (Đơn vị MaDV = 2, tháng 12/2024):';
SELECT 
    ROW_NUMBER() OVER (ORDER BY CB.HoTenKhaiSinh) AS [TT],
    CB.HoTenKhaiSinh,
    CB.CapBac,
    DV.TenDV,
    CONCAT(
        N'Từ bậc ', ISNULL(LSL.CapBacCu, N''),
        N' sang ', ISNULL(LSL.CapBacMoi, N''),
        N'; Từ chức vụ ', ISNULL(LSL.ChucVuCu, N''),
        N' sang ', ISNULL(LSL.ChucVuMoi, N''),
        N'; Lương từ ', ISNULL(CAST(LSL.LuongCu AS NVARCHAR(20)), N''),
        N' lên ', ISNULL(CAST(LSL.LuongMoi AS NVARCHAR(20)), N''),
        N'; Lý do: ', ISNULL(LSL.LyDoThayDoi, N'Không rõ')
    ) AS [NoiDungDieuChinh]
FROM LichSuLuong LSL
INNER JOIN CanBo CB ON LSL.MaCB = CB.MaCB
INNER JOIN DonVi DV ON CB.MaDV = DV.MaDV
WHERE DV.MaDV = 2 AND FORMAT(LSL.NgayThayDoi, 'MM/yyyy') = '12/2024'
ORDER BY CB.HoTenKhaiSinh;

-- 24. QUERY 3: MẪU BIỂU QUYẾT ĐỊNH KHÁM SỨC KHỎE CHO CÁN BỘ, NHÂN VIÊN
PRINT N'';
PRINT N'3. MẪU BIỂU QUYẾT ĐỊNH KHÁM SỨC KHỎE CHO CÁN BỘ, NHÂN VIÊN (MaKHKSK = 1):';
SELECT 
    k.MaKHKSK,
    k.TenKeHoach,
    k.Nam,
    k.DotKham,
    k.NgayBatDau,
    k.NgayKetThuc,
    k.DiaDiem,
    k.NoiDungKham,
    k.DonViToChuc,
    d.TenDV AS DonVi,
    cb.HoTenKhaiSinh AS NguoiTao,
    k.TrangThai,
    k.NgayTao,
    k.GhiChu
FROM KeHoachKhamSucKhoe k
LEFT JOIN DonVi d ON k.MaDV = d.MaDV
LEFT JOIN CanBo cb ON k.MaNguoiTao = cb.MaCB
WHERE k.MaKHKSK = 1;

-- 25. QUERY 4: MẪU BIỂU DANH SÁCH CÁN BỘ THAM GIA KHÁM SỨC KHỎE
PRINT N'';
PRINT N'4. MẪU BIỂU DANH SÁCH CÁN BỘ THAM GIA KHÁM SỨC KHỎE (MaKHKSK = 1):';
SELECT 
    dsk.MaDSK AS STT,
    cb.HoTenKhaiSinh AS [Họ và tên],
    cb.CapBac AS [Cấp bậc],
    cb.ChucVu AS [Chức vụ],
    dv.TenDV AS [Đơn vị],
    dsk.GhiChu AS [Ghi chú]
FROM DanhSachKham dsk
INNER JOIN CanBo cb ON dsk.MaCB = cb.MaCB
INNER JOIN DonVi dv ON cb.MaDV = dv.MaDV
WHERE dsk.MaKHKSK = 1
ORDER BY dv.TenDV, cb.CapBac, cb.HoTenKhaiSinh;
