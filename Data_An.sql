
INSERT [dbo].[TrangThai] ([MaTrangThai], [TenTrangThai]) VALUES (N'1         ', N'Hoạt động');
INSERT [dbo].[TrangThai] ([MaTrangThai], [TenTrangThai]) VALUES (N'2         ', N'Ngưng hoạt động');

SET IDENTITY_INSERT [dbo].[DanhMucDaoTao] ON ;

INSERT [dbo].[DanhMucDaoTao] ([MaDM], [TenDM], [MoTa], [MaTrangThai], [NgayCapNhat]) VALUES (1, N'Tiến sĩ 2', N'Đào tạo tiến sĩ các chuyên ngành', N'1         ', CAST(N'2025-06-22T08:01:20.303' AS DateTime));
INSERT [dbo].[DanhMucDaoTao] ([MaDM], [TenDM], [MoTa], [MaTrangThai], [NgayCapNhat]) VALUES (2, N'Thạc sĩ', N'Đào tạo thạc sĩ các chuyên ngành', N'2         ', CAST(N'2025-06-22T08:01:20.303' AS DateTime));
INSERT [dbo].[DanhMucDaoTao] ([MaDM], [TenDM], [MoTa], [MaTrangThai], [NgayCapNhat]) VALUES (3, N'Chỉ huy tham mưu kỹ thuật', N'Đào tạo chuyên ngành chỉ huy tham mưu kỹ thuật', N'1         ', CAST(N'2025-06-22T08:01:20.303' AS DateTime));

SET IDENTITY_INSERT [dbo].[DanhMucDaoTao] OFF;

SET IDENTITY_INSERT [dbo].[ChuongTrinhDaoTao] ON ;

INSERT [dbo].[ChuongTrinhDaoTao] ([MaCT], [TenCT], [MaDM], [NgayBatDau], [NgayKetThuc], [DiaDiem], [MaTrangThai], [Khoa]) VALUES (1, N'Kỹ thuật phần mềm', 1, CAST(N'2025-05-27' AS Date), CAST(N'2029-05-27' AS Date), N'H3 - 214 - Khu A', N'1         ', N'37');
INSERT [dbo].[ChuongTrinhDaoTao] ([MaCT], [TenCT], [MaDM], [NgayBatDau], [NgayKetThuc], [DiaDiem], [MaTrangThai], [Khoa]) VALUES (2, N'Toán ứng dụng ', 2, CAST(N'2025-05-27' AS Date), CAST(N'2027-05-27' AS Date), N'H2 - 214 - Khu A', N'2         ', N'27');
INSERT [dbo].[ChuongTrinhDaoTao] ([MaCT], [TenCT], [MaDM], [NgayBatDau], [NgayKetThuc], [DiaDiem], [MaTrangThai], [Khoa]) VALUES (7, N'Toán ứng dụng 1', 2, CAST(N'2025-06-05' AS Date), CAST(N'2025-06-08' AS Date), N'Khu A - Hà Nội', N'1         ', N'1');
INSERT [dbo].[ChuongTrinhDaoTao] ([MaCT], [TenCT], [MaDM], [NgayBatDau], [NgayKetThuc], [DiaDiem], [MaTrangThai], [Khoa]) VALUES (8, N'Toán ứng dụng 1', 3, CAST(N'2025-06-27' AS Date), CAST(N'2025-06-10' AS Date), N'Khu A - Hà Nội', N'2         ', N'1');
SET IDENTITY_INSERT [dbo].[ChuongTrinhDaoTao] OFF;

INSERT [dbo].[CTDT_CanBo] ([MaCT], [MaCB], [ThamGia]) VALUES (2, 1, N'ThamGia');
INSERT [dbo].[CTDT_CanBo] ([MaCT], [MaCB], [ThamGia]) VALUES (2, 2, N'ThamGia');
INSERT [dbo].[CTDT_CanBo] ([MaCT], [MaCB], [ThamGia]) VALUES (2, 3, N'ThamGia');
INSERT [dbo].[CTDT_CanBo] ([MaCT], [MaCB], [ThamGia]) VALUES (8, 4, N'ThamGia');
INSERT [dbo].[CTDT_CanBo] ([MaCT], [MaCB], [ThamGia]) VALUES (7, 5, N'ThamGia');
INSERT [dbo].[CTDT_CanBo] ([MaCT], [MaCB], [ThamGia]) VALUES (7, 6, N'ThamGia');
INSERT [dbo].[CTDT_CanBo] ([MaCT], [MaCB], [ThamGia]) VALUES (8, 7, N'ThamGia');
INSERT [dbo].[CTDT_CanBo] ([MaCT], [MaCB], [ThamGia]) VALUES (2, 8, N'ThamGia');
INSERT [dbo].[CTDT_CanBo] ([MaCT], [MaCB], [ThamGia]) VALUES (2, 9, N'ThamGia');
INSERT [dbo].[CTDT_CanBo] ([MaCT], [MaCB], [ThamGia]) VALUES (2, 10, N'ThamGia');
INSERT [dbo].[CTDT_CanBo] ([MaCT], [MaCB], [ThamGia]) VALUES (8, 11, N'ThamGia');
INSERT [dbo].[CTDT_CanBo] ([MaCT], [MaCB], [ThamGia]) VALUES (7, 12, N'ThamGia');

