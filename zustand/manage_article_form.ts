import { create } from "zustand";

type FormType = {
    title: string;
    description: string;
    interest: string;
};

type StoreType = {
    form: FormType;
    setForm: (value: FormType) => void;
};

export const useStoreArticleForm = create<StoreType>()((set) => ({
    form: {
        title: "",
        description: "",
        interest: "",
    },
    setForm: (value) => set({ form: value }),
}));
