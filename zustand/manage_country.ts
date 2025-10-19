import {create} from "zustand";

type StoreType = {
    country: string
    setCountry: (value : string) => void
}

export const useStoreCountry = create<StoreType>()((set) => ({
    country : "",
    /**
     * @param value - New country value to persist in the store.
     */
    setCountry : (value) => set({ country : value })
}))
