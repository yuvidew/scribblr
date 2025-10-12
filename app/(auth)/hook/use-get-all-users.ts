import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "../_components/api-functions"

export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ["get-all-users"],
        queryFn: getAllUsers,
    })
}