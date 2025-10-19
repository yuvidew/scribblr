import { useMutation } from "@tanstack/react-query";
import { onVerifyEmail } from "../api-functions";

export const useVerifyEmail = () => {
    return useMutation({
        mutationKey : ['verify-email'],
        mutationFn : onVerifyEmail
    })
}