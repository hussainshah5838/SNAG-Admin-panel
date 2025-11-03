import axios from "axios";
const base = import.meta.env.VITE_API_URL || "/api";
const client = axios.create({ baseURL: base });

client.interceptors.response.use(
  (r) => r,
  (e) => {
    const msg = e?.response?.data?.message || e.message || "Request failed";
    return Promise.reject(new Error(msg));
  }
);

export default client;
