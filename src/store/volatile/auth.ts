import { StateCreator } from "zustand";

export interface AuthSlice {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoggedOut: boolean;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  accessToken: null,
  isAuthenticated: false,
  isLoggedOut: false,
  setAccessToken: (token) =>
    set({
      accessToken: token,
      isAuthenticated: !!token,
      isLoggedOut: false,
    }),

  logout: () =>
    set({
      accessToken: null,
      isAuthenticated: false,
      isLoggedOut: true,
    }),
});
