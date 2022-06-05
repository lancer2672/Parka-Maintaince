import axiosClient from "./axiosClient";

const url = "/reservations";

const parkingReservationApi = {
  create: async (data: any) => {
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  getAllByIdUser: async (idUser: string) => {
    const res = await axiosClient.get(`${url}/user/${idUser}`);
    return res.data;
  },
};

export default parkingReservationApi;
