import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../feature/create-article/header'
import { color } from '../../../constants/colors'
import { Image } from 'expo-image'
import { icons } from '../../../constants/icons'
import CustomButton from '../../../components/CustomButton'

const CreateArticle = () => {
    // TODO: create modal to upload or generate image
    return (
        <ScrollView style={{
            flex: 1,
        }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={styles.container}>
                        <Header />
                        <View style={styles.create_form}>
                            <View style={styles.upload_image_box}>
                                <Image
                                    source={icons.imageIcon}
                                    style={styles.upload_image}
                                    resizeMode="contain"
                                    tintColor={color.secondary[500]}
                                />
                                <Text style={styles.upload_image_text}>Upload or Generate image</Text>
                            </View>

                            <TextInput
                                placeholderTextColor={color.secondary[400]}
                                style={styles.input_title}
                                textContentType="name"
                                placeholder="Enter title"
                            />

                            <TextInput
                                placeholderTextColor={color.secondary[400]}
                                style={styles.input_Content}
                                multiline={true}
                                // numberOfLines={56} 
                                textAlignVertical="top"
                                placeholder="Enter prompt"
                            />

                            <CustomButton 
                                title="Generate article" 
                                IconRight={
                                    <Image
                                        source={icons.aiIcon}
                                        style = {{
                                            width : 30,
                                            height : 30
                                        }}
                                        tintColor={"#fff"}
                                    />
                                }
                            />
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>

    )
}

export default CreateArticle

const styles = StyleSheet.create({
    container: {
        paddingBottom: 80,
        gap: 25,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        flex: 1,
    },

    create_form: {
        display: "flex",
        gap: 40
    },

    upload_image_box: {
        height: 270,
        backgroundColor: color.secondary[200],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15
    },

    upload_image_text: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 15,
        color: color.secondary[500],
    },

    upload_image: {
        width: 70,
        height: 70,

    },

    input_title: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontFamily: "Jakarta-SemiBold",
        fontSize: 18,
        color: color.secondary[800],
        textAlign: "left",
        borderWidth: 1,
        borderColor: color.secondary[400],
        borderRadius: 10
    },

    input_Content: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontFamily: "Jakarta-SemiBold",
        fontSize: 18,
        color: color.secondary[800],
        textAlign: "left",
        borderWidth: 1,
        borderColor: color.secondary[400],
        borderRadius: 10,
        height: 230,
        display: "flex",
        alignContent: "flex-start"
    }

})