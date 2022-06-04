import axiosClient from "./axiosClient";

const url: string = "/time";

const timeFrameApi = {
  getAll: (idParkingLot: any) => {
    return axiosClient.get(url + `/${idParkingLot}/time-frame`);
  },

  create: async (data: any) => {
    return await axiosClient.post(url, data);
  },
  update: async (idParkingLot: any, data: any) => {
    return await axiosClient.patch(`${url}/${idParkingLot}`, data);
  },

  // getOne: (id: any) => {
  //   return axiosClient.get(`${url}/${id}`);
  // },

  // update: async (id: string, data: any) => {
  //   return await axiosClient.patch(`${url}/${id}`, data);
  // },

  // delete: async (id: string) => {
  //   return await axiosClient.delete(`${url}/${id}`);
  // },
};
export default timeFrameApi;
