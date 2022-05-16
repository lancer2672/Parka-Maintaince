import axiosClient from "./axiosClient";

const userApi = {
  getAll: async () => {
    const res = await axiosClient.get("/users");
    return res;
  },
  getUserById: async (id) => {
    const res = await axiosClient.get(`/users/${JSON.parse(id)}`);
    return res;
  },
  checkDuplicatePhone: async (phoneNumber) => {
    const res = await axiosClient.post("users/check-phone", { phoneNumber });
    return res.data;
  },
  createUser: async (user) => {
    const res = await axiosClient.post("/users", user);
    return res;
  },

  updateUser: async (updatedUser) => {
    return await axiosClient.patch(`/users/${updatedUser.idUser}`, updatedUser);
  },

  deleteUser: async (id) => {
    const res = await axiosClient.delete(`/users/${id}`);
    return res;
  },
};

export default userApi;
