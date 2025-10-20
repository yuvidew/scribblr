import { router } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { color } from "../../constants/colors";
import BackArrowProgressBar from "../../feature/auth/_components/back-arrow-progressbar";
import { useSelectInterestTopics } from "../../feature/auth/hook/use-select-interest-topics";

const blogTopics = [
    "Personal Development",
    "Education",
    "Design",
    "Health",
    "Economy",
    "Music",
    "Lifestyle",
    "Technology",
    "Travel",
    "Food",
    "Fashion",
    "Sports",
    "Science",
    "Environment",
    "Politics",
    "Business",
    "Art",
    "Culture",
    "Entertainment",
    "Fitness",
    "Parenting",
    "Photography",
    "Gaming",
    "Finance",
    "History",
    "Books & Literature",
    "Psychology",
    "Social Media",
    "Movies & TV",
    "Automobile",
];

interface Props {
    onProgressState: () => void;
}

/**
 * SelectInterestTopic - A component that allows users to select multiple topics of interest.
 *
 * @param {Props} props - Component props
 * @param {() => void} props.onProgressState - Callback invoked when the "Continue" button is pressed
 *
 * @example
 * <SelectInterestTopic onProgressState={() => console.log("Next step")} />
 */

const SelectInterestTopic = () => {
    const { mutate } = useSelectInterestTopics();
    const [selectTopics, setSelectTopics] = useState<string[]>([]);

    const onSelectTopic = (topic: string) => {
        if (selectTopics.includes(topic)) {
            setSelectTopics(selectTopics.filter((t) => t !== topic));
        } else {
            setSelectTopics([...selectTopics, topic]);
        }
    };

    const onSubmit = () => {
        mutate(selectTopics, {
            onSuccess: (result) => {
                if (result) 
                router.push("/(auth)/follow-people")
            },
        });

    };

    return (
        <SafeAreaView style={styles.container}>
            <BackArrowProgressBar />
            {/* start to title or description */}
            <View style={styles.container_description}>
                <Text style={styles.title}>Select your topic of interest 📑</Text>

                <Text style={styles.description}>
                    Select topic of interest for better recommendation or you can skip it
                </Text>
            </View>
            {/* end to title or description */}

            {/* start to topics list */}
            <ScrollView contentContainerStyle={styles.topics_container}>
                <View style={styles.badgeContainer}>
                    {blogTopics.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.badge,
                                selectTopics.includes(category)
                                    ? styles.selectedBadgeBG
                                    : styles.badgeBG,
                            ]}
                            onPress={() => onSelectTopic(category)}
                        >
                            <Text
                                style={[
                                    styles.badgeText,
                                    selectTopics.includes(category)
                                        ? styles.badgeTextColor
                                        : styles.selectedBadgeTextColor,
                                ]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            {/* end to topics list */}

            {/* start to skip button and continue button */}
            <View style={styles.button_container}>
                <CustomButton
                    title="Skip"
                    rounded="full"
                    width="half"
                    bgVariant="secondary"
                    textVariant="primary"
                />
                <CustomButton
                    disabled={selectTopics.length === 0}
                    title="Continue"
                    rounded="full"
                    width="half"
                    onPress={onSubmit}
                />
            </View>
            {/* end to skip button and continue button */}
        </SafeAreaView>
    );
};

export default SelectInterestTopic;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fff",
        // position: "relative",
        paddingHorizontal: 24,
        gap: 35,

        paddingBottom: 85,
    },

    container_description: {
        display: "flex",
        gap: 18,
    },

    title: {
        fontFamily: "Jakarta-Bold",
        fontSize: 30,
    },

    description: {
        fontFamily: "Jakarta",
        fontSize: 17,
    },

    topics_container: {
        // flex: 1,
        flexGrow: 1,
        maxHeight: 560,
    },
    badgeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        // gap: 1,
    },
    badge: {
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginBottom: 10,
        marginRight: 10,
        borderWidth: 1.5,
        borderColor: color.primary[800],
    },
    badgeText: {
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "Jakarta-SemiBold",
    },

    badgeTextColor: {
        color: "#fff",
    },

    selectedBadgeTextColor: {
        color: color.primary[800],
    },

    badgeBG: {
        backgroundColor: "#FFFFFF",
    },

    selectedBadgeBG: {
        backgroundColor: color.primary[800],
    },

    button_container: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        justifyContent: "space-between",
    },
});
