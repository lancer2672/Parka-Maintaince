import axiosClient from "./axiosClient";

const url: string = "/lots";

const parkingLotApi = {
  getAll: (id: any) => {
    return axiosClient.get(`${url}/company/${id}`);
  },

  create: async (data: any) => {
    return await axiosClient.post(url, data);
  },

  getOne: (id: any) => {
    return axiosClient.get(`${url}/${id}`);
  },

  update: async (id: string, data: any) => {
    return await axiosClient.patch(`${url}/${id}`, data);
  },

  delete: async (id: string) => {
    return await axiosClient.delete(`${url}/${id}`);
  },
};
export default parkingLotApi;
