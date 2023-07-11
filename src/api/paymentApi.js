import axiosClient from "./axiosClient";
// const url = "/slots";
const url = "/payment";

export const paymentApi = {
  create: async (data) => {
    console.log("create payment-props", { data });
    const res = await axiosClient.post(`${url}/create/`, data);
    console.log("create payment", res);
    return res;
  },
};
