import { useQuery } from "@tanstack/react-query"
import { getCountriesList } from "../api-functions"

export const useGetCountries = () => {
    return useQuery({
        queryFn : getCountriesList,
        queryKey : ["get-countries"]
    })
}