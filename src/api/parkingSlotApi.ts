import axiosClient from "./axiosClient";

const url = "/slots";

const parkingSlotApi = {
  getAll: async (idParkingLot: string) => {
    const res = await axiosClient.get(`${url}/lots/${idParkingLot}`);
    return res.data;
  },
  getAvailableSlots:  async (start: string, end: string, date:  string, idParkingLot: string) => {
    const res = await axiosClient.get(`${url}/availability/${idParkingLot}?start=${start}&end=${end}&date=${date}`);
    return res;
  },
  getTotalSlot:  async (idParkingLot: string) => {
    const res = await axiosClient.get(`${url}/total/${idParkingLot}`);
    return res;
  },
};

export default parkingSlotApi;
