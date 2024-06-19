import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type ThemeModes = "light" | "dark";

function getInitialTheme(): ThemeModes {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs as ThemeModes;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }
  return "light";
}

const rawSetTheme = (theme: ThemeModes) => {
  const root = window.document.documentElement;
  const isDark = theme === "dark";

  root.classList.remove(isDark ? "light" : "dark");
  root.classList.add(theme);

  localStorage.setItem("color-theme", theme);
};

// Define a type for the slice state
interface ThemeState {
  mode: ThemeModes;
}

// Define the initial state using that type
const initialState: ThemeState = {
  mode: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: "theme-state",
  initialState,
  reducers: {
    toggle: (state) => {
      const theme = state.mode === "light" ? "dark" : "light";
      state.mode = theme;
      rawSetTheme(theme);
    },
    setThemeMode: (state, action: PayloadAction<ThemeModes>) => {
      state.mode = action.payload;
      rawSetTheme(action.payload);
    },
  },
});

export const { toggle, setThemeMode } = themeSlice.actions;

export const selectThemeMode = (state: RootState) => state.theme;

export const themeSliceReducer = themeSlice.reducer;
