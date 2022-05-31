import axiosClient from "./axiosClient";

const timeFrameApi = {
  getAll: async (idParkingLot: any) => {
    const res = await axiosClient.get(`/time/${idParkingLot}/time-frame`);
    return res;
  },
};

export default timeFrameApi;
