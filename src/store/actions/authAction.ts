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

const signup = createAsyncThunk("auth/signup", async (data: any, { rejectWithValue }) => {
  fetch("http://localhost:8088/api/merchant/company/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      if (!error.response) {
        throw error;
      }
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
    });
  //   try {
  //     const res = await authApi.signup(data);
  //     return res.data;
  //   } catch (error: any) {
  //     if (!error.response) {
  //       throw error;
  //     }
  //     if (axios.isAxiosError(error)) {
  //       return rejectWithValue(error.response.data);
  //     }
  //   }
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

export { login, verifyToken, signup, updateCompany };
