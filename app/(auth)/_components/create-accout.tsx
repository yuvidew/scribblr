import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, {useState } from 'react'
import InputField from '../../../components/InputField'
import Toast from 'react-native-toast-message';
import CustomButton from '../../../components/CustomButton';
import { SignupFormType } from '../../../types/type';
import { useCreateAccount } from '../hook/use-create-account';

interface Props {
    onProgressState: () => void
}

/**
 * CreateAccount - A user profile creation screen with text inputs for username, email, and password.
 *
 * @param {Props} props - Component props
 * @param {() => void} props.onProgressState - Callback invoked when the "Continue" button is pressed
 *
 * @example
 * <CreateAccount onProgressState={() => console.log("Next step")} />
 */

const CreateAccount = ({ onProgressState }: Props) => {
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
                if (result) onProgressState();
            }
        })

    }


    return (
        <ScrollView style={styles.container}>
            {/* start to heading or description box */}
            <View style={{ gap: 20 }}>
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

                {/* start to sign up form */}

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
    )
}

export default CreateAccount

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fff",
        // position: "relative",
        paddingHorizontal: 12,
        gap: 35,

        paddingBottom: 85
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
})