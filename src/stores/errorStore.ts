import { create } from 'zustand';
interface Error {
  statusCode: number | string;
}
interface ErrorState {
  hasError: boolean;
  status: number | string;
  setError: (error: Error) => void;
  resetError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  hasError: false,
  status: '',
  message: '',
  setError: (error: Error) => set({ hasError: true, status: error.statusCode }),
  resetError: () => set({ hasError: false }),
}));

export default useErrorStore;
