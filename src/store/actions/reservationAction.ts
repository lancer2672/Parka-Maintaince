import { createAsyncThunk } from "@reduxjs/toolkit";
import { parkingReservationApi } from "@src/api";

const getReservationsScheduled = createAsyncThunk(
  "reservation/getScheduled",
  async (idUser: string) => {
    const res = await parkingReservationApi.getAllByIdUser(idUser, "scheduled");
    return res.data;
  },
);
const getReservationsCompleted = createAsyncThunk(
  "reservation/getCompleted",
  async (idUser: string) => {
    const res = await parkingReservationApi.getAllByIdUser(idUser, "end");
    return res.data;
  },
);
const createReservation = createAsyncThunk(
  "reservation/create",
  async (data: any) => {
    console.log("action create ");
    const res = await parkingReservationApi.create(data);
    return res.data;
  },
);
// const cancelReservation = createAsyncThunk(
//   "reservation/cancel",
//   async (arrID: any) => {
//     const res = await parkingReservationApi.cancel(arrID);
//     return res.data;
//   },
// );

export {
  getReservationsScheduled,
  createReservation,
  getReservationsCompleted,
};
