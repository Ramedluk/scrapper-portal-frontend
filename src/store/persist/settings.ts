import { StateCreator } from "zustand";

export interface SettingsSlice {
  language: string;
  setLanguage: (lang: string) => void;
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  language: "en",
  setLanguage: (lang: string) => set({ language: lang }),
});
