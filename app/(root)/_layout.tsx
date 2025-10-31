import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Slot } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function RootLayout() {
    useEffect(() => {
        (async () => {
            const accessToken = await AsyncStorage.getItem("accessToken");


            if (accessToken) {
                Toast.show({
                    type: "error",
                    text1: "Session Expired",
                    text2: "Please log in again to continue.",
                });

                router.push("/(auth)/welcome");
            } else {
                router.replace("/(root)/(tabs)")
            }
        })();
    }, [])

    return <Slot />
}