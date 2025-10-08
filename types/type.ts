import { ImageStyle } from "expo-image";
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";

export type ButtonProps = {
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
    IconLeft?: any
    IconRight?: any
    className?: string;
    loading?: boolean;
    disabled?: boolean;
    onPress?: () => void;
    rounded?: "sm" | "lg" | "default" | "md" | "full",
    width?: "full" | "half" | "icon"
};

export type Country = {
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    name: {
        common: string;
        official: string;
        nativeName?: {
            [languageCode: string]: {
                official: string;
                common: string;
            };
        };
    };
    latlng: [number, number];
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    };
};

export type CountryListType = {
    name: string;
    flag: {
        png: string;
        svg: string;
        alt?: string;
    };
    coordinates: [number, number];
    value: string;
    openStreetMap: string;
};

export interface InputFieldProps extends TextInputProps {
    label: string;
    isPassword?: boolean;
    secureTextEntry?: boolean;
    labelStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    iconStyle?: StyleProp<ImageStyle>;
    className?: string;
    icon?: any;
    isSelectDate?: boolean,
    onChangeDate?: (value: Date) => void,
    selectedDate?: Date,
    isDropDown?: boolean,
    options?: {
        option: string
    }[],
    selectedOption?: string,
    onSelectedOption?: (value: string) => void,
}

export type ProfileFormType = {
    image: string,
    dob: Date | undefined,
    fullname: string,
    gender: string,
    phoneNo: string,
}