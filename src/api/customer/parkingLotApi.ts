import axiosClient from "../axiosClient";

const parkingLotApi = {
  search: async (searchText: string) => {
    const res = await axiosClient.post("customer/lots/search", {
      searchText
    });
    return res;
  },
  getAll: async () => {
    return await axiosClient.get(`customer/lots`);
  },
};
export default parkingLotApi;
