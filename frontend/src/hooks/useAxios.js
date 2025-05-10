import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
  const { authToken, setAuthToken } = useAuth();
  const navigate = useNavigate();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      withCredentials: true,
    });

    instance.interceptors.request.use((config) => {
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const res = await axios.post(
              import.meta.env.VITE_API_URL + "/refresh",
              {},
              { withCredentials: true }
            );

            const newAccessToken = res.data.accessToken;
            setAuthToken(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            console.error(refreshError);
            navigate("/login");
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [authToken, setAuthToken]);

  return axiosInstance;
};

export default useAxios;
