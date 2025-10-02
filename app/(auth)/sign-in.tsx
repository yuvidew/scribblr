import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const SignInScreen = () => {
    return (
        <Redirect href="/(auth)/welcome" />
    )
}

export default SignInScreen

const styles = StyleSheet.create({})