import { useMutation, useQueryClient } from "@tanstack/react-query"
import {  onDeleteArticleById } from "../api-function"
import { router, useLocalSearchParams } from "expo-router";

export const useDeleteArticleById = () => {
    const { id } = useLocalSearchParams();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey : ["delete-article-by-id"],
        mutationFn : () => onDeleteArticleById(id as string),

        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey : ["get-articles"]});
            router.replace("/(root)/(tabs)/create_article");

        }
    })
}