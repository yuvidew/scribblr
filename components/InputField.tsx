import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Platform,
    Keyboard,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Pressable,
} from "react-native";
import React, { useState } from "react";
import { InputFieldProps } from "../types/type";
import { icons } from "../constants/icons";
import { color } from "../constants/colors";

import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { formatDateToMMDDYYYY } from "../lib/util";

/**
 * InputField - A customizable input component for text, password, date, or dropdown selection.
 *
 * @param {string} label - The label text displayed above the input field.
 * @param {StyleProp<TextStyle>} [labelStyle] - Optional custom style for the label.
 * @param {string} [placeholder] - Placeholder text for the input.
 * @param {boolean} [isPassword=false] - Whether the input is a password field.
 * @param {string} [value] - Value for the text input.
 * @param {StyleProp<TextStyle>} [inputStyle] - Custom style for the TextInput.
 * @param {StyleProp<ViewStyle>} [containerStyle] - Custom style for the input container.
 * @param {StyleProp<ImageStyle>} [iconStyle] - Custom style for the icon.
 * @param {boolean} [secureTextEntry=false] - Whether to mask the input (for passwords).
 * @param {boolean} [isSelectDate=false] - Enable date selection mode.
 * @param {Date} [selectedDate] - Selected date for date picker mode.
 * @param {(value: Date) => void} [onChangeDate] - Callback when a date is selected.
 * @param {boolean} [isDropDown=false] - Enable dropdown mode.
 * @param {{ option: string }[]} [options] - List of dropdown options.
 * @param {string} [selectedOption] - Currently selected dropdown option.
 * @param {(value: string) => void} [onSelectedOption] - Callback when a dropdown option is selected.
 * @param {string} [textContentType] - Type of input (e.g., emailAddress, telephoneNumber, etc.).
 * @param {any} [icon] - Optional icon.
 * @param {...any} [props] - Other TextInput props passed through.
 *
 * @example
 * <InputField
 *   label="Full Name"
 *   placeholder="Enter your full name"
 *   value={name}
 *   onChangeText={setName}
 *   isPassword={false}
 * />
 *
 * <InputField
 *   label="Select Date"
 *   isSelectDate
 *   selectedDate={selectedDate}
 *   onChangeDate={setSelectedDate}
 *   placeholder="MM/DD/YYYY"
 * />
 *
 * <InputField
 *   label="Choose Option"
 *   isDropDown
 *   options={[{ option: "Option 1" }, { option: "Option 2" }, { option: "Option 3" }]}
 *   selectedOption={selectedOption}
 *   onSelectedOption={setSelectedOption}
 *   placeholder="Select an option"
 * />
 */

const InputField = ({
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
    selectedOption,
    onSelectedOption,
    ...props
}: InputFieldProps) => {
    const [isShow, setIsShow] = useState(false);
    const isSecure = isPassword ? !isShow : false;
    const [modalVisible, setModalVisible] = useState(false);
    const [isShowDatePicker, setIsShowDatePicker] = useState(false);

    const handleSelect = (option: string) => {
        onSelectedOption?.(option);
        setModalVisible(false);
    };

    const onSelectDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            onChangeDate?.(selectedDate);
        }
        setIsShowDatePicker(false);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.wrapper}>
                    <Text style={[styles.label, labelStyle]}>{label}</Text>

                    <View style={[styles.container, containerStyle]}>
                        {isSelectDate ? (
                            <>
                                <Text
                                    style={[
                                        styles.date_text,
                                        {
                                            color: selectedDate!
                                                ? color.secondary[800]
                                                : color.secondary[400],
                                        },
                                    ]}
                                >
                                    {selectedDate!
                                        ? formatDateToMMDDYYYY(selectedDate)
                                        : placeholder}
                                </Text>

                                <TouchableOpacity onPress={() => setIsShowDatePicker(true)}>
                                    <Image
                                        source={icons.calender}
                                        style={[styles.icon, iconStyle]}
                                        tintColor={color.primary[800]}
                                    />
                                </TouchableOpacity>

                                {isShowDatePicker && (
                                    <DateTimePicker
                                        value={selectedDate!}
                                        mode="date"
                                        display={Platform.OS === "ios" ? "spinner" : "default"}
                                        onChange={onSelectDate}
                                        textColor={Platform.OS === "ios" ? "#99582a" : "#99582a"}
                                        themeVariant="light"
                                    />
                                )}
                            </>
                        ) : isDropDown ? (
                            <>
                                <Text
                                    style={[
                                        styles.date_text,
                                        {
                                            color: selectedOption!
                                                ? color.secondary[800]
                                                : color.secondary[400],
                                        },
                                    ]}
                                >
                                    {selectedOption! ? selectedOption : placeholder}
                                </Text>

                                <TouchableOpacity onPress={() => setModalVisible(true)}>
                                    <Image
                                        source={icons.downArrow}
                                        style={[styles.icon, iconStyle]}
                                        tintColor={color.primary[800]}
                                    />
                                </TouchableOpacity>

                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => setModalVisible(false)}
                                >
                                    <Pressable
                                        style={styles.modalOverlay}
                                    >
                                        <View style={styles.modalContent}>
                                            {options?.map(({ option }) => (
                                                <TouchableOpacity
                                                    key={option}
                                                    style={styles.optionContainer}
                                                    onPress={() => handleSelect(option)}
                                                >
                                                    {/* Radio Circle */}
                                                    <View style={styles.radioOuterCircle}>
                                                        {selectedOption === option && (
                                                            <View style={styles.radioInnerCircle} />
                                                        )}
                                                    </View>

                                                    {/* Option Text */}
                                                    <Text style={styles.optionText}>{option}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </Pressable>
                                </Modal>
                            </>
                        ) : (
                            <>
                                <TextInput
                                    style={[styles.input, inputStyle]}
                                    placeholder={placeholder}
                                    placeholderTextColor={color.secondary[400]}
                                    secureTextEntry={isSecure}
                                    textContentType={isPassword ? "password" : textContentType}
                                    value={value}
                                    {...props}
                                    keyboardType={
                                        textContentType === "emailAddress"
                                            ? "email-address"
                                            : textContentType === "telephoneNumber"
                                                ? "phone-pad"
                                                : textContentType === "flightNumber"
                                                    ? "numeric"
                                                    : "default"
                                    }
                                />

                                {isPassword && (
                                    <TouchableOpacity onPress={() => setIsShow(!isShow)}>
                                        <Image
                                            source={!isShow ? icons.closeEye : icons.openEye}
                                            style={[styles.icon, iconStyle]}
                                            tintColor={color.primary[800]}
                                        />
                                    </TouchableOpacity>
                                )}
                            </>
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default InputField;

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
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        borderWidth: 1.5,
        borderBottomColor: color.primary[600],
        borderColor: "transparent",
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontFamily: "Jakarta-SemiBold",
        fontSize: 18,
        color: color.secondary[800],
        textAlign: "left",
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: "#6B7280",
        marginLeft: 8,
    },

    date_text: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 18,
        paddingVertical: 12,
    },

    dropDownView: {
        position: "absolute",
        width: "100%",
        left: -0.5,
        bottom: -20,
        backgroundColor: color.secondary[100],
        paddingVertical: 12,
        paddingHorizontal: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent overlay
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 25,
        paddingHorizontal: 25,
        alignItems: "flex-start",
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    radioOuterCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#99582a", // brown border
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    radioInnerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#99582a", // brown fill when selected
    },
    optionText: {
        fontSize: 16,
        color: "#111827",
    },
});
