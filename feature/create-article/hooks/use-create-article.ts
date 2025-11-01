import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onCreateArticle } from "../api-function"

export const useCreateArticle = () => {
    const queryClient = useQueryClient(); 
    return useMutation({
        mutationKey : ["create-article"],
        mutationFn : onCreateArticle,

        onSuccess : (data) => {
            queryClient.invalidateQueries({ queryKey : ["get-article-by-id"] })
        }
    })
}