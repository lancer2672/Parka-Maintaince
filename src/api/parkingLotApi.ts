import axiosClient from "./axiosClient";

const url: string = "/lots";

const parkingLotApi = {
  getAll: (id: any) => {
    return axiosClient.get(`${url}/company/${id}`);
  },

  create: (data: any) => {
    return axiosClient.post(url, data);
  },

  getOne: (id: any) => {
    return axiosClient.get(`${url}/${id}`);
  },

  update: (id: string, data: any) => {
    return axiosClient.patch(`${url}/${id}`, data);
  },

  delete: (id: string) => {
    return axiosClient.delete(`${url}/${id}`);
  },
  checkNameDuplicate: (name: string) => {
    return axiosClient.post(`${url}/check-name`, { name });
  },
};
export default parkingLotApi;
