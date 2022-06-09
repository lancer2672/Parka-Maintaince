import axiosClient from "./axiosClient";

const url = "/slots";

const parkingSlotApi = {
  getAll: async (idParkingLot: string) => {
    const res = await axiosClient.get(`${url}/lots/${idParkingLot}`);
    return res.data;
  },
};

export default parkingSlotApi;
