import axiosClient from "./axiosClient";

const url = "/users";
const userApi = {
  getAllUsers: async () => {
    return await axiosClient.get(`${url}`);
  },

  getUser: async (id: String) => {
    return await axiosClient.get(`${url}/${id}`);
  },
};
export default userApi;
