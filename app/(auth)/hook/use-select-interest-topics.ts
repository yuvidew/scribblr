import { useMutation } from "@tanstack/react-query"
import { onSelectInterestTopic } from "../_components/api-functions"

export const useSelectInterestTopics = () => {
    return useMutation({
        mutationKey : ["select-interest-topics"],   
        mutationFn : onSelectInterestTopic  
    })
}