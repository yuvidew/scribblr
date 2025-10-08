import {create} from "zustand";

type StoreType = {
    country: string
    setCountry: (value : string) => void
}

export const useStoreCountry = create<StoreType>()((set) => ({
    country : "",
    setCountry : (value) => set({ country : value })
}))
