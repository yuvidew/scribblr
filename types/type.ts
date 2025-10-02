export type ButtonProps = {
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
    IconLeft?: any
    IconRight?: any
    className?: string;
    loading?: boolean;
    disabled? : boolean;
    onPress? : () => void;
    rounded? : "sm" | "lg" | "default" | "md" | "full",
    width? : "full" | "half" | "icon"
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