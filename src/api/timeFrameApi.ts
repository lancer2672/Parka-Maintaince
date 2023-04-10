import axiosClient from "./axiosClient";

const timeFrameApi = {
  getAll: async (idParkingLot: any) => {
    console.log("Api - timeFrameApi - getAll - idParkingLot",idParkingLot);
    // const res = await axiosClient.get(`/time/${idParkingLot}/time-frame`);
    const res = await axiosClient.get(`/time-frame/get-one/${idParkingLot}`);
    console.log("Api - timeFrameApi - getAll", res);
    return res;
  },
};

export default timeFrameApi;
