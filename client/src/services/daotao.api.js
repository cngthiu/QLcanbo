import axios from "./api"; // đã cấu hình axios với token

const API = {
  getAll: (params) => axios.get("/daotao", { params }),
  create: (data) => axios.post("/daotao", data),
  update: (id, data) => axios.put(`/daotao/${id}`, data),
  remove: (id) => axios.delete(`/daotao/${id}`),
  getAllFiltered: (params) => axios.get("/daotao", { params }),
  getAllDMDaoTao: () => axios.get("/dmdaotao"),
  createDMDaoTao: (data) => axios.post("/dmdaotao", data),
  updateDMDaoTao: (id, data) => axios.put(`/dmdaotao/${id}`, data),
  removeDMDaoTao: (id) => axios.delete(`/dmdaotao/${id}`),
  getAllTrangThai: () => axios.get("/dmdaotao/trangthai"),
  getThamGiaByMaCT: (MaCT) => axios.get(`/daotao/thamgia`, { params: { MaCT } }),
  searchCanBoByName: (keyword) => axios.get("/daotao/search", { params: { keyword } }),
  addCanBoToCTDT: (MaCT, data) => axios.post(`/daotao/thamgia/${MaCT}`, data),
  removeCanBoFromCTDT: (MaCT, MaCB) => axios.delete(`/daotao/thamgia/${MaCT}/${MaCB}`),
  sendEmailForTraining: (MaCT, data) => axios.post(`/daotao/thamgia/${MaCT}/send`, data),
  getEmailsByUserId: (userId) => axios.get("/users/emails", { params: { userId } }),
};

export default API;