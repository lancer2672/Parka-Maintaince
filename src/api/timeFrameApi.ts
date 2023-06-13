import axiosClient from "./axiosClient";

const timeFrameApi = {
  getAll: async (idParkingLot: any) => {
    console.log("time frame api - get all");

    const res = await axiosClient.get(`/time/${idParkingLot}/time-frame`);
    console.log("time frame api - get all - response", res);
    return res;
  },
};
export default timeFrameApi;
