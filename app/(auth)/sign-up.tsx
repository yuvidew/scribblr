import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const SignupScreen = () => {
    
  return (
    <Redirect href="/(auth)/welcome" />
  )
}

export default SignupScreen

const styles = StyleSheet.create({})