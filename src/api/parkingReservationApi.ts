import axiosClient from "./axiosClient";
const url = "/reservation";
const parkingReservationApi = {
  getById: async (idParkingReservation: string) => {
    return await axiosClient.get(`${url}/${idParkingReservation}`)
  }
};
export default parkingReservationApi;
