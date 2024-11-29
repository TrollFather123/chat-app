import axios from "axios";

const baseURL = process.env.NEXT_APP_BASE_URL;

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
