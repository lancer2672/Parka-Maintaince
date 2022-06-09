import axiosClient from "./axiosClient";

const url = '/procedure'

const procedureApi = {
  checkIn: async (idParkingReservation: any) => {
    const res = await axiosClient.put(`${url}/check-in`, {
      idParkingReservation
    });
    return res;
  },
  checkOut: async (data: any) => {
    return await axiosClient.put(`${url}/check-out`, data);
  },
}
export default procedureApi;