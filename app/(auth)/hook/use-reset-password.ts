import { useMutation } from "@tanstack/react-query"
import { onResetPassword } from "../api-functions"

export const useResetPassword = () => {
    return useMutation({
        mutationKey : ["reset-password"],
        mutationFn : onResetPassword
    })
}