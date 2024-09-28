import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/types";
import { getLogin, getLogout } from "../utils/authApi";
import { RootState } from "./store";

interface AuthState {
  authToken?: string | null;
  user?: User | null;
  isLoading: boolean;
  error: any | null;
}

const initialState: AuthState = {
  authToken: null,
  user: null,
  isLoading: false,
  error: null,
};

type LoginUserParams = {
  email: string;
  grantAdminPrivilege: boolean;
};

export const loginUser = createAsyncThunk(
  "auth/fetch-auth-token",
  async ({ email, grantAdminPrivilege }: LoginUserParams) => {
    const { data } = await getLogin(email, grantAdminPrivilege);
    return data;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout-auth-token",
  async () => {
    const { data } = await getLogout();
    return data;
  }
);

const authSlice = createSlice({
  name: "auth-user",
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.authToken = initialState.authToken;
    //   state.user = initialState.user;
    //   state.isLoading = initialState.isLoading;
    //   state.error = initialState.error;
    // },
  },
  extraReducers: (builder) => {
    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.authToken = null;
      state.user = null;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.authToken = action.payload.authToken;
      state.user = action.payload.user;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.authToken = null;
      state.user = null;
      state.isLoading = false;
      state.error = new Error("Login failed: " + action?.error?.message);
    });

    // Logout User
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.authToken = action.payload.authToken;
      state.user = action.payload.user;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = new Error("Logout failed: " + action?.error?.message);
    });
  },
});

export const authUserSelector = (state: RootState) => state.auth.user;
export const authIsLoadingSelector = (state: RootState) => state.auth.isLoading;
export const authErrorSelector = (state: RootState) => state.auth.error;

export const authActions = authSlice.actions;
const authSliceReducer = authSlice.reducer;
export default authSliceReducer;
