import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { color } from '../constants/colors'

interface Props  {
    text : string,
    img : string,
    author_img : string,
    author_text : string,
    time : string
}

const ArticleCard = ({
    text,
    img,
    author_img,
    author_text,
    time
} : Props) => {
    return (
        <View style = {styles.container}>
            {/* TODO: add save button */}
            <Image source={{
                uri : img
            }} resizeMode="cover" style = {styles.img}  />

            {/* start to text */}
            <Text style = {styles.text} >
                {text.length < 38 ? text :`${text.slice(0 , 39)}....`}
            </Text>
            {/* end to text */}

            {/* start to author info */}
            <View style = {styles.author_box}>
                <View style = {styles.author_image_text}>
                    <Image 
                        source={{
                            uri : author_img
                        }} 

                        resizeMode="cover"
                        style = {styles.author_image}
                    />

                    <Text style = {styles.author_text}>
                        {author_text}
                    </Text>
                </View>

                {/* start time and more option */}
                <View style = {styles.time_and_option}>
                    <Text style = {styles.time}>
                        {time}
                    </Text>
                </View>
                {/* end time and more option */}

            </View>
            {/* end to author info */}

        </View>
    )
}

export default ArticleCard

const styles = StyleSheet.create({
    container : {
        width: 230,
        // height: 300,
        marginRight: 10,
        borderRadius: 10,
        gap : 10,
    },

    img : {
        width : "100%",
        height : 200,
        borderRadius : 15
    },

    text : {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 18
    },

    author_box : {
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between",
        gap : 8
    },

    author_image_text : {
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        gap : 8
    },

    author_image : {
        width : 30,
        height : 30,
        borderRadius : 100
    },
    author_text : {
        fontFamily: "Jakarta-Medium",
        fontSize: 15,
        color : color.primary[800]
    },

    time_and_option : {
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "flex-end",
        gap : 8
    },

    time : {
        fontFamily: "Jakarta-Medium",
        fontSize: 14,
        color : color.secondary[600]
    }
})