import axiosClient from "./axiosClient";

const authApi = {
  signInAccount: async (username: string, password: string) => {
    const res = await axiosClient.post("/auth/signin", {
      username,
      password,
    });
    return res;
  },
  resetPassword: async (newPassword: string, phoneNumber: string) => {
    return await axiosClient.patch("/auth/reset-password", {
      newPassword,
      phoneNumber,
    });
  },
};
export default authApi;
