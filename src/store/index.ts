import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createSettingsSlice, SettingsSlice } from "./persist/settings";
import { createThemeSlice, ThemeSlice } from "./persist/theme";
import { AuthSlice, createAuthSlice } from "./volatile/auth";

export interface HydrationSlice {
  isHydrated: boolean;
}

export type PersistedStore = ThemeSlice & SettingsSlice & HydrationSlice;

export const usePersistedStore = create<PersistedStore>()(
  persist(
    (set, get, api) => ({
      isHydrated: false,
      ...createThemeSlice(set, get, api),
      ...createSettingsSlice(set, get, api),
    }),
    {
      name: "persisted-store",
      onRehydrateStorage: () => (state) => {
        if (state) state.isHydrated = true;
      },
    },
  ),
);

export type VolatileStore = AuthSlice;

export const useVolatileStore = create<VolatileStore>()((set, get, api) => ({
  ...createAuthSlice(set, get, api),
}));
