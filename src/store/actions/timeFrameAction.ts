import { createAsyncThunk } from "@reduxjs/toolkit";
import { timeFrameApi } from "@src/api";

const getTimeFrames = createAsyncThunk(
  "timeFrame/get",
  async (id: string) => {
    const res = await timeFrameApi.getAll(id);
    return res.data.data;
  },
);

export { getTimeFrames };
