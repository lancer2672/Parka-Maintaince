import { parkingLotApi } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllParkingLots = createAsyncThunk(
  "parkingLots/getAll",
  async (idCompany: string, { rejectWithValue }) => {
    try {
      const res = await parkingLotApi.getAll(idCompany);
      return res.data.data;
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

const deleteParkingLot = createAsyncThunk(
  "parkingLots/delete",
  async (idCompany: string, { rejectWithValue }) => {
    try {
      const res = await parkingLotApi.delete(idCompany);
      return res.data.data;
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

export { getAllParkingLots, deleteParkingLot };
