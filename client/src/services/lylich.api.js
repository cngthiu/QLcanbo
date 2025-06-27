import axios from "./api"; 

const API = {
  // getAllCanBo: (page = 1, pageSize = 10, keyword = "") =>
  // axios.get(`/canbo?page=${page}&pageSize=${pageSize}&keyword=${keyword}`),
  getAllCanBo: (params) => axios.get(`/canbo`, { params }),

  createCanBo: (data) => axios.post("/canbo", data),
  updateCanBo: (id, data) => axios.patch(`/canbo/update/${id}`, data),
  deleteCanBo: (id) => axios.delete(`/canbo/${id}`),  
  getDonVi: () => axios.get("/canbo/donvi"),
  getCBById: (id) => axios.get(`/canbo/view/${id}`),
  //getAllFiltered: (params) => axios.get("/canbo", { params }),
};

export default API;