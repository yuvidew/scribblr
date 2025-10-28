
import { useMutation } from "@tanstack/react-query"
import { onUploadImage } from ".."
import { useStoreImage } from "../../zustand/manage_image";

type UploadedImage = {
    id: string;
    mimeType: string;
    sizeOriginal: number;
    url: string;
};


export const useUploadProfileImage = () => {
    const {setImage} = useStoreImage()
    return useMutation({
        mutationKey : ["upload-image"],
        mutationFn : onUploadImage,
        onSuccess : (data: UploadedImage) => {
            setImage(data.url);
        }
    })
}