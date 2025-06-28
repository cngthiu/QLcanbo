use QL_canbo_HVKTQS
go

CREATE TABLE DonVi (
  MaDV INT PRIMARY KEY IDENTITY(1,1),
  TenDV VARCHAR(255) NOT NULL
);
go

CREATE TABLE CanBo (
  MaCB INT PRIMARY KEY IDENTITY(1,1),
  HoTenKhaiSinh VARCHAR(50),
  HoTenThuongDung VARCHAR(50),
  BiDanh VARCHAR(50),
  GioiTinh VARCHAR(3),
  CapBac VARCHAR(20),
  ChucVu VARCHAR(50),
  MaDV INT,
  NgaySinh DATE,
  NoiSinh VARCHAR(500),
  QueQuan VARCHAR(500),
  NoiDKHK VARCHAR(500),
  NoiTamTru VARCHAR(500),
  DanToc VARCHAR(15),
  TonGiao VARCHAR(20),
  ThanhPhanGD VARCHAR(50),
  NgheNghiep VARCHAR(50),
  Ngayvaodang DATE NULL,
  Ngaychinhthuc DATE NULL,
  Chibo VARCHAR(50),
  Ngayvaodoan DATE NULL,
  Noiketnap VARCHAR(50),
  Trangthaidang VARCHAR(50),
  QuaTrinhPhanDau VARCHAR(500),
  NgayNhapNgu DATE NULL,
  NgayCongTac DATE NULL,
  ThamGiaTCXH VARCHAR(50),
  NgayThamGiaCM DATE NULL,
  GDPT VARCHAR(20),
  ChuyenMonNV VARCHAR(50),
  LyLuanCT VARCHAR(50),
  NgoaiNgu VARCHAR(50),
  HocHam VARCHAR(50),
  HocVi VARCHAR(50),
  CongTacDangLam VARCHAR(100),
  SoCCCD CHAR(12),
  TrangThai VARCHAR(20),
  NgayTao DATE,
  NgaySua DATE
  FOREIGN KEY (MaDV) REFERENCES DonVi(MaDV)
);
go 

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
go

--thêm
INSERT INTO CanBo (
  HoTenKhaiSinh, HoTenThuongDung, BiDanh, CapBac, MaDV, GioiTinh, ChucVu, NgaySinh,
  SoCCCD, NgayNhapNgu, NoiSinh, NoiDKHK, DanToc, ThanhPhanGD, NgayThamGiaCM,
  Ngaychinhthuc, Ngayvaodoan, GDPT, LyLuanCT, HocHam, CongTacDangLam, QueQuan,
  NoiTamTru, TonGiao, NgheNghiep, NgayCongTac, Ngayvaodang, Chibo, ThamGiaTCXH,
  ChuyenMonNV, NgoaiNgu, HocVi, NgayTao, NgaySua
) VALUES
(N'Lê Văn Bình', N'Bình', N'Không', N'Thiếu tá', 1, N'Nam', N'Trợ lý chính trị', '1985-03-10',
 '123456789012', '2005-09-01', N'Hà Nội', N'Hà Nội', N'Kinh', N'Công nhân', '2003-06-10',
 '2004-06-10', '2002-05-01', N'12/12', N'Trung cấp', N'Không', N'Chính trị', N'Nam Định',
 N'Hà Nội', N'Không', N'Bộ đội', '2006-01-01', '2003-05-01', N'Chi bộ 1', N'Công đoàn',
 N'Sĩ quan Chính trị', N'Không', N'Cử nhân', CONVERT(DATE, GETDATE()), CONVERT(DATE, GETDATE())),
(N'Nguyễn Thị Hoa', N'Hoa', N'Không', N'Trung úy', 2, N'Nữ', N'Cán bộ huấn luyện', '1990-07-15',
 '987654321098', '2010-08-01', N'Nghệ An', N'TP Vinh', N'Kinh', N'Nông dân', '2008-05-20',
 '2009-05-20', '2007-04-12', N'12/12', N'Sơ cấp', N'Không', N'Giảng viên', N'Nghệ An',
 N'TP Vinh', N'Phật giáo', N'Giáo viên', '2012-09-01', '2008-04-15', N'Chi bộ 3', N'Đoàn thanh niên',
 N'Giáo dục thể chất', N'Tiếng Anh', N'Cao đẳng', CONVERT(DATE, GETDATE()), CONVERT(DATE, GETDATE())),
