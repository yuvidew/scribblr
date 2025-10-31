import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { color } from '../../../constants/colors'
import { icons } from '../../../constants/icons'

interface Props {
    text: string,
    img: string,
    author_img: string,
    author_text: string,
    time: string,
}
/**
 * @param text article headline displayed on the card
 * @param img hero image URI for the article
 * @param author_img author avatar URI used in the footer
 * @param author_text author name or descriptor shown next to the avatar
 * @param time relative time string describing when the article was published
 * @param widthRange width applied to the card container (defaults to 10%)
 */

const ArticleCard2 = ({
    text,
    img,
    author_img,
    author_text,
    time,
}: Props) => {
    return (
        <TouchableOpacity style={styles.container}>
            {/* TODO: add save button */}
            <View style={styles.img_container}>

                <Image source={{
                    uri: img
                }} resizeMode="cover" style={styles.img} />
            </View>

            <View style={{
                width: "50%",
                height: "100%",
                display: "flex",
                justifyContent: "space-between"
            }}>

                {/* start to text */}
                <Text style={styles.text} >
                    {text.length < 45 ? text : `${text.slice(0, 39)}....`}
                    {/* {text} */}
                </Text>
                {/* end to text */}
                <View style = {{
                    display : "flex",
                    gap : 4
                }}>
                    <View style={styles.author_image_text}>
                        <Image
                            source={{
                                uri: author_img
                            }}

                            resizeMode="cover"
                            style={styles.author_image}
                        />

                        <Text style={styles.author_text}>
                            {author_text}
                        </Text>
                    </View>
                    {/* start to author info */}
                    <View style={styles.author_box}>


                        {/* start time and more option */}
                        <View style={styles.time_and_option}>
                            <Text style={styles.time}>
                                {time}
                            </Text>
                        </View>
                        {/* end time and more option */}

                        {/* start to bookmark button */}
                        <TouchableOpacity
                            style={styles.bookmark_btn}
                            onPress={(e) => e.stopPropagation()}
                        >
                            <Image
                                source={icons.bookmark_selected}
                                style={styles.bookmark_Btn_img}
                                tintColor={color.primary[800]}
                            />
                        </TouchableOpacity>
                        {/* end to bookmark button */}

                    </View>
                    {/* end to author info */}
                </View>
            </View>

        </TouchableOpacity>
    )
}

export default ArticleCard2

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 180,
        borderRadius: 10,
        marginBottom: 10,
        gap: 10,
        position: "relative",
        display: "flex",
        flexDirection: "row",
    },

    img_container: {
        width: "50%",
        height: "100%",
        borderRadius: 15,
        overflow: "hidden"
    },

    bookmark_btn: {
        // backgroundColor: color.primary[800],
        zIndex: 10,
        borderRadius: 5,
        padding: 7
    },

    bookmark_Btn_img: {
        width: 20,
        height: 20
    },

    img: {
        width: "100%",
        height: "100%",
    },

    text: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 18
    },

    author_box: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        width: "90%"
    },

    author_image_text: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    author_image: {
        width: 30,
        height: 30,
        borderRadius: 100
    },
    author_text: {
        fontFamily: "Jakarta-Medium",
        fontSize: 15,
        color: color.primary[800]
    },

    time_and_option: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 8
    },

    time: {
        fontFamily: "Jakarta-Medium",
        fontSize: 14,
        color: color.secondary[600]
    }
})
