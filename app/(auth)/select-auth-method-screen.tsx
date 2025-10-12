import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { icons } from '../../constants/icons'
import { color } from '../../constants/colors'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SelectAuthMathScreen = () => {
    const [isUserHaveProfile, setIsUserHaveProfile] = React.useState(false);

    useEffect(() => {
        const checkUserProfile = async () => {
            const userProfile = await AsyncStorage.getItem("userProfile");  
            if (userProfile) {
                setIsUserHaveProfile(true);
            }
        }
        checkUserProfile();
    }, [])

    // TODO: implement a sign in with google 
    return (
        <SafeAreaView style={styles.container}>
            <View>
                {/* start to hero image */}
                <View style={styles.image_container}>
                    <Image
                        source={icons.womanClaud}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                {/* end to hero image */}

                {/* start to heading */}
                <Text style={styles.title}>
                    Let&apos;s you in
                </Text>
                {/* end to heading */}
            </View>

            {/* start to navigate buttons */}

            <View style = {styles.navigate_buttons}>
                <CustomButton 
                    title='Continue with Google' 
                    rounded='full' 
                    bgVariant="outline" 
                    IconLeft={
                        <Image 
                            source={icons.google} 
                            style = {{
                                width : 23 , 
                                height : 23,
                                marginTop : 2
                            }} 
                            resizeMode="contain"
                    />}
                    textVariant="secondary" 
                />

                <View style={styles.line_container}>
                    <View style={styles.line} />
                    <Text style={styles.line_text}>or</Text>
                    <View style={styles.line} />
                </View>

                <CustomButton
                    title='Sign in with password'
                    rounded='full'
                    onPress={() => router.push("/(auth)/sign-in")}
                />

                <View style = {{
                    flexDirection : "row",
                    gap : 5,
                    alignItems : "center",
                    justifyContent : "center"
                }}>
                    <Text style = {{
                        fontFamily : "Jakarta-Medium"
                    }}>
                        Don&apos;t have an account? 
                    </Text>
                    {/* TODO: first check the user profile is not completed then redirect to create profile screen if not redirect to sign up*/}
                    <Link 
                        href={isUserHaveProfile ? "/(auth)/sign-up" : "/(auth)/select-country"}
                        style = {{
                            fontFamily : "Jakarta-SemiBold",
                            color : color.primary[800]
                        }}
                    >
                        Sign up
                    </Link>
                </View>
            </View>

            {/* end to navigate buttons */}
        </SafeAreaView>
    )
}

export default SelectAuthMathScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        position: "relative",
        padding: 12,
        gap: 60,
    },

    image_container: {
        height: 370,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    image: {
        width: "100%",
        height: "100%",
    },

    title: {
        textAlign: "center",
        color: color.secondary[800],
        fontSize: 39,
        fontFamily: "Jakarta-Bold",
    },

    navigate_buttons: {
        gap : 25
    },

    line_container: {
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        // marginTop: 16, 
        columnGap: 12, 
    },
    line: {
        flex: 1, 
        height: 1.3, 
        backgroundColor: color.secondary[300], 
    },
    line_text: {
        fontSize: 16, 
        color: color.secondary[800], 
        fontFamily: "Jakarta",
    },
})