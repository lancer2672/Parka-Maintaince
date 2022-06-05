import { RootState } from "./";

export const selectUser = (state: RootState) => state.user.data;
export const selectVehicles = (state: RootState) => state.vehicles.entities;
export const selectBooking = (state: RootState) => state.booking.entities;
export const selectTimeFrames = (state: RootState) => state.timeFrame.entities;
export const selectReservations = (state: RootState) =>
  state.reservation.entities;
