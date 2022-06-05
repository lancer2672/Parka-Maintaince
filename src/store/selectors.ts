import { RootState } from "./";

export const selectUser = (state: RootState) => state.user.data;
export const selectVehicles = (state: RootState) => state.vehicles.entities;
export const selectReservation = (state: RootState) =>
  state.reservation.entities;
export const selectTimeFrames = (state: RootState) => state.timeFrame.entities;
