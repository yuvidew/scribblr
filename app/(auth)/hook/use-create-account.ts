import { useMutation } from "@tanstack/react-query"
import { onCreateAccount } from "../_components/api-functions"

export const useCreateAccount = () => {
    return useMutation({
        mutationKey : ["create-account"],
        mutationFn : onCreateAccount
    })
}