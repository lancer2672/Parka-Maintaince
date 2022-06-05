import axiosClient from "./axiosClient";

const url = "/lots";

const parkingLotApi = {
  search: async (searchText: string) => {
    const res = await axiosClient.post(`${url}/search`, {
      searchText,
    });
    return res;
  },
  getAll: async () => {
    return await axiosClient.get(url);
  },
  getOne: async (idParkingLot: string) => {
    return await axiosClient.get(`${url}/${idParkingLot}`);
  },
};

export default parkingLotApi;
