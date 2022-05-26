import axiosClient from "./axiosClient";

const vehicleApi = {
  create: async (vehicle: Vehicle) => {
    const res = await axiosClient.post("/user/vehicles", vehicle);
    return res;
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
    return res;
  },
  getByIdUser: async (idUser: string) => {
    const res = await axiosClient.get(`/user/vehicles/user/${idUser}`);
    return res;
  },
  delete: async (idVehicle: string) => {
    const res = await axiosClient.delete(`/user/vehicles/${idVehicle}`);
    return res;
  },
};

export default vehicleApi;
