import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import { color } from '../constants/colors'
import { InputFields2Props } from '../types/type'
import { Image } from 'expo-image'
import { icons } from '../constants/icons'

/**
 * Controlled input field that supports plain text, multiline textarea, and selectable topic modes.
 *
 * @param {string} [label] Optional label rendered above the input.
 * @param {object} [labelStyle] Additional styles for the label text.
 * @param {string} [placeholder] Placeholder text shown when no value is present.
 * @param {boolean} [isPassword] If true, masks the input value.
 * @param {string} [value] Current value for the input element.
 * @param {object} [inputStyle] Custom styles for the TextInput in text modes.
 * @param {object} [containerStyle] Custom styles for the root wrapper.
 * @param {object} [iconStyle] Custom styles for the dropdown icon.
 * @param {boolean} [secureTextEntry] Controls secure text entry for password fields.
 * @param {boolean} [isSelectDate] Enables date selection mode (not currently used here).
 * @param {string} [textContentType] Content type hint for the TextInput component.
 * @param {Date} [selectedDate] Currently selected date value (used when date picker is active).
 * @param {(date: Date) => void} [onChangeDate] Callback fired when a date is picked.
 * @param {boolean} [isDropDown] Flag indicating dropdown usage (handled via topics list).
 * @param {string[]} [options] Legacy options prop; topics array is used instead.
 * @param {(option: string) => void} [onSelectedOption] Callback fired when a topic is chosen.
 * @param {boolean} [isInputText] Switches component to single-line text mode.
 * @param {boolean} [isTextarea] Switches component to multiline textarea mode.
 * @param {{ title: string }[]} [topics] Collection of topics displayed inside the modal dropdown.
 * @param {...any} props Additional TextInput props passed down to the rendered input.
 *
 * @example
 * <InputField2
 *   label="Topic"
 *   placeholder="Select a topic"
 *   topics={[{ title: "Design" }, { title: "Development" }]}
 *   onSelectedOption={(value) => console.log(value)}
 * />
 */
const InputField2 = (
    {
        label,
        labelStyle,
        placeholder,
        isPassword = false,
        value,
        inputStyle,
        containerStyle,
        iconStyle,
        secureTextEntry = false,
        isSelectDate = false,
        textContentType,
        selectedDate,
        onChangeDate,
        isDropDown,
        options,
        onSelectedOption,
        isInputText,
        isTextarea,
        topics,
        ...props
    }: InputFields2Props
) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setModalVisible(false);
        onSelectedOption?.(option)
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.wrapper}>
                    {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
                    {
                        isInputText ? (
                            <TextInput
                                style={styles.input_title}
                                textContentType="name"
                                placeholder={placeholder}
                                placeholderTextColor={color.secondary[400]}
                                value={value}
                                {...props}
                            />
                        )
                            :
                            isTextarea ? (
                                <TextInput
                                    style={styles.input_Content}
                                    multiline={true}
                                    textAlignVertical="top"
                                    placeholder={placeholder}
                                    placeholderTextColor={color.secondary[400]}
                                    value={value}
                                    {...props}
                                />
                            )
                                : (
                                    <View style={styles.category_container}>
                                        <TouchableOpacity
                                            style={styles.category_select}
                                            onPress={() => setModalVisible(true)}
                                        >
                                            <Text
                                                style={[
                                                    styles.category_text,
                                                    {
                                                        color: selectedOption
                                                            ? color.secondary[800]
                                                            : color.secondary[400],
                                                    },
                                                ]}
                                            >
                                                {selectedOption || placeholder}
                                            </Text>

                                            <Image
                                                source={icons.downArrow}
                                                style={styles.icon}
                                                tintColor={color.primary[800]}
                                            />
                                        </TouchableOpacity>

                                        {/* Modal */}
                                        <Modal
                                            animationType="fade"
                                            transparent={true}
                                            visible={modalVisible}
                                            onRequestClose={() => setModalVisible(false)}
                                        >
                                            <Pressable
                                                style={styles.modalOverlay}
                                                onPress={() => setModalVisible(false)}
                                            >
                                                <View style={styles.modalContent}>
                                                    <ScrollView>
                                                        {topics?.map(({ title }) => (
                                                            <TouchableOpacity
                                                                key={title}
                                                                style={styles.optionContainer}
                                                                onPress={() => handleSelect(title)}
                                                            >
                                                                {/* Radio Circle */}
                                                                <View style={styles.radioOuterCircle}>
                                                                    {selectedOption === title && (
                                                                        <View style={styles.radioInnerCircle} />
                                                                    )}
                                                                </View>

                                                                {/* Option Text */}
                                                                <Text style={styles.optionText}>{title}</Text>
                                                            </TouchableOpacity>
                                                        ))}
                                                    </ScrollView>
                                                </View>
                                            </Pressable>
                                        </Modal>
                                    </View>
                                )
                    }
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default InputField2

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        display: "flex",
    },
    label: {
        fontSize: 16,
        fontFamily: "Jakarta-Bold",
        color: color.secondary[800],
        marginBottom: 6,
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
})
