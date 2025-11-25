import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { getArticleById } from "..";

export const useGetArticleById = () => {
    const { id } = useLocalSearchParams();
    return useQuery({
        queryKey : ["get-article-by-id"],
        queryFn : () => getArticleById(id as string)
    })
}
