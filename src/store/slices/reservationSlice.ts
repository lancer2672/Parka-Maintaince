import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTimeHelper } from "@src/utils";

export type ReservationState = Partial<{
  entities: Reservation;
}>;

const initialState: ReservationState = {
  entities: {
    parkingLot: null,
    vehicle: null,
    parkingSlot: null,
    timeFrame: null,
    startTime: DateTimeHelper.getRoundUpDate(10),
    bookingDate: new Date(),
  },
};

type ReservationKey = keyof typeof initialState.entities;

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    update: (
      state: ReservationState,
      action: PayloadAction<{ field: string; value: any }>,
    ) => {
      const { field, value } = action.payload;
      // console.log({ field, value });
      // state.entities.parkingLot = value;
      state.entities[field as ReservationKey] = value;
      console.log(state.entities);
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getApplications.fulfilled, (state, { payload }) => {
    //   state.entities = payload;
    // });
    // builder.addCase(
    //   updateApplication.fulfilled,
    //   (state, { payload }: PayloadAction<Application>) => {
    //     console.log(payload);
    //     state.entities = state.entities?.map((application) =>
    //       application._id == payload._id
    //         ? { ...application, status: payload.status }
    //         : application,
    //     );
    //   },
    // );
  },
});

export const reservationActions = {
  ...reservationSlice.actions,
};

export default reservationSlice;
