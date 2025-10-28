import { create } from "zustand";

type StoreType = {
    image : string,
    setImage : (value: string) => void;
};

export const useStoreImage = create<StoreType>()((set) => ({
    image : "",
    setImage : (value) => set({image : value})
}))