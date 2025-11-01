import { Image } from 'expo-image';
import * as ImagePicker from "expo-image-picker";
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import { icons } from '../../constants/icons';
import BackArrowProgressBar from '../../feature/auth/_components/back-arrow-progressbar';
import { useCreateProfile } from '../../feature/auth/hook/use-create-profile';
import { formatDateToYMD } from '../../lib/util';
import { ProfileFormType } from '../../types/type';
import { useStoreCountry } from '../../zustand/manage_country';
import { useUploadProfileImage } from '../../global-api-function/hooks/use-upload-profile-image';
import { useStoreImage } from '../../zustand/manage_image';
// import { image } from '@/constants/image';



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

const CreateProfile = () => {
    const { isPending, mutate, isSuccess } = useCreateProfile();
    const { country } = useStoreCountry();
    const { mutate:onUploadImage } = useUploadProfileImage();
    const {image , setImage} = useStoreImage()
    const [form, setForm] = useState<ProfileFormType>({
        dob: new Date(),
        fullname: "",
        gender: "",
        phoneNo: ""
    });

    const onPickImage = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Toast.show({
                type: "error",
                text2: "Sorry, we need camera roll permissions to make this work!",
                position: 'top',
                visibilityTime: 3000,
            });
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });



        if (!result.canceled && result.assets && result.assets.length > 0) {
            const [asset] = result.assets;

            if (!asset?.uri) {
                Toast.show({
                    type: "error",
                    text1: "Unable to read selected image"
                });
                return;
            }

            setImage(asset.uri);

            const formData = new FormData();
            formData.append("file", {
                uri: asset.uri,
                type: asset.mimeType ?? "image/jpeg",
                name: asset.fileName ?? "photo.jpg",
            } as any);

            onUploadImage(formData);


        }
    };

    const onSubmit = () => {
        if (!image || !form.dob || !form.fullname || !form.gender || !form.phoneNo) {
            Toast.show({
                type: "error",
                text1: "Fill all fields"
            })

            return;
        }

        const formData = new FormData();
        formData.append("image_url", image);

        formData.append("date_of_birth", formatDateToYMD(form.dob.toISOString()));
        formData.append("fullname", form.fullname);
        formData.append("gender", form.gender);
        formData.append("phone_number", form.phoneNo);
        formData.append("country", country);

        mutate(formData, {
            onSuccess: (result) => {
                console.log("the result", result);
                if (result) {

                    router.push("/(auth)/sign-up")
                }
            }
        })
    }

    useEffect(() => {
        if (isSuccess) {
            // onProgressState()
        }
    }, [isSuccess])

    return (
        <SafeAreaView style={styles.container}>
            {/* start to heading or description box */}
            <View style={{ gap: 20, paddingHorizontal: 12 }}>
                <BackArrowProgressBar />
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
            {/* end to heading or description box */}
            <ScrollView style={styles.scroll_container} showsVerticalScrollIndicator={false}>

                {/* start to upload user image */}
                <View style={styles.upload_image_container}>
                    {image ? (

                        <Image
                            source={{ uri: image }}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 100
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
                <View style={styles.profile_form_container}>

                    <InputField
                        label={'Full Name'}
                        placeholder='Full Name'
                        value={form.fullname}
                        onChangeText={(value) => setForm((prev) => ({
                            ...prev,
                            fullname: value
                        }))}
                    />

                    <InputField
                        label={'Phone Number'}
                        placeholder='+1 000 000 000'
                        textContentType="telephoneNumber"
                        value={form.phoneNo}
                        onChangeText={(value) => setForm((prev) => ({
                            ...prev,
                            phoneNo: value
                        }))}
                    />

                    <InputField
                        label={'Gender'}
                        placeholder="Gender"
                        isDropDown
                        options={[
                            {
                                option: "Male"
                            },
                            {
                                option: "Female"
                            },
                            {
                                option: "Other"
                            },
                        ]}
                        selectedOption={form.gender}
                        onSelectedOption={(value) => setForm((prev) => ({
                            ...prev,
                            gender: value
                        }))}
                    />

                    <InputField
                        label='Date of Birth'
                        placeholder='Date of Birth'
                        isSelectDate
                        selectedDate={form.dob}
                        onChangeDate={(value) => setForm((prev) => ({
                            ...prev,
                            dob: value
                        }))}
                    />
                </View>

                {/* end to profile form */}

            </ScrollView>
            <CustomButton loading={isPending} title='Continue' rounded="full" onPress={onSubmit} />
        </SafeAreaView>
    )
}

export default CreateProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingBottom: 25,
        gap: 25,
    },

    scroll_container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fff",
        flexDirection: "column",
        paddingHorizontal: 12,
        gap: 35,
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
        marginTop: 30
    },
    edit_icon: {
        width: 35,
        height: 35,
        position: "absolute",
        bottom: 0,
        right: 0
    },
    profile_form_container: {
        display: "flex",
        gap: 35,
        paddingBottom: 10
    }
})
