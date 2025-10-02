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
    width? : "full" | "half"
}