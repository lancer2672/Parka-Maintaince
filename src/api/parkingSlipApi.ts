import axiosClient from "./axiosClient";
const url = "/parking-slip";
const parkingSlipApi = {
  getByIdParkingReservation: async (idParkingReservation: string) => {
    console.log("parking slip  api - get by id");

    return await axiosClient.get(`${url}/reservation/${idParkingReservation}`);
  },
};
export default parkingSlipApi;
