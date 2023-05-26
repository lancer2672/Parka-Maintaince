
import axiosClient from "./axiosClient";

const url = "/reservations";

const parkingReservationApi = {
  create: async (data: any) => {
    console.log("Api - parkingReservationApi - create");
    const res = await axiosClient.post(url, data);

    console.log("Api - parkingReservationApi - create",res);

    return res.data;
  },
  cancel: async (listId: any) => {
    console.log("Api - parkingReservationApi - cancel");

    const res = await axiosClient.put(`${url}/cancel`, {listId});
    console.log("Api - parkingReservationApi - cancel",res);

    return res.data;
  },
  getAllByIdUser: async (idUser: string, status: string) => {
    console.log("Api - parkingReservationApi - getAllByIdUser");

    const res = await axiosClient.get(`${url}/user/${idUser}?status=${status}`);
    console.log("Api - parkingReservationApi - getAllByIdUser",res);

    return res.data;
  },
};

export default parkingReservationApi;
