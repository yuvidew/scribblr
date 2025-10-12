import {  Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { icons } from '../constants/icons';
import {color} from '../constants/colors'

interface Props { 
    loading: boolean 
    color? : "primary" | "secondary" | "danger" | "success" | "warning" | string,
    size? :  "lg" | "sm" | "md" 
}

/**
 * Spinner component that displays a rotating loader icon when loading is true.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.loading - Determines whether the spinner should animate.
 * @returns {JSX.Element} The animated spinner image.
 */


const getSizeStyle = (variant : "lg" | "sm" | "md" ) => {
    switch (variant) {
        case "lg":
            return {width : 35 , height : 35 }
        case "md":
            return {width : 30 , height : 30 }
        case "sm":
            return {width : 25 , height : 25 }
        default:
            return {width : 20 , height : 20 };
    }
}

const getColorStyle = (colorStyle : string) => {
    switch (colorStyle) {
        case "primary":
            return  color.primary[800]
        case "secondary":
            return  color.secondary[800]
        case "danger":
            return  color.danger[800]
        case "success":
            return  color.success[800]
        case "warning":
            return  color.warning[800]
        default:
            return  "#fff";
    }
}

const Spinner = ({ loading , color = "#fff" , size = "md"}: Props) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (loading) {
            Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ).start();
        } else {
            rotateAnim.stopAnimation();
        }
    }, [loading]);

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    
    return (
        <Animated.Image
            source={icons.loader}
            style={[{ transform: [{ rotate: rotateInterpolate }] } , getSizeStyle(size)]}
            tintColor={getColorStyle(color)}
            
        />
    )
}

export default Spinner