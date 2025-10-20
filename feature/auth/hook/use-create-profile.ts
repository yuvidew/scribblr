import { useMutation } from "@tanstack/react-query"
import { onCreateProfile } from "../api-functions"

export const  useCreateProfile = () => {
    return useMutation({
        mutationKey : ["create-profile"],
        mutationFn : onCreateProfile
    })
}