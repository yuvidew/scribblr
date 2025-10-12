import axios, { isAxiosError } from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Country, CountryListType, SignupFormType, UserType } from "../../../../types/type";
import Toast from "react-native-toast-message";
import { api_end_points } from "../../../../lib/api_end_point";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create();

api.interceptors.request.use(async (config) => {

    // const token = await AsyncStorage.getItem("accessToken");
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    config.headers = config.headers ?? {};
    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    } else {
        config.headers["Content-Type"] = "application/json";
    }
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

/**
 * Handles creating the user profile via the API.
 * @param formdata multipart payload containing profile details.
 */
export const onCreateProfile = async (formdata: FormData) => {
    try {
        const { data, status } = await api.post(api_end_points.create_profile_api, formdata, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (status === 201) {
            Toast.show({
                type: "success",
                text1: data.message
            })

            await AsyncStorage.setItem("userProfile", JSON.stringify(data.profile_id));

            return true
        }
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("Error to Create profile", error);
            if (error.response?.status === 401) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })

                return false
            } else if (error.response?.status === 404) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })

                return false
            } else if (error.response?.status === 500) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })

                return false
            } else {
                Toast.show({
                    type: "error",
                    text1: error?.response?.data.message
                })

                return false
            }
        }

        return false
    }
}



/**
 * Attempts to register a new user account.
 * @param form submitted signup payload.
 */
export const onCreateAccount = async (form : SignupFormType) => {
    try {
        const profile_id = await AsyncStorage.getItem("userProfile");
        const { data, status } = await api.post(api_end_points.signup_api, {...form, profile_id : Number(profile_id)});   
        if (status === 201) {
            Toast.show({
                type: "success",
                text1: data.message
            })
            return true
        }
        return false
    }   catch (error) {
        if (isAxiosError(error)) {
            console.log("Error to Create account", error);
            if (error.response?.status === 400) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })  
                return false
            } else if (error.response?.status === 500) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })  
                return false
            }
            else {
                Toast.show({
                    type: "error",
                    text1: error?.response?.data.message
                })
                return false
            }
        }
        return false
    }
}

export const onSelectInterestTopic = async ( topics: string[]) => {
    try {
        const profile_id = await AsyncStorage.getItem("userProfile");
        const { data, status } = await api.post(api_end_points.select_interest_topic_api, { user_id : Number(profile_id),  topics });

        if (status === 201) {
            Toast.show({
                type: "success",
                text1: data.message
            })
            return true
        }
        return false
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("Error to Select interest topic", error);
            if (error.response?.status === 400) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })
                return false
            } else if (error.response?.status === 500) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })
                return false
            }
            else {
                Toast.show({
                    type: "error",
                    text1: error?.response?.data.message
                })
                return false
            }
        }
        return false
    }
}

export type GetAllUsersResponse = {
    code : number,
    users : UserType[]
}

export const getAllUsers = async (): Promise<UserType[]> => {
    try {
        const profile_id = await AsyncStorage.getItem("userProfile");
        const { data, status } = await api.get<GetAllUsersResponse>(`${api_end_points.get_all_user_api}/${profile_id}`);


        if (status === 200) {
            return data.users ?? [];
        }
        return [];
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("Error to Get all users", error);
            if (error.response?.status === 400) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })
                return [];
            } else if (error.response?.status === 500) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })
                return [];
            } else {
                Toast.show({
                    type: "error",
                    text1: error?.response?.data.message
                })
                return [];
            }
        }
        return [];
    }
}


export const followUser = async ( user_id : number) => {
    try {
        const profile_id = await AsyncStorage.getItem("userProfile");
        const { data, status } = await api.post(api_end_points.follow_user_api, { user_profile_id: profile_id, following_profile_id : Number(user_id) });
        if (status === 200) {
            Toast.show({
                type: "success",
                text1: data.message
            })
            
        }   
        
    } catch (error) {

        if (isAxiosError(error)) {
            console.log("Error to Follow user", error);
            if (error.response?.status === 400) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })
                
            } else if (error.response?.status === 500) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })
                
            }
        }
        
    }
}