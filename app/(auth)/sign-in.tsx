import { StyleSheet, Text, TouchableOpacity, View, Pressable ,  } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { color } from '../../constants/colors'
import { icons } from '../../constants/icons'
import InputField from '../../components/InputField'
import CustomButton from '../../components/CustomButton'

const SignInScreen = () => {
    // TODO : submit the sign up date to te back throghe the api
    const [checked, setChecked] = useState(false);
    const [signinForm, setSigninForm] = useState({
        email: "",
        password: ""
    });

    const onChangeFormValue = (key: | "email" | "password", value: string) => {
        setSigninForm((prev) => ({
            ...prev,
            [key]: value
        }))
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* start to back arrow and progress bar */}
            <View style={styles.progress_bar_container}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image
                        source={icons.backArrow}
                        style={{
                            width: 25,
                            height: 25,
                        }}
                        tintColor={color.secondary[800]}
                    />
                </TouchableOpacity>
            </View>
            {/* end to back arrow and progress bar */}

            <View style={{ display: "flex", gap: 50 }}>
                {/* start to sign in heading */}
                <View style={styles.container_description}>
                    <Text style={styles.title}>Hello there 👋</Text>
                    <Text style={styles.description}>Please enter your username/email and password to sign in.</Text>
                </View>
                {/* end to sign in heading */}

                {/* start to sign in form */}
                <View style={{ display: "flex", gap: 20 }}>
                    <InputField
                        label={'Username / Email'}
                        placeholder='Username / Email'
                        value={signinForm.email}
                        onChangeText={(value) => onChangeFormValue("email", value)}
                    />

                    <InputField
                        label={'Password'}
                        placeholder='Password'
                        value={signinForm.password}
                        onChangeText={(value) => onChangeFormValue("password", value)}
                        isPassword
                    />

                    <View style={styles.checkboxContainer}>
                        <Pressable
                            onPress={() => setChecked(!checked)}
                            style={[
                                styles.checkbox,
                                checked && styles.checked,
                            ]}
                        >
                            {checked && <Text style={styles.checkmark}>✓</Text>}
                        </Pressable>

                        <Text style={styles.label}>Remember me</Text>
                    </View>
                </View>
                {/* end to sign in form */}

                {/* start to forget password */}
                <Link href={"/(auth)/sign-up"} style = {styles.forget_password_text}>Forget password</Link>
                {/* end to forget password */}

                {/* start to sign in with google */}
                <View style = {{
                    display : "flex",
                    gap : 15
                }} >
                    <Text style = {styles.continue_with_text}> or continue with</Text>

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
                </View>
                {/* end to sign in with google */}

                <View style = {{ display : "flex" , gap : 15}}>
                    <CustomButton title='Sign in' rounded="full" />

                    {/* start to redirect link */}
                    <Text style = {styles.redirect_text}>
                        Don&apos;t have an account? {" "}
                        <Link href={"/(auth)/sign-up"} style = {styles.redirect_link}>Sign Up</Link>
                    </Text>
                    {/* end to redirect link */}
                </View>

            </View>

        </SafeAreaView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fff",
        position: "relative",
        paddingHorizontal: 24,
        gap: 40,
    },

    progress_bar_container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },

    container_description: {
        display: 'flex',
        gap: 18,
    },

    title: {
        fontFamily: 'Jakarta-Bold',
        fontSize: 30,
    },

    description: {
        fontFamily: 'Jakarta',
        fontSize: 17,
    },

    checkboxContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "#8B4513",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    checked: {
        backgroundColor: color.primary[800],
    },
    checkmark: {
        color: "#fff",
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        color: color.secondary[800],
        fontFamily: "Jakarta-SemiBold"
    },
    forget_password_text : {
        textAlign : "center",
        color : color.primary[800],
        fontSize : 16,
        fontFamily : "Jakarta-Medium"
    },
    continue_with_text : {
        fontSize : 15,
        fontFamily : "Jakarta",
        textAlign : "center"
    },
    redirect_text : {
        textAlign : "center",
        fontFamily : "Jakarta",
        fontSize : 16
    },
    redirect_link : {
        textAlign : "center",
        fontFamily : "Jakarta-SemiBold",
        fontSize : 16,
        color : color.primary[800]
    }
})