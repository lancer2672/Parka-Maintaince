import axiosClient from "./axiosClient";

const url = "/favorite";

const favoriteApi = {
  getAll: async (idUser: any) => {
    console.log("Api - favoriteApi - getAll");
    const res = await axiosClient.get(url + "/user/" + idUser);
    console.log("Api - favoriteApi - getAll",res);
    return res.data;
  },
  create: async (params: any) => {
    console.log("Api - favoriteApi - create");
    const res = await axiosClient.post(url, params);
    console.log("Api - favoriteApi - create",res);
    return res.data;
  },
  deleteOne: async (idFavorite: any) => {
    console.log("Api - favoriteApi - deleteOne");
    const res = await axiosClient.delete(url + "/" + idFavorite);

    console.log("Api - favoriteApi - deleteOne",res);

    return res.data;
  },
};

export default favoriteApi;
