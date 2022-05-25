import { RootState } from "./";

export const selectUser = (state: RootState) => state.user.data;
export const selectVehicles = (state: RootState) => state.vehicles;
