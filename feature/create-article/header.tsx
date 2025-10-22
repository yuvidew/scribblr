import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { icons } from '../../constants/icons'

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.image_box}>
                <Image
                    source={icons.logo}
                    resizeMode="contain"
                    style={{
                        width: 50,
                        height: 50
                    }} />

                <Text style={styles.logo_text}>
                    Create Article with AI
                </Text>
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