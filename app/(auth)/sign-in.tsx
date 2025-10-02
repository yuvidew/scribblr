import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignInScreen = () => {
    return (
        <SafeAreaView style = {styles.container}>
            <Link href={"/(auth)/sign-up"} >sign in</Link  >
        </SafeAreaView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        position: "relative",
        padding: 12,
        gap: 10,
    },
})