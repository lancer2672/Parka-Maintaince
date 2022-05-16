import axiosClient from "./axiosClient";

const authApi = {
  signInAccount: async (email: string, password: string) => {
    const res = await axiosClient.post("auths/signin", {
      email,
      password,
    });
    return res;
  },
  resetEmail: async (username: string) => {
    return await axiosClient.post("auth/send-mail", {
      username,
    });
  },
  updatePassword: (data: any) => {
    return axiosClient.post("auth/reset-password", data);
  },
};
export default authApi;
