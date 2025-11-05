import { useMutation, useQueryClient } from "@tanstack/react-query"
import {  onPublishedArticle } from "../api-function"
import { useLocalSearchParams } from "expo-router";

export const usePublishArticle = () => {
    const { id } = useLocalSearchParams();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey : ["publish-article"],
        mutationFn : () => onPublishedArticle(id as string),

        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey : ["get-article-by-id"] });
        }
    })
}