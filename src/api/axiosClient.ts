import { AppVariables } from "@/config";
import axios, { AxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/merchant",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use();
axiosClient.interceptors.response.use();

export default axiosClient;
