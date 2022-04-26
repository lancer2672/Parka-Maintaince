import { ParkingLot } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteParkingLot, getAllParkingLots } from "@/store/actions/parkingLotActions";

export type ParkingLotState = {
  parkingLots: Array<ParkingLot>;
  loading: boolean;
  error: any;
};

const initialState: ParkingLotState = {
  parkingLots: [],
  loading: false,
  error: null,
};

const parkingLotSlice = createSlice({
  name: "parkingLot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllParkingLots.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllParkingLots.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.parkingLots = payload;
      })
      .addCase(getAllParkingLots.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteParkingLot.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteParkingLot.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.parkingLots = state.parkingLots.map((e) =>
          e.idParkingLot == payload.idParkingLot ? payload : e,
        );
      })
      .addCase(deleteParkingLot.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default parkingLotSlice.reducer;
