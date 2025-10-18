import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../../components/CustomButton'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
  const onLogout = async() => {
    // await AsyncStorage.removeItem("userProfile")
    await AsyncStorage.removeItem("accessToken")
    // await AsyncStorage.removeItem("user_profile_id")

    router.replace("/(auth)/welcome")
  }

  return (
    <View>
      <Text>Home</Text>
      <CustomButton title='Log out' onPress={onLogout} />
      <Link href={"/(auth)/verify-email"}>Verify email</Link>
      <Link href={"/(auth)/verify-otp"}>Verify otp</Link>
      <Link href={"/(auth)/reset-password"}>Reset password</Link>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})