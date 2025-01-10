import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLoginStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (loginStatus) => set(() => ({ isLoggedIn: loginStatus })),
      userId: null,
      setUserId: (userId) => set({ userId: userId }),
      accessToken: null,
      setAccessToken: (accessToken) => set({ accessToken: accessToken }),
      refreshToken: null,
      setRefreshToken: (refreshToken) => set({ refreshToken: refreshToken }),
      logout: () =>
        set({
          isLoggedIn: false,
          userId: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: 'loginStorage',
    },
  ),
);

export default useLoginStore;
