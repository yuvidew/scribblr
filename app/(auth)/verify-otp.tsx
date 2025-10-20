import { Image } from 'expo-image'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import CustomButton from '../../components/CustomButton'
import InputField from '../../components/InputField'
import { color } from '../../constants/colors'
import { icons } from '../../constants/icons'
import { useVerifyOTP } from '../../feature/auth/hook/use-verify-otp'
import { useStoreEmail } from '../../zustand/manage_email'

const VerifyOtp = () => {
    const {email} = useStoreEmail();
    const {isPending , mutate} = useVerifyOTP()
    const [otp, setOtp] = useState("")
    
    const onSubmit = () => {
        if (!email) {
            Toast.show({
                type : "error",
                text1 : "Email is not verified pls verify email"
            })

            router.push("/(auth)/verify-email")
        }

        mutate({
            email,
            code : Number(otp) 
        } , {
            onSuccess : (result) => {
                if (result) {
                    router.push("/(auth)/reset-password")
                }
            }
        })
    }

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

            {/* start to email from */}
            <View style={{ display: "flex", height: "100%", justifyContent: "space-between", paddingBottom: 80 }}>
                {/* start to sign in heading */}
                <View style={{ display: "flex", gap: 50, }}>
                    <View style={styles.container_description}>
                        <Text style={styles.title}>You&apos;ve Got Mail 📨</Text>
                        <Text style={styles.description}>
                            We have sent the OTP verification code to your email address. Check your email and enter the code below.
                        </Text>
                    </View>
                    {/* end to sign in heading */}

                    {/* start to sign in form */}
                    <View style={{ display: "flex", gap: 20 }}>
                        <InputField
                            label={'OTP'}
                            placeholder='000 00'
                            textContentType="telephoneNumber"
                            value={otp}
                            onChangeText={(value) => setOtp(value)}
                        />


                    </View>
                    {/* end to sign in form */}

                    <Text style={styles.label}>
                        Your OTP will expire in <Text style = {{color : color.primary[800]}} > 5 min</Text>.
                    </Text>
                </View>


                <View style={{ display: "flex", gap: 15 }}>
                    <CustomButton
                        title="Continue"
                        rounded="full"
                        loading={isPending}
                        onPress={onSubmit}
                    />

                </View>
            </View>
            {/* end to email from */}
        </SafeAreaView>
    )
}

export default VerifyOtp

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
        display: "flex",
        gap: 18,
    },

    title: {
        fontFamily: "Jakarta-Bold",
        fontSize: 30,
    },

    description: {
        fontFamily: "Jakarta",
        fontSize: 17,
    },

    checkboxContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
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
        fontFamily: "Jakarta-SemiBold",
    },
    forget_password_text: {
        textAlign: "center",
        color: color.primary[800],
        fontSize: 16,
        fontFamily: "Jakarta-Medium",
    },
    continue_with_text: {
        fontSize: 15,
        fontFamily: "Jakarta",
        textAlign: "center",
    },
    redirect_text: {
        textAlign: "center",
        fontFamily: "Jakarta",
        fontSize: 16,
    },
    redirect_link: {
        textAlign: "center",
        fontFamily: "Jakarta-SemiBold",
        fontSize: 16,
        color: color.primary[800],
    },
});