import axiosClient from "./axiosClient";
const url = "/parking-slip";
const parkingSlipApi = {
  getByIdParkingReserver: async (idParkingReservation: string) => {
    return await axiosClient.get(`${url}/reservation/${idParkingReservation}`)
  }
};
export default parkingSlipApi;
