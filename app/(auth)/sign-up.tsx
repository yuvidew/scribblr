
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../constants/colors";
import Toast from "react-native-toast-message";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { useCreateAccount } from "./hook/use-create-account";
import { SignupFormType } from "../../types/type";
import BackArrowProgressBar from "./_components/back-arrow-progressbar";
import { router } from "expo-router";


const SignupScreen = () => {
  const { mutate: onCreateAccount } = useCreateAccount()
  const [signupForm, setSignupForm] = useState<SignupFormType>({
    username: "",
    password: "",
    confirmPassword: "",
    email: ""
  });

  const onChangeFormValue = (key: "username" | "email" | "password" | "confirmPassword", value: string) => {
    setSignupForm((prev) => ({
      ...prev,
      [key]: value
    }))
  };


  const onSubmit = async () => {
    if (signupForm.password !== signupForm.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password Mismatch',
        text2: 'Please make sure both passwords are the same.',
        position: 'top',
        visibilityTime: 3000,
      });
      return
    }
    onCreateAccount(signupForm, {
      onSuccess: (result) => {
        if (result) 
        router.push("/(auth)/select-interest-topic")
      }
    })


  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={{gap : 20 , paddingHorizontal : 12}}>
        <BackArrowProgressBar/>
          {/* start to title or description */}
          <View style={styles.container_description}>
            <Text style={styles.title}>
              Create an account 🔐
            </Text>

            <Text style={styles.description}>
              Enter your username, email & password if you forget it, then you have to do forget password.
            </Text>
          </View>
          {/* end to title or description */}
      </View>

      {/* end to back arrow and progress bar */}
      <ScrollView style={styles.scroll_container} contentContainerStyle={{paddingBottom : 20}} showsVerticalScrollIndicator={false}>
        {/* start to heading or description box */}
        <View style={{ gap: 20 }}>

          <View style={styles.signup_form_container}>
            <InputField
              label={'Username'}
              placeholder='Username'
              value={signupForm.username}
              onChangeText={(value) => onChangeFormValue("username", value)}
            />

            <InputField
              label={'Email'}
              placeholder='Email'
              value={signupForm.email}
              onChangeText={(value) => onChangeFormValue("email", value)}
              textContentType='emailAddress'
            />

            <InputField
              label={'Password'}
              placeholder='Password'
              value={signupForm.password}
              onChangeText={(value) => onChangeFormValue("password", value)}
              isPassword
            />

            <InputField
              label={'Confirm password'}
              placeholder='Confirm password'
              value={signupForm.confirmPassword}
              onChangeText={(value) => onChangeFormValue("confirmPassword", value)}
              isPassword
            />

            <CustomButton title='Continue' onPress={onSubmit} rounded="full" />
          </View>
          {/* end to sign up form */}
        </View>
        {/* end to heading or description box */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    paddingHorizontal: 12,
    gap: 30,
  },

  scroll_container : {
  flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    paddingHorizontal: 12,
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

  container_description: {
    display: "flex",
    gap: 18
  },

  title: {
    fontFamily: "Jakarta-Bold",
    fontSize: 30
  },

  description: {
    fontFamily: "Jakarta",
    fontSize: 17
  },

  signup_form_container: {
    display: "flex",
    gap: 35,
    paddingBottom: 10
  }
});
