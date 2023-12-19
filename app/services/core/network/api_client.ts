import axios from "axios";
const BASE_URL = "https://profile-card-api.vercel.app";

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(function (config) {
  const data = localStorage.getItem("auth");
  if (data) {
    const storage = JSON.parse(data);
    config.headers.Authorization = storage.token
      ? `Bearer ${storage.token}`
      : null;
  }
  return config;
});
