import axiosClient from "./axiosClient";


const procedureApi = {
  procedure: async (ticketId: any, type: string) => {
    const res = await axiosClient.post("/api/v1/ticket/procedure", {
      ticketId: ticketId,
      type: type
    });
    return res;
  },
}
export default procedureApi;