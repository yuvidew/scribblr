import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../../../constants/icons";
import { useRouter } from "expo-router";

const Header = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* start to logo name */}
            <View style={styles.image_box}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image
                        source={icons.backArrow}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />
                </TouchableOpacity>

                <Text style={styles.logo_text}>Notification</Text>
            </View>
            {/* end to logo name */}

            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <TouchableOpacity onPress={() => router.push("/(root)/notification")}>
                    <Image
                        source={icons.settingIcon}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        // height: 85,
        paddingBottom: 15,
    },
    image_box: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    logo_text: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 23,
    },
});
