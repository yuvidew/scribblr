import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onCreateArticle } from "../api-function"
import { useStoreImage } from "../../../zustand/manage_image";

export const useCreateArticle = () => {
    const {setImage} = useStoreImage();
    const queryClient = useQueryClient(); 
    return useMutation({
        mutationKey : ["create-article"],
        mutationFn : onCreateArticle,

        onSuccess : (data) => {
            queryClient.invalidateQueries({ queryKey : ["get-article-by-id"] });
            setImage("");
        }
    })
}