import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createVehicleAction,
  getVehicleAction,
} from "../actions/vehicleAction";

type VehicleState = Partial<{
  entities: Vehicle[];
}>;

const initialState: VehicleState = {
  entities: [],
};

export const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      createVehicleAction.fulfilled,
      (state, { payload }: PayloadAction<Vehicle>) => {
        state.entities.push(payload);
      },
    );
    builder.addCase(
      getVehicleAction.fulfilled,
      (state, { payload }: PayloadAction<Vehicle[]>) => {
        state.entities = payload;
      },
    );
  },
});
