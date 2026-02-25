import axios from "axios";
import { toast } from "vue-sonner";

const apiClient = axios.create({
  baseURL: "https://cards-marketplace-api.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, 
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401) {
      localStorage.removeItem("token");
      if (!window.location.pathname.includes("/login") && !window.location.pathname.includes("/register")) {
        window.location.href = "/login";
      }
    } else if (status === 403) {
      toast.error("Você não tem permissão para realizar esta ação.");
    } else if (status >= 500) {
      toast.error("Erro no servidor. Tente novamente em instantes.");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
