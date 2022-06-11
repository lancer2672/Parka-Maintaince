import axiosClient from "./axiosClient";

const url = "/reservations";

const reservationApi = {
  getByParkingLot: async (idParkingLot: string) => {
    const res = await axiosClient.get(`${url}/lot/${idParkingLot}`);
    return res.data;
  },
};

export default reservationApi;
