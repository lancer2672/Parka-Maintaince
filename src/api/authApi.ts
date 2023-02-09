import axiosClient from "./axiosClient";

const authApi = {
  login: ({ email, password }: any) => {
    const url = `/api/merchant/company/login`;
    return axiosClient.post(url, { email, password });
  }
};
export default authApi;
