import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard";
import Unauthorized from "../pages/Unauthorized";
import UserList from "../pages/UserList";
import BangCapList from "../pages/QuanLyBangCap/BangCapList";
import BangCapFormPage from "../pages/QuanLyBangCap/BangCapFormPage";
import BangCapDetail from "@/pages/QuanLyBangCap/BangCapDetail";
<<<<<<< HEAD

import LyLich from "../pages/QuanLyTTCaNhan/LyLich";
import LyLichAdd from "../pages/QuanLyTTCaNhan/LyLichAdd";
import LyLichDetail from "../pages/QuanLyTTCaNhan/LyLichDetail";
import LyLichUpdate from "../pages/QuanLyTTCaNhan/LyLichUpdate";

import DaoTaoList from "../pages/QuanLyDaoTao/DaoTaoList";
import DaoTaoFormPage from "../pages/QuanLyDaoTao/DaoTaoFormPage";
import DaoTaoDetail from "../pages/QuanLyDaoTao/DaoTaoDetail";
import DMDaoTaoList from "../pages/QuanLyDaoTao/DMDaoTaoList";
import DMDaoTaoFormPage from "../pages/QuanLyDaoTao/DMDaoTaoFormPage";
import CanBoFormPage from "../pages/QuanLyDaoTao/CanBoFormPage";
import InDanhSachCanBo from "../pages/QuanLyDaoTao/InDanhSachCanBo";
import GuiEmail from "../pages/QuanLyDaoTao/GuiEmail";
import XemEmail from "../pages/QuanLyDaoTao/XemEmail";


=======
import BangLuongList from "../pages/QuanLyLuong/BangLuongList";
import BangLuongFormPage from "../pages/QuanLyLuong/BangLuongFormPage";
import BangLuongDetail from "../pages/QuanLyLuong/BangLuongDetail";
>>>>>>> 63052aa (Thêm giao diện của quản lý lương)
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN", "GiangVien", "PhongDaoTao"]}>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/users", element: <UserList /> },
      { path: "/bangcap", element: <BangCapList /> },
      { path: "/bangcap/form", element: <BangCapFormPage /> },
      { path: "/bangcap/view/:id", element: <BangCapDetail /> },
<<<<<<< HEAD
      { path: "/canbo", element: <LyLich /> },
      { path: "/canbo/form", element: <LyLichAdd /> },
      { path: "/canbo/view/:id", element: <LyLichDetail /> },
      { path: "/canbo/update/:id", element: <LyLichUpdate /> },
      { path: "daotao", element: <DaoTaoList /> },
      { path: "daotao/form", element: <DaoTaoFormPage /> },
      { path: "daotao/thamgia/:id", element: <DaoTaoDetail /> },
      { path: "dmdaotao", element: <DMDaoTaoList /> },
      { path: "dmdaotao/form", element: <DMDaoTaoFormPage /> },
      { path: "daotao/thamgia/:id/form", element: <CanBoFormPage /> },
      { path: "daotao/thamgia/:id/print", element: <InDanhSachCanBo /> },
      { path: "daotao/thamgia/:id/send", element: <GuiEmail /> },
      { path: "user/emails", element: <XemEmail /> },
=======
      { path: "/bangluong", element: <BangLuongList /> },
      { path: "/bangluong/form", element: <BangLuongFormPage /> },
      { path: "/bangluong/view/:id", element: <BangLuongDetail /> },
>>>>>>> 63052aa (Thêm giao diện của quản lý lương)
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/unauthorized", element: <Unauthorized /> },
]);
