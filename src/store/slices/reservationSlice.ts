import { Spinner } from "@nghinv/react-native-loading";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createReservation,
  getReservations,
} from "../actions/reservationAction";

export type ReservationState = Partial<{
  entities: Reservation[];
}>;

const initialState: ReservationState = {
  entities: [],
};

const actions = [createReservation, getReservations];

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers(builder) {
    actions.forEach((thunk) =>
      builder.addCase(thunk.pending, () => {
        Spinner.show();
      }),
    );
    actions.forEach((thunk) =>
      builder.addCase(thunk.rejected, () => {
        Spinner.hide();
      }),
    );
    builder.addCase(
      createReservation.fulfilled,
      (state, { payload }: PayloadAction<Reservation>) => {
        state.entities.push(payload);
        Spinner.hide();
      },
    );
    builder.addCase(
      getReservations.fulfilled,
      (state, { payload }: PayloadAction<Reservation[]>) => {
        state.entities = payload;
        Spinner.hide();
      },
    );
  },
});

export const reservationActions = {
  ...reservationSlice.actions,
  createReservation,
  getReservations,
};

export default reservationSlice;
