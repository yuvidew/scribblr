import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "..";


export const useFollowUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey : ["follow-user"],
        mutationFn : followUser,
        onSuccess : () => {
            const keys = [
                ["get-all-users"],
                ["get-article-by-id"],
            ];

            keys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
        }
    });
};
