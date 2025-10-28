import Toast from "react-native-toast-message";
import { api_end_points } from "../lib/api_end_point"
import axios, { isAxiosError } from "axios"

export const onUploadImage = async (formdata: FormData) => {
    try {
        const { data, status } = await axios.post(api_end_points.upload_to_app_writer, formdata, {
            headers: {
                "Content-Type": "multipart/form-data", 
                "Custom-Header": "MyCustomValue", 
                "Accept": "application/json",         
            },
        });


        if (status === 200) {
            Toast.show({
                type: "success",
                text1: data.message
            })
        }

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("Error to upload image", JSON.stringify(error));
            if (error.response?.status === 401) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })

                return false
            } else if (error.response?.status === 404) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })

                return false
            } else if (error.response?.status === 500) {
                Toast.show({
                    type: "error",
                    text1: error.response.data.message
                })

                return false
            } else {
                Toast.show({
                    type: "error",
                    text1: error?.response?.data.message
                })

                return false
            }
        }
    }
}