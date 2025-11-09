import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create();

api.interceptors.request.use(async (config) => {

    const token = await AsyncStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers = config.headers ?? {};
    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    } else {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

export default api;