import axiosClient from "./axiosClient";

// const url = "/slots";
const url = "/parking-slot";

const parkingSlotApi = {
  getAll: async (idParkingLot: string) => {
    // const res = await axiosClient.get(`${url}/lots/${idParkingLot}`);
    console.log("Api - parkingSlotApi - getAll - prop",idParkingLot);
    const res = await axiosClient.get(`${url}/lots/${idParkingLot}`);

    console.log("Api - parkingSlotApi - getAll",res);

    return res.data;
  },
  getAvailableSlots:  async (start: string, end: string, date:  string, idParkingLot: string) => {
    console.log("Api - parkingSlotApi - getAvailableSlots-props",start, end,date,idParkingLot );
    // const res = await axiosClient.get(`${url}/availability/${idParkingLot}?start=${start}&end=${end}&date=${date}`);
    const res = await axiosClient.get(`${url}/available`); 
    console.log("Api - parkingSlotApi - getAvailableSlots",res);

    return res;
  },
  getTotalSlot:  async (idParkingLot: string) => {

    console.log("Api - parkingSlotApi - getTotalSlot-props",idParkingLot);
    const res = await axiosClient.get(`${url}/total/${idParkingLot}`);
    console.log("Api - parkingSlotApi - getTotalSlot",res);

    return res;
  },
};

export default parkingSlotApi;
