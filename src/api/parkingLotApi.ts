import axiosClient from "./axiosClient";

const parkingLotApi = {
  search: async (searchText: string) => {
    console.log("Search parkinglotAPI search text", searchText);

    const res = await axiosClient.post("/lots/search", {
      searchText,
    });
    console.log("Search parkinglotAPI response", res);
    return res;
  },
  getAll: async () => {
    console.log("getAll parkinglotAPI");

    return await axiosClient.get(`/lots`);
  },
};
export default parkingLotApi;
