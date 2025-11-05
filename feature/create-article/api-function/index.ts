import api from "../../../lib/api-config";
import { CreateArticleType } from "../../../types/type";
import { api_end_points } from "../../../lib/api_end_point";
import Toast from "react-native-toast-message";

import { isAxiosError } from "axios";

export const onCreateArticle = async (formData: CreateArticleType) => {

    try {
        const { data, status } = await api.post(api_end_points.create_article_api, formData);

        if (status === 201) {
            Toast.show({
                type: "success",
                text1: data.message
            });

            
            return data;
        };
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("Error to Create profile", JSON.stringify(error));
            if (error.response?.status && [401, 404, 500].includes(error.response.status)) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                });

                return false;
            } 
            // else if (error.response?.status === 404) {
            //     Toast.show({
            //         type: "error",
            //         text1: error.response.data.message
            //     });

            //     return false;
            // } else if (error.response?.status === 500) {
            //     Toast.show({
            //         type: "error",
            //         text1: error.response.data.message
            //     });

            //     return false;
            // } else {
            //     Toast.show({
            //         type: "error",
            //         text1: error?.response?.data.message
            //     });

            //     return false;
            // };
        };

        return false;
    }
}

