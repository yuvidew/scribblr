import { useMutation } from "@tanstack/react-query"
import { onVerifyOTP } from "../api-functions"

export const useVerifyOTP = () => {
    return useMutation({
        mutationKey : ["verify-otp"],
        mutationFn : onVerifyOTP
    })
}