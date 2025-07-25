import { create } from 'zustand';
interface Error {
  statusCode: number | string;
  message: string;
}
interface ErrorState {
  hasError: boolean;
  status: number | string;
  message: string;
  setError: (error: Error) => void;
  resetError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  hasError: false,
  status: '',
  message: '',
  setError: (error: Error) =>
    set({ hasError: true, status: error.statusCode, message: error.message }),
  resetError: () => set({ hasError: false, message: '' }),
}));

export default useErrorStore;
