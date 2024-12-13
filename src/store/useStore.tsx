import { create } from "zustand";

const useStore = create((set) => ({
  isLogin: false,
  user: null,
  login: (user: any) => set({ user, isLogin: true }),
  logout: () => set({ user: null, isLogin: false }),
}));

export default useStore;
