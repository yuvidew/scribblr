import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { icons } from "../../constants/icons";
import { color } from "../../constants/colors";
import SelectCountry from "./_components/select-country";
import CreateProfile from "./_components/create-profile";
import CreateAccount from "./_components/create-accout";
import SelectInterestTopic from "./_components/select-interest-topic";
import FollowPeople from "./_components/follow-people";

const SignupScreen = () => {
  const [progressState, setProgressState] = useState<
    "country" | "profile" | "sign-up" | "interest-topic" | "follow-peoples"
  >("profile");

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
        <View style={styles.progress_bar}>
          {/* start to bar */}
          <View
            style={[
              styles.bar,
              {
                width:
                  progressState === "country"
                    ? "20%"
                    : progressState === "profile"
                      ? "40%"
                      : progressState === "sign-up"
                        ? "60%"
                        : progressState === "interest-topic"
                          ? "80%"
                          : "100%",
              },
            ]}
          />
          {/* end to bar */}
        </View>
      </View>
      {/* end to back arrow and progress bar */}
      {progressState === "country" ? (
        <SelectCountry onProgressState={() => setProgressState("profile")} />
      ) : progressState === "profile" ? (
        <CreateProfile onProgressState={() => setProgressState("sign-up")} />
      ) : progressState === "sign-up" ? (
        <CreateAccount onProgressState={() => setProgressState("interest-topic")} />
      ) : progressState === "interest-topic" ? (
        <SelectInterestTopic onProgressState={() => setProgressState("follow-peoples")} />
      ) : progressState === "follow-peoples" &&  (
        <FollowPeople/>
      )}
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    padding: 12,
    gap: 30,
  },

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
});
