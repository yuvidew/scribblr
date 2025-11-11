import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../lib/api-config"
import { ArticlesResponse } from "../../../types/type";
import { api_end_points } from "../../../lib/api_end_point";
import { isAxiosError } from "axios";
import Toast from "react-native-toast-message";

export const getGetRecentArticle = async () => {
    try {
        const { data, status } = await api.get<ArticlesResponse>(`${api_end_points.get_recent_articles}`)



        if (status === 200) {
            return data.articles ?? [];
        }
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("Error to get articles : ", JSON.stringify(error));

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

export const getGetYourArticle = async () => {
    const user_id = await AsyncStorage.getItem("user_profile_id");
    try {
        if (!user_id) throw new Error("Missing user id");
        const { data, status } = await api.get<ArticlesResponse>(`${api_end_points.get_your_articles}/${user_id}`)


        console.log("the response data" , data);

        if (status === 200) {
            return data.articles ?? [];
        }
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

export const getMyBookmarksArtilce = async () => {
    const user_id = await AsyncStorage.getItem("user_profile_id");
    try {
        if (!user_id) throw new Error("Missing user id");
        const { data, status } = await api.get<ArticlesResponse>(`${api_end_points.get_my_bookmarks_articles}/${user_id}`)



        if (status === 200) {
            return data.articles ?? [];
        }
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("Error to get my bookmarks articles : ", JSON.stringify(error));

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