import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import { useMemo } from "react";

const useAxios = () => {
  const { authToken } = useAuth();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:3000",
    });

    instance.interceptors.request.use((config) => {
      if (authToken) {
        config.headers.Authorization = authToken;
      }
      return config;
    });

    return instance;
  }, [authToken]);

  return axiosInstance;
};

export default useAxios;
