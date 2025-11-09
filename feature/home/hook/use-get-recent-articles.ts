import { useQuery } from "@tanstack/react-query"
import { getGetRecentArticle } from "../api-function"

export const useGetRecentArticle = () => {
    return useQuery({
        queryKey : ["get-recent-article"],
        queryFn : getGetRecentArticle
    })
}