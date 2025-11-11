import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onAddAndRemoveBookmark } from "..";

export const useAddAndRemoveBookmarks = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (article_id: number) => onAddAndRemoveBookmark(article_id),
        onSuccess: () => {

            const keys = [
                ["get-my-bookmarks-article"],
                ["get-recent-article"],
                ["get-your-article"],
                ["get-article-by-id"],
            ];
            keys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
        }
    });
}