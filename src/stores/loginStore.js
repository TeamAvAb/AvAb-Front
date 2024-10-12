import { create } from "zustand";

const useLoginStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (loginStatus) => set(() => ({ isLoggedIn: loginStatus })),
}));

export default useLoginStore;
