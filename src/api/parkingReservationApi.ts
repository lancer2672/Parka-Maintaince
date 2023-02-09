import axiosClient from "./axiosClient";
const parkingReservationApi = {
  getById: async (idTicket: string) => {
    return await axiosClient.get("/api/v1/ticket/get-one-with-extend/" + idTicket)
  }
};
export default parkingReservationApi;
