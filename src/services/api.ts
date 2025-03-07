import axios from "axios";

const API_URL = "https://y57yu3j3k2.execute-api.sa-east-1.amazonaws.com/prod/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
