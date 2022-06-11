import { authApi } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const login = createAsyncThunk("auth/login", async (data: any, { rejectWithValue }) => {
  try {
    const res = await authApi.login(data);
    return res.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response.data);
    }
  }
});

const verifyToken = createAsyncThunk(
  "auth/verify",
  async (accessToken: any, { rejectWithValue }) => {
    try {
      const res = await authApi.verify(accessToken);
      return res.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

const updateCompany = createAsyncThunk(
  "auth/update",
  async ({ idCompany, data }: { idCompany: any; data: any }, { rejectWithValue }) => {
    try {
      const res = await authApi.update(idCompany, data);
      return res.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export { login, verifyToken, updateCompany };
