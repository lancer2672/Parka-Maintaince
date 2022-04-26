import { Company } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../actions/authAction";

export type AuthState = Partial<{
  auth: Company;
  loading: boolean;
  error: any;
}>;

const initialState: AuthState = {
  auth: undefined,
  loading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("accessToken");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.auth = payload.data;
        localStorage.setItem("accessToken", payload.accessToken);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