INSERT [dbo].[LoaiKhenThuong] ([MaLoaiKT], [LoaiKhenThuong]) VALUES (N'1         ', N'Chiến sĩ thi đua');
INSERT [dbo].[LoaiKhenThuong] ([MaLoaiKT], [LoaiKhenThuong]) VALUES (N'2         ', N'Giấy khen');
INSERT [dbo].[LoaiKhenThuong] ([MaLoaiKT], [LoaiKhenThuong]) VALUES (N'3         ', N'Bằng khen');
INSERT [dbo].[LoaiKhenThuong] ([MaLoaiKT], [LoaiKhenThuong]) VALUES (N'4         ', N'Danh hiệu Chiến sĩ giỏi, Lao động giỏi');
INSERT [dbo].[LoaiKhenThuong] ([MaLoaiKT], [LoaiKhenThuong]) VALUES (N'5         ', N'Huân chương');

SET IDENTITY_INSERT [dbo].[KhenThuong] ON ;

INSERT [dbo].[KhenThuong] ([MaKT], [LyDo], [MaTrangThai], [MaLoaiKT], [ThoiGianTao]) VALUES (1, N'Thành tích xuất sắc đợi thi đua ', N'1         ', N'1         ', NULL);
INSERT [dbo].[KhenThuong] ([MaKT], [LyDo], [MaTrangThai], [MaLoaiKT], [ThoiGianTao]) VALUES (2, N'Thành tích xuất sắc đợi thi đua ', N'1         ', N'1         ', NULL);
INSERT [dbo].[KhenThuong] ([MaKT], [LyDo], [MaTrangThai], [MaLoaiKT], [ThoiGianTao]) VALUES (3, N'Thành tích xuất sắc đợi thi đua ', N'1         ', N'1         ', NULL);
SET IDENTITY_INSERT [dbo].[KhenThuong] OFF;

INSERT [dbo].[LoaiKyLuat] ([MaLoaiKL], [LoaiKyLuat]) VALUES (N'1         ', N'Khiển trách');
INSERT [dbo].[LoaiKyLuat] ([MaLoaiKL], [LoaiKyLuat]) VALUES (N'2         ', N'Cảnh cáo');
INSERT [dbo].[LoaiKyLuat] ([MaLoaiKL], [LoaiKyLuat]) VALUES (N'3         ', N'Hạ bậc lương');
INSERT [dbo].[LoaiKyLuat] ([MaLoaiKL], [LoaiKyLuat]) VALUES (N'4         ', N'Giáng chức');
INSERT [dbo].[LoaiKyLuat] ([MaLoaiKL], [LoaiKyLuat]) VALUES (N'5         ', N'Cách chức');
INSERT [dbo].[LoaiKyLuat] ([MaLoaiKL], [LoaiKyLuat]) VALUES (N'6         ', N'Giáng cấp bậc quân hàm');
INSERT [dbo].[LoaiKyLuat] ([MaLoaiKL], [LoaiKyLuat]) VALUES (N'7         ', N'Tước quân hàm sĩ quan');
INSERT [dbo].[LoaiKyLuat] ([MaLoaiKL], [LoaiKyLuat]) VALUES (N'8         ', N'Tước danh hiệu quân nhân');

SET IDENTITY_INSERT [dbo].[KyLuat] ON ;

INSERT [dbo].[KyLuat] ([MaKL], [LyDo], [MaTrangThai], [MaLoaiKL], [ThoiGianTao]) VALUES (1, N'Vắng mặt trái phép', N'1         ', N'1         ', CAST(N'2025-10-10T00:00:00.000' AS DateTime));
INSERT [dbo].[KyLuat] ([MaKL], [LyDo], [MaTrangThai], [MaLoaiKL], [ThoiGianTao]) VALUES (2, N'Vi phạm điều lệ Đảng', N'1         ', N'1         ', CAST(N'2025-10-10T00:00:00.000' AS DateTime));
INSERT [dbo].[KyLuat] ([MaKL], [LyDo], [MaTrangThai], [MaLoaiKL], [ThoiGianTao]) VALUES (3, N'Vi phạm pháp luật', N'1         ', N'2        ', CAST(N'2025-10-10T00:00:00.000' AS DateTime));
SET IDENTITY_INSERT [dbo].[KyLuat] OFF;

INSERT [dbo].[KhenThuong_CanBo] ([MaKT], [MaCB], [NgayQuyetDinh]) VALUES (1, 5, CAST(N'2025-07-16' AS Date));
INSERT [dbo].[KhenThuong_CanBo] ([MaKT], [MaCB], [NgayQuyetDinh]) VALUES (2, 7, CAST(N'2025-07-16' AS Date));
INSERT [dbo].[KhenThuong_CanBo] ([MaKT], [MaCB], [NgayQuyetDinh]) VALUES (3, 12, CAST(N'2025-07-16' AS Date));

INSERT [dbo].[KyLuat_CanBo] ([MaKL], [MaCB], [NgayQuyetDinh]) VALUES (1, 10, CAST(N'2025-10-10' AS Date));
INSERT [dbo].[KyLuat_CanBo] ([MaKL], [MaCB], [NgayQuyetDinh]) VALUES (2, 9, CAST(N'2025-10-10' AS Date));
INSERT [dbo].[KyLuat_CanBo] ([MaKL], [MaCB], [NgayQuyetDinh]) VALUES (3, 6, CAST(N'2025-10-10' AS Date));



