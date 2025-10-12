import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { icons } from '../../../constants/icons'
import { router } from 'expo-router'
import { color } from '../../../constants/colors'
import { useRoute } from '@react-navigation/native'

const BackArrowProgressBar = () => {
  const route = useRoute();
  const [progressState, setProgressState] = useState("")

//   console.log('Current route name:', route.name);

  useEffect(() => {
    if(route.name) {
      setProgressState(route.name)
    }
  } , [route.name])
  
  return (
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
        <View style={styles.progress_bar}>
          <View
            style={[
              styles.bar,
              {
                width:
                  progressState === "(auth)/select-country"
                    ? "20%"
                    : progressState === "(auth)/create-profile"
                      ? "40%"
                      : progressState === "(auth)/sign-up"
                        ? "60%"
                        : progressState === "(auth)/select-interest-topic"
                          ? "80%"
                          : "100%",
              },
            ]}
          />
        </View>
      </View> 
  )
}

export default BackArrowProgressBar

const styles = StyleSheet.create({
  progress_bar_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  progress_bar: {
    width: "80%",
    height: 15,
    backgroundColor: color.secondary[200],
    borderRadius: 100,
    overflow: "hidden",
  },
  bar: {
    backgroundColor: color.primary[800],
    height: "100%",
  },
})