import axiosClient from "./axiosClient";

const vehicleApi = {
  create: async (vehicle: Vehicle) => {
    const res = await axiosClient.post("/user/vehicles", vehicle);
    return res.data;
  },
  getById: async (idVehicle: string) => {
    const res = await axiosClient.get(`/user/vehicles/${idVehicle}`);
    return res;
  },
  update: async (vehicle: Vehicle) => {
    const res = await axiosClient.patch(
      `/user/vehicles/${vehicle.idVehicle}`,
      vehicle,
    );
    return res.data;
  },
  getByIdUser: async (idUser: string) => {
    const res = await axiosClient.get(`/user/vehicles/user/${idUser}`);
    return res.data;
  },
};

export default vehicleApi;
