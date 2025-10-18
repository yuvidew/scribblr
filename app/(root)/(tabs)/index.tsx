import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../../components/CustomButton'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
  const onLogout = async() => {
    await AsyncStorage.removeItem("userProfile")
    await AsyncStorage.removeItem("accessToken")
    await AsyncStorage.removeItem("user_profile_id")

    router.replace("/(auth)/welcome")
  }

  return (
    <View>
      <Text>Home</Text>
      <CustomButton title='Log out' onPress={onLogout} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})