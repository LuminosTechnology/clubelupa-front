import axios from "axios";
import { getToken } from "./auth-service";

// const API_URL =
//   "https://y57yu3j3k2.execute-api.sa-east-1.amazonaws.com/prod/api";
const API_URL = "https://y57yu3j3k2.execute-api.sa-east-1.amazonaws.com/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
