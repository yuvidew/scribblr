import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { icons } from '../../../constants/icons'

const Header = () => {
    return (
        <View style={styles.container}>
            {/* start to logo name */}
            <View style={styles.image_box}>
                <Image
                    source={icons.logo}
                    resizeMode="contain"
                    style={{
                        width: 50,
                        height: 50
                    }} />

                <Text style={styles.logo_text}>
                    Scribblr
                </Text>
            </View>
            {/* end to logo name */}

            <View style = {{
                display : "flex",
                flexDirection : "row",
                alignItems : "center",
                gap : 10
            }}>
                {/* TODO: add a route navigation to navigate notification screen*/}
                <TouchableOpacity>
                    <Image
                        source={icons.notification}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                {/* TODO: add a route navigation to navigate saved article screen*/}
                <TouchableOpacity>
                    <Image
                        source={icons.bookmark}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        // height: 85,
        paddingBottom: 15,
    },
    image_box: {
        flexDirection: "row",
        alignItems: "center",
    },

    logo_text: {
        fontFamily: "Jakarta-Bold",
        fontSize: 23
    }
})