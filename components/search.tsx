import { color } from "../constants/colors";
import { icons } from "../constants/icons";
import { Image } from "expo-image";
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

/**
 * Lightweight search input for filtering  lists.
 * @param value Current search query.
 * @param onChange Callback fired with the updated query text.
 * @param [placeholder="search"] Optional input placeholder.
 */
export const SearchComp = ({
    value,
    onChange,
    placeholder = "search",
}: Props) => {
    return (
        <View style={styles.container}>
            <Image source={icons.search} tintColor={color.secondary[600]} resizeMode="contain" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#9ca3af"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%", 
        marginLeft: "auto",
        backgroundColor: color.secondary[300],
        borderRadius : 10,
        height : 60
    },
    icon: {
        position: "absolute",
        left: 12,
        top: "50%",
        transform: [{ translateY: -9 }],
        width : 20,
        height : 20
    },
    input: {
        height:"100%",
        paddingLeft: 36, 
        borderWidth: 1,
        borderColor: "transparent", 
        borderRadius: 8,
        color: "#111827",
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 },
    },
});
