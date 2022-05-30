import axiosClient from "./axiosClient";

const userApi = {
  getAll: async () => {
    const res = await axiosClient.get("/users");
    return res;
  },
  getUserById: async (id: string) => {
    const res = await axiosClient.get(`/users/${id}`);
    return res;
  },
  checkDuplicatePhone: async (phoneNumber: any) => {
    const res = await axiosClient.post("/users/check-phone", { phoneNumber });
    return res.data;
  },
  createUser: async (user: any) => {
    const res = await axiosClient.post("/users", user);
    return res;
  },

  updateUser: async (updatedUser: User) => {
    return await axiosClient.patch(`/users/${updatedUser.idUser}`, updatedUser);
  },

  deleteUser: async (id: string) => {
    const res = await axiosClient.delete(`/users/${id}`);
    return res;
  },
};

export default userApi;
