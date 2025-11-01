import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Header from "../../../feature/create-article/_components/header";
import { color } from "../../../constants/colors";
import { icons } from "../../../constants/icons";
import CustomButton from "../../../components/CustomButton";
import topics from "../../../lib/topics.json";
import InputField2 from "../../../components/inputField2";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { useStoreImage } from "../../../zustand/manage_image";
import { useUploadProfileImage } from "../../../global-api-function/hooks/use-upload-profile-image";
import { CreateArticleType } from "../../../types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCreateArticle } from "../../../feature/create-article/hooks/use-create-article";

const CreateArticle = () => {
    const { image, setImage } = useStoreImage();
    const { mutate: onUploadImage } = useUploadProfileImage();
    const { mutate: onCreateArticle, isPending } = useCreateArticle()

    const [form, setForm] = useState<CreateArticleType>({
        title: "",
        description: "",
        interest: "",
    })

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

    const onChangeValue = (
        key: "title" | "description" | "interest",
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const onSubmit = async () => {
        const user_id = await AsyncStorage.getItem("user_profile_id");

        if (!image || !form.title.trim() || !form.description.trim()) {
            Toast.show({
                type: "error",
                text1: "Please add a title, description, and image before publishing.",
                position: "top",
                visibilityTime: 3000,
            });
            return;
        }

        if (!user_id) {
            Toast.show({
                type: "error",
                text1: "We couldn’t find your profile. Please sign in again.",
                position: "top",
                visibilityTime: 3000,
            });
            return;
        }

        onCreateArticle({
            ...form,
            user_id: user_id as string,
            image_url: image
        });
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <Header />

                <View style={styles.create_form}>
                    {/* Upload / Generate Image */}
                    {image ? (
                        <View style={styles.uploaded_image_box}>
                            <Image
                                style={styles.uploaded_image}
                                resizeMode="cover"
                                source={{ uri: image }}
                            />
                        </View>
                    ) : (
                        <TouchableOpacity onPress={onPickImage} style={styles.upload_image_box}>
                            <Image
                                source={icons.imageIcon}
                                style={styles.upload_image}
                                resizeMode="contain"
                                tintColor={color.secondary[500]}
                            />
                            <Text style={styles.upload_image_text}>
                                Upload or Generate image
                            </Text>
                        </TouchableOpacity>
                    )}

                    {/* Title Input */}

                    <InputField2
                        placeholder="Enter title"
                        isInputText={true}
                        value={form.title}
                        onChangeText={(value) => onChangeValue("title", value)}
                    />


                    <InputField2
                        placeholder="Select a category"
                        isDropDown
                        topics={topics}
                        value={form.interest}
                        onSelectedOption={(value) => onChangeValue("interest", value)}
                    />

                    {/* Prompt Input */}
                    <InputField2
                        placeholder="Enter prompt"
                        isTextarea
                        value={form.description}
                        onChangeText={(value) => onChangeValue("description", value)}
                    />

                    {/* Generate Button */}
                    <CustomButton
                        title="Generate article"
                        IconRight={
                            <Image
                                source={icons.aiIcon}
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                                tintColor="#fff"
                            />
                        }
                        loading={isPending}
                        onPress={onSubmit}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default CreateArticle;

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
        gap: 40,
    },
    upload_image_box: {
        height: 270,
        backgroundColor: color.secondary[200],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },

    uploaded_image_box: {
        width: "100%",
        height: 270,
        borderRadius: 15,
        overflow: "hidden",
    },
    uploaded_image: {
        width: "100%",
        height: "100%"
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
        borderWidth: 1,
        borderColor: color.secondary[400],
        borderRadius: 10,
    },
    category_container: {
        position: "relative",
    },
    category_select: {
        borderWidth: 1,
        borderColor: color.secondary[400],
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    category_text: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 16,
    },
    icon: {
        width: 22,
        height: 22,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 15,
        width: "90%",
        maxHeight: "70%",
        padding: 15,
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: color.secondary[200],
    },
    optionText: {
        marginLeft: 10,
        fontFamily: "Jakarta-Medium",
        fontSize: 16,
        color: color.secondary[800],
    },
    radioOuterCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: color.primary[600],
        justifyContent: "center",
        alignItems: "center",
    },
    radioInnerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: color.primary[600],
    },
    input_Content: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontFamily: "Jakarta-SemiBold",
        fontSize: 18,
        color: color.secondary[800],
        borderWidth: 1,
        borderColor: color.secondary[400],
        borderRadius: 10,
        height: 230,
    },
});
