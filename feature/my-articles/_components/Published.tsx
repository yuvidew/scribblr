import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../../../constants/colors'
import { Image } from 'expo-image';
import { image } from '../../../constants/image';

const Published = () => {
    const isPending = true;
    
        if (isPending) {
            return (
                <View style = {styles.empty_container}>
                    <Image 
                        source={image.emptyImage} 
                        style = {styles.empty_image} 
                        resizeMode="contain"
                    />
    
                    <Text style = {styles.empty_heading}>
                        Empty
                    </Text>
    
                    <Text style = {styles.empty_text}>
                        You don&apos;t have any notification at this time
                    </Text>
                </View>
            )
        }
    return (
        <View>
        <Text>Published</Text>
        </View>
    )
}

export default Published

const styles = StyleSheet.create({
    empty_container : {
        flex : 1,
        display : "flex",
        alignItems : "center",
        justifyContent : "center"
    },

    empty_image : {
        width : 350,
        height : 350
    },

    empty_heading: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 23,
        textAlign : "center"
    },
    empty_text: {
        fontFamily: "Jakarta-Medium",
        fontSize: 16,
        textAlign : "center",
        color : color.secondary[500]
    }
});