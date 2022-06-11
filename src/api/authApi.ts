import axiosClient from "./axiosClient";

const authApi = {
  login: ({ email, password }: any) => {
    const url = `/auth/login`;
    return axiosClient.post(url, { email, password });
  },
  signup: ({ email, password, companyName, phoneNumber }: any) => {
    const url = `/auth/signup`;
    return axiosClient.post(url, { email, password, companyName, phoneNumber });
  },
  verify: (accessToken: any) => {
    const url = "/auth/verify";
    return axiosClient.post(url, { accessToken });
  },
};
export default authApi;
