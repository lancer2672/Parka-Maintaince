import axiosClient from "./axiosClient";
const userApi = {
  getAll: async () => {
    const res = await axiosClient.get("/users");
    return res;
  },
  getUserById: async (id: string) => {
    // const res = await axiosClient.get(`/users/${id}`);
    const res = await axiosClient.get(`/user/${id}`);
    return res;
  },
  checkDuplicatePhone: async (phoneNumber: any) => {
    const res = await axiosClient.post("/user/check-phone", { "phone_number":phoneNumber });
    console.log("requested",res);
    return res.data;
  },
  createUser: async (user: any) => {
    // const res = await axiosClient.post("/users", user);
    console.log("service - create User", user);
    const res = await axiosClient.post("/user/create", user);
    console.log("response",res);
    return res;
  },

  updateUser: async (updatedUser: User) => {
    // return await axiosClient.patch(`/users/${updatedUser.idUser}`, updatedUser);
    return await axiosClient.patch(`/user/update/${updatedUser.idUser}`, updatedUser);
  },

  deleteUser: async (id: string) => {
    const res = await axiosClient.delete(`/user/${id}`);
    return res;
  },
};

export default userApi;