(N'Trần Văn An', N'An', N'Không', N'Thiếu tá', 1, N'Nam', N'Trưởng ban hậu cần', '1982-12-05',
 '111122223333', '2002-02-15', N'Hải Phòng', N'Hải Phòng', N'Kinh', N'Viên chức', '2000-09-01',
 '2001-09-01', '1999-03-10', N'12/12', N'Cao cấp', N'Tiến sĩ', N'Hậu cần', N'Hải Phòng',
 N'Hà Nội', N'Không', N'Kỹ sư', '2003-10-01', '2000-08-15', N'Chi bộ 5', N'Công đoàn',
 N'Hậu cần', N'Tiếng Nga', N'Thạc sĩ', CONVERT(DATE, GETDATE()), CONVERT(DATE, GETDATE())),
(N'Phạm Thị Lan', N'Lan', N'Không', N'Thượng úy', 3, N'Nữ', N'Cán bộ nhân sự', '1992-09-20',
 '444455556666', '2012-11-01', N'Thái Bình', N'Thái Bình', N'Kinh', N'Công nhân', '2010-04-10',
 '2011-04-10', '2009-03-05', N'12/12', N'Trung cấp', N'Không', N'Kỹ thuật', N'Thái Bình',
 N'Thái Bình', N'Không', N'Nhân viên hành chính', '2014-03-01', '2010-03-10', N'Chi bộ 2', N'Hội phụ nữ',
 N'Nhân sự', N'Tiếng Anh', N'Cử nhân', CONVERT(DATE, GETDATE()), CONVERT(DATE, GETDATE()));
 go

 --sửa
UPDATE CanBo
SET
  CapBac = N'Thượng úy',
  ChucVu = N'Cán bộ chính trị',
  MaDV = 2
WHERE MaCB = 4;
go 

--trigger tự động cập nhật ngày sửa
CREATE TRIGGER trg_CanBo_Update
ON CanBo
AFTER UPDATE
AS
BEGIN
  UPDATE CanBo
  SET NgaySua = CONVERT(DATE, GETDATE())
  FROM CanBo cb
  INNER JOIN inserted i ON cb.MaCB = i.MaCB;
END;
go

--Thân nhân
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
go


--thêm 
INSERT INTO ThanNhan (
  HoTen, NamSinh, GioiTinh, QuanHe, NgheNghiep, QueQuan, NoiTamTru, MaCB
) VALUES
(N'Nguyễn Thị Mai', 1960, N'Nữ', N'Mẹ', N'Nội trợ', N'Hà Nội', N'Hà Nội', 1),
(N'Lê Văn Hùng', 1955, N'Nam', N'Cha', N'Nghỉ hưu', N'Nghệ An', N'TP Vinh', 2),
(N'Phạm Thị Hạnh', 1990, N'Nữ', N'Vợ', N'Giáo viên', N'Hà Nam', N'Hà Nội', 3),
(N'Ngô Văn Dũng', 1985, N'Nam', N'Anh trai', N'Công nhân', N'Thái Bình', N'Thái Bình', 4);
go

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
go

--thêm
INSERT INTO DonXinNghiPhep (
  NgayDon, LyDo, TuNgay, DenNgay, TuGio, DenGio,
  DiaChi, TrangThai, NoiNhan, MaCB, NgayTao, NgayDuyet
) VALUES
('2025-06-01', N'Nghỉ phép cá nhân', '2025-06-05', '2025-06-07', N'08:00', N'17:00', N'Hà Nội', N'Chờ duyệt', 1, 1, GETDATE(), NULL),

('2025-06-02', N'Đi công tác', '2025-06-10', '2025-06-12', N'07:30', N'18:00', N'Đà Nẵng', N'Đã duyệt', 2, 2, GETDATE(), GETDATE()),

('2025-06-03', N'Nghỉ khám bệnh', '2025-06-08', '2025-06-08', N'09:00', N'15:00', N'Bệnh viện 108', N'Từ chối', 1, 3, GETDATE(), GETDATE()),

('2025-06-04', N'Nghỉ thai sản', '2025-06-15', '2025-09-15', N'00:00', N'23:59', N'Thái Bình', N'Chờ duyệt', 3, 4, GETDATE(), NULL);
go

