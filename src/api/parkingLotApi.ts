import axiosClient from "./axiosClient";

const parkingLotApi = {
  search: async (searchText: string) => {
    const res = await axiosClient.post("/lots/search", {
      searchText
    });
    return res;
  },
  getAll: async () => {
    return await axiosClient.get(`/lots`);
  },
};
export default parkingLotApi;
