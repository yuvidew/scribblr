
import React from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { color } from "../constants/colors";

interface TabIconProps {
    focused: boolean;
    icon: any;
    title?: string;
    size?: number;
}

/**
 * Renders a tab icon with an optional title for use in a tab navigation bar.
 *
 * @param {TabIconProps} props - The props for the TabIcon component.
 * @param {boolean} props.focused - Determines if the tab is currently focused/active.
 * @param {ImageSourcePropType} props.icon - The source for the icon image.
 * @param {string} [props.title] - Optional title to display below the icon.
 * @param {number} [props.size=24] - Optional size (in pixels) for the icon image.
 * @returns {JSX.Element} The rendered tab icon component.
 */

const TabIcon = ({ focused, icon, title, size = 32 }: TabIconProps) => (
    <View style={styles.container}>
        <Image
            source={icon as ImageSourcePropType}
            style={[
                { tintColor: focused ? color.primary[800] : "#666876", width: size, height: size },
            ]}
            resizeMode="contain"
            // tintColor={"#666876"}
        />
        {title && (
            <Text
                style={[
                    styles.text,
                    focused ? styles.textFocused : styles.textUnfocused,
                ]}
            >
                {title}
            </Text>
        )}
    </View>
);

export default TabIcon;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 12,
        flexDirection: "column",
        alignItems: "center",
    },
    text: {
        fontSize: 12,
        textAlign: "center",
        marginTop: 4,
        width: "100%",
    },
    textFocused: {
        color: "#8b5e34",
        fontWeight: "500",
    },
    textUnfocused: {
        color: "#666876",
    },
});
