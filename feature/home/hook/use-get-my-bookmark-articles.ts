import { useQuery } from "@tanstack/react-query"
import { getMyBookmarksArticle } from "../api-function"

export const useGetMyBookmarkArticles = () => {
    return useQuery({
        queryKey : ["get-my-bookmarks-article"],
        queryFn : getMyBookmarksArticle
    })
}