import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTimeHelper } from "@src/utils";

export type BookingState = Partial<{
  entities: Booking;
}>;

const initialState: BookingState = {
  entities: {
    idParkingReservation: null,
    parkingLot: null,
    vehicle: null,
    parkingSlot: null,
    timeFrame: null,
    startTime: DateTimeHelper.getRoundUpDate(10),
    bookingDate: new Date(),
  },
};

type BookingKey = keyof typeof initialState.entities;

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    update: (
      state: BookingState,
      action: PayloadAction<{ field: string; value: any }>,
    ) => {
      const { field, value } = action.payload;
      state.entities[field as BookingKey] = value;
    },
    reset: (state: BookingState) => {
      state = initialState;
    },
  },
});

export const bookingActions = {
  ...bookingSlice.actions,
};

export default bookingSlice;
