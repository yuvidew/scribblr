import { Image } from 'expo-image'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import CustomButton from '../../components/CustomButton'
import InputField from '../../components/InputField'
import { color } from '../../constants/colors'
import { icons } from '../../constants/icons'
import { useResetPassword } from '../../feature/auth/hook/use-reset-password'
import { useStoreEmail } from '../../zustand/manage_email'

const ResetPassword = () => {
    const { email, setEmail} = useStoreEmail();
    const { isPending, mutate } = useResetPassword()
    const [form, setForm] = useState({
        new_password: "",
        confirm_password: ""
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const onChangeFormValue = (key: "new_password" | "confirm_password", value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onRedirectToSignIn = () => {
        setShowSuccess(false);
        router.replace("/(auth)/sign-in")
    }

    const onSubmit = () => {
        if (form.confirm_password !== form.new_password) {
            Toast.show({
                type: "error",
                text1: "Password is does not match"
            })
        }

        if (!email) {
            Toast.show({
                type: "error",
                text1: "Email is not verified pls verify email"
            })

            router.push("/(auth)/verify-email")
        }

        mutate({
            email,
            new_password : form.new_password,
        }, {
            onSuccess : (result) => {
                if (result) {
                    setShowSuccess(true);
                    setEmail("")
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
                        <Text style={styles.title}>Create new Password 🔐</Text>
                        <Text style={styles.description}>
                            Enter your new password. if you forget it, then you have to do forgot password.
                        </Text>
                    </View>
                    {/* end to sign in heading */}

                    {/* start to sign in form */}
                    <View style={{ display: "flex", gap: 20 }}>
                        <InputField
                            label={"Password"}
                            placeholder="********"
                            value={form.new_password}
                            onChangeText={(value) => onChangeFormValue("new_password", value)}
                            isPassword
                        />

                        <InputField
                            label={"Confirm Password"}
                            placeholder="********"
                            value={form.confirm_password}
                            onChangeText={(value) => onChangeFormValue("confirm_password", value)}
                            isPassword
                        />


                    </View>
                    {/* end to sign in form */}
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

            {/* start to success modal*/}
            <Modal
                visible={showSuccess}
                transparent
                animationType="fade"
                onRequestClose={() => setShowSuccess(false)}
            >
                {/* Backdrop */}
                <Pressable style={styles.backdrop} onPress={() => setShowSuccess(false)}>
                    {/* Card (use pointerEvents to keep presses inside) */}
                    <Pressable style={styles.card} onPress={() => { }} pointerEvents="box-none">
                        {/* Icon circle */}
                        <Image source={icons.success_check} style={{
                            width: 180,
                            height: 180
                        }} resizeMode="contain" tintColor={color.primary[800]} />

                        <View>
                            <Text style={styles.cardTitle}>Reset Password Successful!</Text>
                            <Text style={styles.cardSubtitle}>
                                Your password has been successfully changed
                            </Text>
                        </View>


                        <CustomButton title='Go to sign in' rounded="full" width="full" onPress={onRedirectToSignIn} />
                    </Pressable>
                </Pressable>
            </Modal>
            {/* end to success modal*/}
        </SafeAreaView>
    )
}

export default ResetPassword

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

    /* Modal styles */
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    card: {
        width: '100%',
        maxWidth: 360,
        borderRadius: 24,
        backgroundColor: '#fff',
        paddingVertical: 28,
        paddingHorizontal: 22,
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        display: "flex",
        gap: 15
    },
    iconCircle: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: color.primary[800],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    iconGlyph: {
        fontSize: 34,
        color: '#fff',
    },
    cardTitle: {
        fontFamily: 'Jakarta-Bold',
        fontSize: 20,
        color: '#6a4a3d',
        marginTop: 2,
        marginBottom: 6,
        textAlign: "center"
    },
    cardSubtitle: {
        fontFamily: 'Jakarta',
        fontSize: 14,
        color: '#6b6b6b',
        textAlign: 'center',
        lineHeight: 20,
    },
    cardBtn: {
        marginTop: 18,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 18,
        backgroundColor: color.primary[800],
    },
    cardBtnText: {
        fontFamily: 'Jakarta-SemiBold',
        color: '#fff',
        fontSize: 14,
    },
});