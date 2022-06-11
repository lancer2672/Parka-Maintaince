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
  updatePassword: (idCompany: any, password: string, newPassword: string) => {
    const url = `/auth/password/${idCompany}`;
    return axiosClient.patch(url, { password: password, newPassword: newPassword });
  },
  update: (idCompany: any, data: any) => {
    const url = `/auth/${idCompany}`;
    return axiosClient.patch(url, data);
  },
};
export default authApi;
