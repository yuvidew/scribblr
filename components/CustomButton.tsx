import React from "react";
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from "react-native";
import Spinner from "./Spinner";
import { ButtonProps } from "../types/type";
import { color } from "../constants/colors";



const getBgVariantStyle = (variant: ButtonProps["bgVariant"]): ViewStyle => {
    switch (variant) {
        case "secondary":
            return { backgroundColor: color.primary[200] };
        case "danger":
            return { backgroundColor: color.danger[500] };
        case "success":
            return { backgroundColor: color.success[500] };
        case "outline":
            return { backgroundColor: "transparent" };
        default:
            return { backgroundColor: color.primary[700] };
    }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]): TextStyle => {
    switch (variant) {
        case "primary":
            return { color: color.primary[700] };
        case "secondary":
            return { color: color.success[100] };
        case "danger":
            return { color: color.danger[100] };
        case "success":
            return { color: color.success[100] };
        default:
            return { color: "white" };
    }
};

const getBorderRoundedStyle = (
    variant: ButtonProps["rounded"]
): ViewStyle => {
    switch (variant) {
        case "sm":
            return { borderRadius: 4 };   
        case "md":
            return { borderRadius: 8 };   
        case "lg":
            return { borderRadius: 16 };  
        case "full":
            return { borderRadius: 56 };
        case "default":
        default:
            return { borderRadius: 12 };  
    }
};

const getButtonWidthStyle = (variant : ButtonProps["width"])  => {
    switch (variant) {
        case "full":
            return { width : "100%"}
        case "half":
            return { width : "49%"}
        default:
            return { width : "auto"}
    }
}

const CustomButton = ({
    onPress,
    title,
    bgVariant = "primary",
    textVariant = "default",
    IconLeft,
    IconRight,
    loading = false,
    disabled,
    rounded,
    width,
    ...props
}: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.button,
                getBgVariantStyle(bgVariant),
                getBorderRoundedStyle(rounded),
                getButtonWidthStyle(width),
                disabled && { opacity: 0.45 },
            ]}
            disabled={disabled}
            {...props}
        >
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <>
                    {IconLeft}
                    <Text style={[styles.text, getTextVariantStyle(textVariant)]}>
                        {title}
                    </Text>
                    {IconRight && <IconRight />}
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 12, 
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 64,
        // width: "auto"

    },
    text: {
        fontSize: 18, // text-lg
        fontFamily: "Jakarta-Bold", // your custom font
        marginHorizontal: 4,
    },
});

export default CustomButton;
