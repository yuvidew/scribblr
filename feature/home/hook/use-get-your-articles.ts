import { useQuery } from "@tanstack/react-query"
import { getGetYourArticle } from "../api-function"

export const useGetYourArticles = () => {
    return useQuery({
        queryKey : ["get-your-article"],
        queryFn : getGetYourArticle
    })
}