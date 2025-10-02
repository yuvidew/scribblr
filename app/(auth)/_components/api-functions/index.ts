import axios, { isAxiosError } from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Country, CountryListType } from "../../../../types/type";
import Toast from "react-native-toast-message";

const api = axios.create();

api.interceptors.request.use(async (config) => {

    // const token = await AsyncStorage.getItem("accessToken");
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    config.headers["Content-Type"] = "application/json";
    return config;
});


export const getCountriesList = async () => {
    try {
        const result = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,latlng,maps")

        const data: CountryListType[] = result.data.map((country: Country) => ({
            name: country.name.common,
            flag: country.flags,
            coordinates: country.latlng,
            value: country.name.common,
            openStreetMap: country.maps?.openStreetMaps
        }));

        // console.log("the data" , data.length);

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("Error to get trips", error?.response?.data.message);
            if (error.response?.status === 401) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })

                throw error
            } else if (error.response?.status === 404) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })

                throw error
            } else if (error.response?.status === 500) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })

                throw error
            } else {
                Toast.show({
                    type: "error",
                    text1: error?.response?.data.message
                })

                throw error
            }
        }
        throw error;
    }
}