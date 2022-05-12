import axiosClient from "./axiosClient";

const authApi = {
  login: ({ email, password }: any) => {
    const url = `/auth/login`;
    return axiosClient.post(url, { email, password });
  },
  verify: (accessToken: any) => {
    const url = "/auth/verify";
    return axiosClient.post(url, { accessToken });
  },
};
export default authApi;
