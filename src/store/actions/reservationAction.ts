import { createAsyncThunk } from "@reduxjs/toolkit";
import { parkingReservationApi } from "@src/api";

const getReservations = createAsyncThunk(
  "reservation/get",
  async (idUser: string) => {
    const res = await parkingReservationApi.getAllByIdUser(idUser);
    return res.data;
  },
);

const createReservation = createAsyncThunk(
  "reservation/create",
  async (data: any) => {
    const res = await parkingReservationApi.create(data);
    return res.data;
  },
);

export { getReservations, createReservation };
