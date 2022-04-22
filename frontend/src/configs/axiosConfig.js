import Axios from "axios";

const baseURL = "http://localhost:4001";

const axiosInstance = Axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(async (config) => {
  config.baseURL = baseURL;
  if (config.headers) {
    try {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    } catch (e) {
      
    }
  }

  return config;
});

export default axiosInstance;
