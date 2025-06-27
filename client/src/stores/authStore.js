import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  userId: localStorage.getItem("userId"),
  setAuth: (token, role, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
    set({ token, role, userId });
  },
  logout: () => {
    localStorage.clear();
    set({ token: null, role: null, userId: null });
  },
}));

export default useAuthStore;
