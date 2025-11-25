import Toast from "react-native-toast-message";
import { api_end_points } from "../lib/api_end_point"
import axios, { isAxiosError } from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../lib/api-config";
import { ArticleResponse } from "../types/type";

export const getArticleById = async (id: string) => {
    const user_id = await AsyncStorage.getItem("user_profile_id");
    try {
        const { data, status } = await api.get<ArticleResponse>(`${api_end_points.get_article_by_id}/${id}?user_id=${user_id}`);


        if (status === 200) {
            return data.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("Error to get article by id profile : ", JSON.stringify(error));
            
            if (error.response?.status && [401, 404, 500].includes(error.response.status)) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                });

                return false;
            }
        };

    };
};

export const followUser = async ( user_id : number) => {
    try {
        const profile_id = await AsyncStorage.getItem("userProfile") || await AsyncStorage.getItem("user_profile_id");
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

export const onUploadImage = async (formdata: FormData) => {
    try {
        const { data, status } = await axios.post(api_end_points.upload_to_app_writer, formdata, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Custom-Header": "MyCustomValue",
                "Accept": "application/json",
            },
        });


        if (status === 200) {
            Toast.show({
                type: "success",
                text1: data.message
            })
        }

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("Error to upload image", JSON.stringify(error));
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
    }
};

export const onAddAndRemoveBookmark = async (article_id: number) => {
    const user_id = await AsyncStorage.getItem("user_profile_id");
    try {
        if (!user_id) throw new Error("Missing user id");

        const { data, status } = await api.put(api_end_points.add_remove_bookmark, {
            article_id,
            user_id
        });
        if (status === 200) {
            Toast.show({
                type: "success",
                text1: data.message
            })
        }
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("Error to get your  articles : ", JSON.stringify(error));

            if (error.response?.status && [401, 404, 500].includes(error.response.status)) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                });

                return false;
            }
        };
    }
};