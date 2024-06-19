import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface MobileNavState {
  status: boolean;
}

const initialState: MobileNavState = {
  status: false,
};

const mobileNavSlice = createSlice({
  name: "mobile-nav-slice",
  initialState,
  reducers: {
    toggleMobileNav: (state) => {
      state.status = !state.status;
    },
    setMobileNav: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export const { toggleMobileNav, setMobileNav } = mobileNavSlice.actions;

export const selectMobileNav = (state: RootState) => state.mobileNav;

export const mobileNavReducer = mobileNavSlice.reducer;
