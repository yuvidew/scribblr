import { ArticleResponse, PublishedArticleResponse } from "../../../types/type";
import api from "../../..//lib/api-config"
import { api_end_points } from "../../../lib/api_end_point"
import { isAxiosError } from "axios";
import Toast from "react-native-toast-message";

export const getArticleById = async (id: string) => {
    try {
        const { data, status } = await api.get<ArticleResponse>(`${api_end_points.get_article_by_id}/${id}`);


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

export const onPublishedArticle = async (id: string) => {
    try {
        const { data, status } = await api.put<PublishedArticleResponse>(`${api_end_points.publish_article}/${id}`);

        if (status === 200) {
            Toast.show({
                type: "success",
                text1: data.message
            })
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
    }
}

export const onDeleteArticleById = async (id : string) => {
    try {
        const {data, status} = await api.delete(`${api_end_points.delete_article_by_id}/${id}`);

        if (status === 200) {
            Toast.show({
                type: "success",
                text1: data.message
            });
        };
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("Error to delete article by id  : ", JSON.stringify(error));


            if (error.response?.status && [401, 404, 500].includes(error.response.status)) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                });

                return false;
            };
        };
    };
};

