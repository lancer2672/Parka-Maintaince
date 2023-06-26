import { AppVariables } from "@/config";
import axios, { AxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Credentials": "true",
    // "Access-Control-Max-Age": "OPTIONS",
  },
});

axiosClient.interceptors.request.use();
axiosClient.interceptors.response.use();

export default axiosClient;
