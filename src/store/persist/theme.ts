import { StateCreator } from "zustand";

export interface ThemeSlice {
  mode: "light" | "dark";
  toggleMode: () => void;
}

export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  mode: "light",
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === "light" ? "dark" : "light",
    })),
});
