import React from "react";
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
    DimensionValue,
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
            return { borderWidth : 1.5 , borderColor : color.secondary[200] };
        default:
            return { backgroundColor: color.primary[700] };
    }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]): TextStyle => {
    switch (variant) {
        case "primary":
            return { color: color.primary[700] };
        case "secondary":
            return { color: color.secondary[800] };
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

const buttonWidthValues = {
    full: "100%",
    half: "49%",
    icon : "10%"
} as const satisfies Record<NonNullable<ButtonProps["width"]>, DimensionValue>;

const defaultButtonWidth: DimensionValue = "auto";

const getButtonWidthStyle = (variant: ButtonProps["width"]): ViewStyle => ({
    width: variant ? buttonWidthValues[variant] : defaultButtonWidth,
});

/**
 * Renders a themed button with optional icons and loading state.
 *
 * @param {ButtonProps} props - Button configuration options.
 * @param {string} props.title - Button label text.
 * @param {() => void} [props.onPress] - Tap handler invoked when the button is pressed.
 * @param {ButtonProps["bgVariant"]} [props.bgVariant] - Background color variant that matches the design system.
 * @param {ButtonProps["textVariant"]} [props.textVariant] - Typography color variant to pair with the background.
 * @param {React.ReactNode} [props.IconLeft] - Optional element rendered before the label.
 * @param {React.ReactNode} [props.IconRight] - Optional element rendered after the label.
 * @param {boolean} [props.loading] - Shows a spinner and blocks interaction when true.
 * @param {boolean} [props.disabled] - Lowers opacity and prevents presses when true.
 * @param {ButtonProps["rounded"]} [props.rounded] - Controls border radius presets.
 * @param {ButtonProps["width"]} [props.width] - Sets the button width preset (full or half).
 *
 * @example
 * ```tsx
 * <CustomButton
 *   title="Continue"
 *   onPress={handleContinue}
 *   bgVariant="success"
 *   textVariant="primary"
 *   width="full"
 *   rounded="lg"
 * />
 * ```
 */
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
        display : "flex",
        gap : 5
    },
    text: {
        fontSize: 18,
        fontFamily: "Jakarta-Bold",
        marginHorizontal: 4,
    },
});

export default CustomButton;
