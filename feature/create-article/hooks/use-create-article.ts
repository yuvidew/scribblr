import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onCreateArticle } from "../api-function"
import { useStoreImage } from "../../../zustand/manage_image";
import { router } from "expo-router";

export const useCreateArticle = () => {
    const {setImage} = useStoreImage();
    const queryClient = useQueryClient(); 
    return useMutation({
        mutationKey : ["create-article"],
        mutationFn : onCreateArticle,

        onSuccess : (data) => {
            queryClient.invalidateQueries({ queryKey : ["get-article-by-id"] });

            router.push(`/(root)/created-article-details/${data.article_id}?is_publishable=yes`);

            setImage("");
        }
    })
}