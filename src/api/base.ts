import axios from "axios";

import { API_URL } from "@/configs/serveo";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

export default axiosInstance;
