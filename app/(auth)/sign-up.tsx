import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, {useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { icons } from "../../constants/icons";
import { color } from "../../constants/colors";
import SelectCountry from "./_components/select-country";

const SignupScreen = () => {
  const [progressState, setProgressState] = useState<
    "country" | "profile" | "sign-up"
  >("country");

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
                    ? "33.5%"
                    : progressState === "profile"
                      ? "67%"
                      : "100%",
              },
            ]}
          />
          {/* end to bar */}
        </View>
      </View>
      {/* end to back arrow and progress bar */}

      <SelectCountry/>
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