--Giấy nghỉ phép
CREATE TABLE GiayNghiPhep (
  MaGiay INT PRIMARY KEY IDENTITY(1,1),
  SoQD INT,
  Ngay DATE,
  MaDon INT,
  FOREIGN KEY (MaDon) REFERENCES DonXinNghiPhep(MaDon)
);
go

--thêm
INSERT INTO GiayNghiPhep (SoQD, Ngay, MaDon)
VALUES (102, '2025-06-04', 2);
go

--tìm kiếm
--SELECT * FROM CanBo
--WHERE HoTenKhaiSinh LIKE N'%Bình%';
go

--xóa
--DELETE FROM CanBo
--WHERE MaCB = 2;
--SELECT * FROM CanBo
go

select * from DonVi
select * from CanBo
select * from ThanNhan
select * from DonXinNghiPhep
select * from GiayNghiPhep

INSERT [dbo].[CanBo] ([HoTenKhaiSinh], [HoTenThuongDung], [BiDanh], [GioiTinh], [CapBac], [ChucVu], [MaDV], [NgaySinh], [NoiSinh], [QueQuan], [NoiDKHK], [NoiTamTru], [DanToc], [TonGiao], [ThanhPhanGD], [NgheNghiep], [Ngayvaodang], [Ngaychinhthuc], [Chibo], [Ngayvaodoan], [Noiketnap], [Trangthaidang], [QuaTrinhPhanDau], [NgayNhapNgu], [NgayCongTac], [ThamGiaTCXH], [NgayThamGiaCM], [GDPT], [ChuyenMonNV], [LyLuanCT], [NgoaiNgu], [HocHam], [HocVi], [CongTacDangLam], [SoCCCD], [TrangThai], [NgayTao], [NgaySua]) 
VALUES
(N'Trần Văn Sang', NULL, NULL, N'Nam', N'Thượng úy', N'Đại đội trưởng', 3, CAST(N'1985-03-20' AS Date), NULL, N'Hà Nam', N'Hà Nội', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,  NULL),
(N'Nguyễn Thị Mai', NULL, NULL, N'Nữ', N'Đại úy', N'Trưởng phòng', 6, CAST(N'1990-07-10' AS Date), NULL, N'Thanh Hóa', N'Đà Nẵng', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,  NULL),
(N'Lê Văn Bình', NULL, NULL, N'Nam', N'Thiếu tá', N'Trợ lí', 3, CAST(N'1980-11-02' AS Date), NULL, N'Quảng Nam', N'HCM', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(N'Vũ Xuân An', N'Vũ Xuân An', NULL, N'Nam', N'Đại úy', N'Đại đội trưởng', 3, CAST(N'2003-03-16' AS Date), NULL, N'Ninh Bình', N'Ninh Bình', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(N'Mạch Duy Hùng', N'Mạch Duy Hùng', NULL, N'Nam', N'Trung úy', N'Phó Đại đội trưởng', 3, CAST(N'2004-10-10' AS Date), NULL, N'Ninh Bình', N'Ninh Bình', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(N'Vũ Xuân An', N'Vũ Xuân An', NULL, N'Nam', N'Thượng tá', N'Viện trưởng', 17, CAST(N'1985-03-20' AS Date), NULL, N'Thanh Hóa', N'HCM', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,  NULL),
(N'Đàm Thùy Dương', N'Đàm Thùy Dương', NULL, N'Nữ', N'Trung úy', N'Phó Đại đội trưởng', 12, CAST(N'2006-06-17' AS Date), NULL, N'Ninh Bình', N'Ninh Bình', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(N'Lê Nguyễn Nhựt Nam', N'Lê Nguyễn Nhựt Nam', NULL, N'Nam', N'Đại úy', N'Phó Đại đội trưởng', 12, CAST(N'2006-06-17' AS Date), NULL, N'Vĩnh Long', N'Vĩnh Long', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);



INSERT INTO CanBo (HoTenKhaiSinh, HoTenThuongDung, GioiTinh, CapBac, ChucVu, MaDV, NgaySinh, NoiSinh, QueQuan, NoiDKHK, DanToc, TonGiao, ThanhPhanGD, NgheNghiep, Ngayvaodoan, Ngayvaodang, Ngaychinhthuc, Chibo, Trangthaidang, SoCCCD, TrangThai, NgayTao) VALUES 
(N'Nguyễn Hồng Thắm', N'Nguyễn Hồng Thắm', N'Nam', N'Đại tá', N'Trưởng phòng', 3, '1975-08-15', N'Hà Nội', N'Hà Nội', N'Hà Nội', N'Kinh', N'Không', N'Gia đình cán bộ', N'Quân nhân', '1993-05-15', '2000-05-15', '2001-05-15', N'Chi bộ Phòng TCB', N'Đảng viên', '001075081567', N'Hoạt động', GETDATE()),

(N'Trần Văn Hùng', N'Trần Văn Hùng', N'Nam', N'Thượng úy', N'Giảng viên', 1, '1985-03-20', N'Hà Nội', N'Hà Nam', N'Hà Nội', N'Kinh', N'Không', N'Gia đình công nhân', N'Giảng viên', '2003-05-15', '2010-05-15', '2011-05-15', N'Chi bộ Khoa CNTT', N'Đảng viên', '001085032012', N'Hoạt động', GETDATE()),
(N'Nguyễn Thị Mai', N'Nguyễn Thị Mai', N'Nữ', N'Đại úy', N'Phó trưởng khoa', 1, '1990-07-10', N'Đà Nẵng', N'Thanh Hóa', N'Đà Nẵng', N'Kinh', N'Không', N'Gia đình cán bộ', N'Giảng viên', '2008-03-20', '2015-03-20', '2016-03-20', N'Chi bộ Khoa CNTT', N'Đảng viên', '001090071034', N'Hoạt động', GETDATE()),

(N'Lê Văn Bình', N'Lê Văn Bình', N'Nam', N'Thiếu tá', N'Trưởng bộ môn', 2, '1980-11-02', N'HCM', N'Quảng Nam', N'HCM', N'Kinh', N'Không', N'Gia đình nông dân', N'Giảng viên', '1998-12-10', '2008-12-10', '2009-12-10', N'Chi bộ Khoa ĐTVT', N'Đảng viên', '001080110245', N'Hoạt động', GETDATE()),

(N'Phạm Thị Lan', N'Phạm Thị Lan', N'Nữ', N'Trung úy', N'Giảng viên', 1, '1992-05-15', N'Hà Nội', N'Hà Nội', N'Hà Nội', N'Kinh', N'Không', N'Gia đình trí thức', N'Giảng viên', '2010-01-15', '2018-01-15', '2019-01-15', N'Chi bộ Khoa CNTT', N'Đảng viên', '001092051567', N'Hoạt động', GETDATE()),

(N'Hoàng Văn Nam', N'Hoàng Văn Nam', N'Nam', N'Thiếu úy', N'Giảng viên', 1, '1995-08-22', N'Huế', N'Thừa Thiên Huế', N'Huế', N'Kinh', N'Không', N'Gia đình công nhân', N'Giảng viên', '2013-03-15', NULL, NULL, NULL, N'Quần chúng', '001095082289', N'Hoạt động', GETDATE());


INSERT [dbo].[CanBo] ([HoTenKhaiSinh], [GioiTinh], [CapBac], [ChucVu], [MaDV], [NgaySinh], [TrangThai], [NgayTao]) VALUES 
-- C157 (MaDV = 1)
(N'Nguyễn Đức Trung', N'Nam', N'Trung Sĩ', N'Học Viên', 3, '2000-05-15', N'Đang công tác', '2024-01-01'),
(N'Trần Thị Hương', N'Nữ', N'Trung tá', N'Trưởng phòng', 3, '1980-03-20', N'Đang công tác', '2024-01-01'),
(N'Lê Văn Hoàng', N'Nam', N'Thiếu tá', N'Phó Trưởng phòng', 3, '1985-07-12', N'Đang công tác', '2024-01-01'),

-- Phòng Tham Mưu (MaDV = 2)
(N'Nguyễn Văn An', N'Nam', N'Thiếu tá', N'Phó Trưởng phòng', 10, '1986-03-15', N'Đang công tác', '2024-01-01'),
(N'Trần Thị Bình', N'Nữ', N'Đại úy', N'Nhân viên', 10, '1988-07-20', N'Đang công tác', '2024-01-01'),
(N'Phạm Văn Cường', N'Nam', N'Trung úy', N'Nhân viên', 10, '1992-11-10', N'Đang công tác', '2024-01-01'),
(N'Lê Thị Mai', N'Nữ', N'Thiếu úy', N'Nhân viên', 10, '1995-05-25', N'Đang công tác', '2024-01-01'),
(N'Vũ Văn Đức', N'Nam', N'Trung Sĩ', N'Học Viên', 10, '1999-09-08', N'Đang công tác', '2024-01-01'),

-- Phòng Hậu Cần (MaDV = 3)
(N'Hoàng Văn Minh', N'Nam', N'Trung tá', N'Trưởng phòng', 11, '1982-06-25', N'Đang công tác', '2024-01-01'),
(N'Vũ Thị Lan', N'Nữ', N'Thiếu tá', N'Phó Trưởng phòng', 11, '1987-09-18', N'Đang công tác', '2024-01-01'),
(N'Đỗ Văn Hùng', N'Nam', N'Đại úy', N'Nhân viên', 11, '1989-01-12', N'Đang công tác', '2024-01-01'),
(N'Bùi Thị Nga', N'Nữ', N'Trung úy', N'Nhân viên', 11, '1993-04-08', N'Đang công tác', '2024-01-01'),

-- Phòng Chính Trị (MaDV = 4)
(N'Lý Văn Tuấn', N'Nam', N'Trung tá', N'Trưởng phòng', 12, '1981-12-30', N'Đang công tác', '2024-01-01'),
(N'Phạm Thị Hoa', N'Nữ', N'Thiếu tá', N'Phó Trưởng phòng', 12, '1984-02-15', N'Đang công tác', '2024-01-01'),
(N'Ngô Văn Dũng', N'Nam', N'Đại úy', N'Nhân viên', 12, '1990-08-22', N'Đang công tác', '2024-01-01'),
(N'Đinh Thị Thu', N'Nữ', N'Trung úy', N'Nhân viên', 12, '1994-11-05', N'Đang công tác', '2024-01-01'),

-- Tiểu Đoàn 1 (MaDV = 5)
(N'Trịnh Văn Khoa', N'Nam', N'Thiếu tá', N'Phó Trưởng phòng', 1, '1985-04-18', N'Đang công tác', '2024-01-01'),
(N'Cao Văn Nam', N'Nam', N'Đại úy', N'Nhân viên', 1, '1989-10-12', N'Đang công tác', '2024-01-01'),
(N'Phan Thị Linh', N'Nữ', N'Trung úy', N'Nhân viên', 1, '1992-06-08', N'Đang công tác', '2024-01-01'),
(N'Lương Văn Tài', N'Nam', N'Thiếu úy', N'Nhân viên', 1, '1996-01-25', N'Đang công tác', '2024-01-01'),

-- Tiểu Đoàn 2 (MaDV = 6)
(N'Võ Văn Tài', N'Nam', N'Đại úy', N'Nhân viên', 2, '1988-12-15', N'Đang công tác', '2024-01-01'),
(N'Lê Thị Yến', N'Nữ', N'Trung úy', N'Nhân viên', 2, '1991-03-28', N'Đang công tác', '2024-01-01'),
(N'Hoàng Văn Đức', N'Nam', N'Thiếu úy', N'Nhân viên', 2, '1995-08-10', N'Đang công tác', '2024-01-01'),

-- Đại Đội Trinh Sát (MaDV = 7)
(N'Nguyễn Thị Kim', N'Nữ', N'Trung Sĩ', N'Học Viên', 2, '1999-05-20', N'Đang công tác', '2024-01-01'),
(N'Trần Văn Long', N'Nam', N'Trung Sĩ', N'Học Viên', 2, '1998-10-30', N'Đang công tác', '2024-01-01'),
(N'Lê Thị Oanh', N'Nữ', N'Trung Sĩ', N'Học Viên', 2, '2000-02-14', N'Đang công tác', '2024-01-01'),

-- Phòng Kỹ Thuật (MaDV = 8)
(N'Đặng Văn Quang', N'Nam', N'Thiếu tá', N'Phó Trưởng phòng', 14, '1983-11-07', N'Đang công tác', '2024-01-01'),
(N'Vương Thị Hằng', N'Nữ', N'Đại úy', N'Nhân viên', 14, '1987-04-22', N'Đang công tác', '2024-01-01'),

-- Ban Chỉ Huy (MaDV = 9)
(N'Lương Văn Sơn', N'Nam', N'Trung tá', N'Trưởng phòng', 15, '1979-07-18', N'Đang công tác', '2024-01-01'),
(N'Phạm Thị Xuân', N'Nữ', N'Thiếu tá', N'Phó Trưởng phòng', 15, '1984-09-12', N'Đang công tác', '2024-01-01');


