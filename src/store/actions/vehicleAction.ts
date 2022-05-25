import { createAsyncThunk } from "@reduxjs/toolkit";
import vehicleApi from "@src/api/vehicleApi";

const getVehicleAction = createAsyncThunk(
  "vehicles/get",
  async (idUser: string) => {
    const res = await vehicleApi.getByIdUser(idUser);
    return res.data.data;
  },
);

const createVehicleAction = createAsyncThunk(
  "vehicles/create",
  async (vehicle: Vehicle) => {
    try {
      const res = await vehicleApi.create(vehicle);
      if (res.data.data) {
        return res.data.data;
      }
    } catch (error: any) {
      return { errorMessage: error.message };
    }
  },
);

export { createVehicleAction, getVehicleAction };
