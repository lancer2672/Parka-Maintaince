import axiosClient from "./axiosClient";

const url = "/favorite";

const favoriteApi = {
  getAll: async (idUser: any) => {
    const res = await axiosClient.get(url + "/user/" + idUser);
    return res.data;
  },
  create: async (params: any) => {
    const res = await axiosClient.post(url, params);
    return res.data;
  },
  deleteOne: async (idFavorite: any) => {
    const res = await axiosClient.delete(url + "/" + idFavorite);
    return res.data;
  },
};

export default favoriteApi;
