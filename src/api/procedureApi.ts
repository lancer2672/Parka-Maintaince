import axiosClient from "./axiosClient";

const procedureApi = {
  procedure: async (ticketId: any, type: string) => {
    console.log("procedure  api");

    // const res = await axiosClient.post("/api/v1/ticket/procedure", {
    const res = await axiosClient.post("/ticket/procedure", {
      ticketId: ticketId,
      type: type,
    });
    console.log("procedure  api - response", res);
    return res;
  },
};
export default procedureApi;
