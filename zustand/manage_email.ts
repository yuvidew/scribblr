import {create} from "zustand";

type StoreType = {
    email : string,
    setEmail : (value : string) => void
}

export const useStoreEmail = create<StoreType>()((set) => ({
    email : "",
    /**
     * @param value - New email value to persist in the store.
     */
    setEmail : (value) => set({email : value})
}))
