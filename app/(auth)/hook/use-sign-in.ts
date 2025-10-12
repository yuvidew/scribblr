import { useMutation } from "@tanstack/react-query"
import { onSignin } from "../_components/api-functions"

export const useSignIn = () => {
    return useMutation({
        mutationKey: ['sign-in'],
        mutationFn: onSignin 
    })
}