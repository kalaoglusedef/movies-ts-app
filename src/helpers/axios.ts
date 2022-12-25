import axios from "axios";

const api = axios.create({
  baseURL: "https://omdbapi.com",
});

api.interceptors.request.use((config) => {
  config.params = {
    apikey: "56025b0c",
    type:"movie",
    ...config.params,
  };
  return config;
});

export default api;
