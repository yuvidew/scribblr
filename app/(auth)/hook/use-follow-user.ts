import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "../api-functions";

export const useFollowUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey : ["follow-user"],
        mutationFn : followUser,
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey : ["get-all-users"] })
        }
    });
};
