import { createAsyncThunk } from "@reduxjs/toolkit";
import { parkingSlotApi } from "@src/api";

const getAvailableSlots = createAsyncThunk(
  "availableSlot/get",
  async (data: any) => {
    const res = await parkingSlotApi.getAvailableSlots(data.start, data.end, data.date, data.idParkingLot);
    return res.data.data;
  },
);

export { getAvailableSlots };
