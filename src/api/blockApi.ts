import axiosClient from "./axiosClient";

const url: string = "/blocks";

const blockApi = {
  getAll: (idParkingLot: any) => {
    return axiosClient.get(url + `?idParkingLot=${idParkingLot}`);
  },

  create: async (data: any) => {
    return await axiosClient.post(url, data);
  },

  getOne: (id: any) => {
    return axiosClient.get(`${url}/${id}`);
  },

  update: async (idParkingLot: any, data: any) => {
    return await axiosClient.patch(`${url}/${idParkingLot}`, data);
  },

  delete: async (id: string) => {
    return await axiosClient.delete(`${url}/${id}`);
  },
};
export default blockApi;
