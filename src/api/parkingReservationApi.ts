import axiosClient from "./axiosClient";
const parkingReservationApi = {
  getById: async (idTicket: string) => {
    console.log("parking reservation api - get by id", idTicket);
    return await axiosClient.get(
      // "/api/v1/ticket/get-one-with-extend/" + idTicket,
      // "/get-one-with-extend/" + idTicket,
      "/ticket/get-one-with-extend/" + idTicket,
    );
  },
};
export default parkingReservationApi;
