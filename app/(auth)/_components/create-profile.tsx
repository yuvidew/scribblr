import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { icons } from '../../../constants/icons'
import * as ImagePicker from "expo-image-picker";
import InputField from '../../../components/InputField'
import CustomButton from '../../../components/CustomButton'

interface Props {
    onProgressState : () => void
}

/**
 * CreateProfile - A user profile creation screen with image upload, text inputs,
 * date picker, and dropdown for gender selection.
 *
 * @param {Object} props - Component props.
 * @param {() => void} props.onProgressState - Callback function invoked when the user taps "Continue".
 *
 * @example
 * <CreateProfile onProgressState={() => console.log("Next step")} />
 *
 * Usage inside a parent component:
 * const [progressState, setProgressState] = useState<
    "country" | "profile" | "sign-up"
    >("profile");
 * <CreateProfile onProgressState={() => setProgressState("profile")} />
 */

const CreateProfile = ({onProgressState} : Props) => {
    const [form, setForm] = useState<{
        image : string,
        bod : Date | undefined,
        fullname : string,
        gender : string,
        about : string,
        phoneNo : string,
    }>({
        image: "",
        bod : new Date(),
        fullname : "",
        gender : "",
        about : "",
        phoneNo : ""
    });

    const onPickImage = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            allowsEditing: true,
            aspect: [4, 3], 
            quality: 1,
        });

        if (!result.canceled) {
            setForm((prev) => ({ ...prev, image: result.assets[0].uri })); 
        }
    };
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* start to heading or description box */}
            <View style={{ gap: 20 }}>
                {/* start to title or description */}
                <View style={styles.container_description}>
                    <Text style={styles.title}>
                        Complete your profile 📄
                    </Text>

                    <Text style={styles.description}>
                        Don&apos;t worry. only you can see your personal data. No one else will be able to see it.
                    </Text>
                </View>
                {/* end to title or description */}

            </View>
            {/* end to heading or description boc */}

            {/* start to upload user image */}
            <View style={styles.upload_image_container}>
                {form.image ? (

                    <Image
                        source={{uri : form.image}}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius : 100
                        }}
                        resizeMode="cover"
                    />
                ) : (
                    <Image
                        source={icons.userUpload}
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                        resizeMode="contain"
                    />
                )}

                <TouchableOpacity onPress={onPickImage}>

                    <Image
                        source={icons.edit}
                        style={styles.edit_icon}
                        resizeMode="contain"
                    
                    />
                </TouchableOpacity>
            </View>
            {/* end to upload user image */}

            {/* start to profile form */}
            <View style = {styles.profile_form_container}>

                <InputField
                    label={'Full Name'}
                    placeholder='Full Name'
                    value={form.fullname}
                    onChangeText={(value) => setForm((prev) => ({
                        ...prev,
                        fullname : value
                    }))}
                />

                <InputField
                    label={'Phone Number'}
                    placeholder='+1 000 000 000'
                    textContentType="telephoneNumber"
                    value = {form.phoneNo}
                    onChangeText={(value) => setForm((prev) => ({
                        ...prev,
                        phoneNo : value
                    }))}
                />

                <InputField
                    label={'Gender'}
                    placeholder="Gender"
                    isDropDown
                    options={[
                        {
                            option : "Male"
                        },
                        {
                            option : "Female"
                        },
                        {
                            option : "Other"
                        },
                    ]}
                    selectedOption={form.gender}
                    onSelectedOption={(value) => setForm((prev) => ({
                        ...prev,
                        gender : value
                    }))}
                />

                <InputField
                    label='Date of Birth'
                    placeholder='Date of Birth'
                    isSelectDate
                    selectedDate={form.bod}
                    onChangeDate={(value) => setForm((prev) => ({
                        ...prev,
                        bod : value
                    }))}
                />

            <CustomButton title='Continue' rounded="full" onPress={onProgressState} />
            </View>
            {/* end to profile form */}

        </ScrollView>
    )
}

export default CreateProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fff",
        // position: "relative",
        paddingHorizontal: 12,
        gap: 35,

        paddingBottom : 85
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

    upload_image_container: {
        width: 150,
        height: 150,
        marginHorizontal: "auto",
        position: "relative",
        marginTop : 30
    },
    edit_icon: {
        width: 35,
        height: 35,
        position: "absolute",
        bottom: 0,
        right: 0
    },
    profile_form_container : {
        display : "flex",
        gap : 35,
        paddingBottom : 10
    }
})