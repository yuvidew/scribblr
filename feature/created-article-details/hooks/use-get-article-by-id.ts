import { useQuery } from "@tanstack/react-query"
import { getArticleById } from "../api-function"
import { useLocalSearchParams } from "expo-router";

export const useGetArticleById = () => {
    const { id } = useLocalSearchParams();
    return useQuery({
        queryKey : ["get-article-by-id"],
        queryFn : () => getArticleById(id as string)
    })
}
