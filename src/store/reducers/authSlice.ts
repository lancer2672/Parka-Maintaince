import { createSlice } from "@reduxjs/toolkit";

import { login, updateCompany, signup, verifyToken } from "../actions/authAction";

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
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(verifyToken.fulfilled, (state, { payload }) => {
        state.auth = payload.data;
      })
      .addCase(updateCompany.fulfilled, (state, { payload }) => {
        state.auth = payload.data;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
