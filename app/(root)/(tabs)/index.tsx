import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../../constants/colors";
import { image } from "../../../constants/image";
import Header from "../../../feature/home/_components/header";
import RecentArticle from "../../../feature/home/_components/recent-article";
import YourArticle from "../../../feature/home/_components/your-article";
import OnYourBookmark from "../../../feature/home/_components/on-your-bookmark";
import CustomButton from "../../../components/CustomButton";

const Home = () => {
  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem("userProfile")
      await AsyncStorage.removeItem("accessToken")
      await AsyncStorage.removeItem("user_profile_id")
      router.replace("/(auth)/welcome")
    } catch (error) {
      console.error("Error during logout:", error)
      router.replace("/(auth)/welcome")
    }
  }

  return (
    <ScrollView style={styles.scroll_container}>
      <SafeAreaView style={styles.container}>
        {/* <CustomButton title="Logout"  onPress={onLogout} /> */}
        {/* start to header */}
        <Header />
        {/* end to header */}


        {/* start to hero image */}
        <View style={styles.hero}>
          <View style={styles.hero_text}>
            <Text style={styles.hero_heading}>
              Capture your ideas anytime, anywhere
            </Text>
            <TouchableOpacity style={styles.read_more}>
              <Text style={styles.read_more_text}>Read more</Text>
            </TouchableOpacity>
          </View>

          <Image
            style={styles.girl_image}
            source={image.girl_img}
            resizeMode="cover"
          />
        </View>
        {/* end to hero image */}

        {/* start to recent article */}
        <RecentArticle />
        {/* end to recent article */}

        {/* start to Your article */}
        <YourArticle />
        {/* end to Your article */}

        {/* start to on your bookmark */}
        <OnYourBookmark />
        {/* end to on your bookmark */}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scroll_container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  container: {
    paddingBottom : 80,
    gap: 25,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flex: 1,
  },

  hero: {
    height: 160,
    borderRadius: 15,
    backgroundColor: color.primary[800],
    position: "relative",
    overflow: "hidden",
  },

  girl_image: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 130,
    height: 160,
    textAlign: "right",
  },

  hero_text: {
    width: "60%",
    height: "100%",
    display: "flex",
    gap: 20,
    padding: 10,
    justifyContent: "center",
    paddingLeft: 25,
  },

  hero_heading: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 18,
    color: color.secondary[100],
  },

  read_more: {
    backgroundColor: color.secondary[100],
    padding: 4,
    paddingBottom: 6,
    borderRadius: 50,
    width: 100,
  },

  read_more_text: {
    textAlign: "center",
    fontFamily: "Jakarta-Medium",
    color: color.primary[800],
  },
});
