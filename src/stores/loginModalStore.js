import { create } from "zustand";

const useLoginModalStore = create((set) => ({
  modalOpen: false,
  modalControl: () => set((state) => ({ modalOpen: !state.modalOpen })),
}));
export default useLoginModalStore;
