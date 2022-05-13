import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use();

axiosClient.interceptors.response.use();

export default axiosClient;
