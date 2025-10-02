import { StyleSheet, Text, View } from "react-native";
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { image } from "../../constants/image";
import Swiper from "react-native-swiper";
import { Image } from "expo-image";
import { color } from "../../constants/colors";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const welcome_content = [
    {
        img: image.welcome1,
        title: "Read interesting articles every single day!",
        content:
            "Dive into curated stories tailored to your interests and stay inspired with fresh perspectives daily.",
    },
    {
        img: image.welcome2,
        title: "Create & publish your own articles to the world!",
        content:
            "Share your voice with a global community and see your ideas reach readers everywhere.",
    },
    {
        img: image.welcome3,
        title: "Let's connect with others right now!",
        content:
            "Join lively conversations, follow fellow creators, and build meaningful connections in the Scribblr community.",
    },
];

const WelcomeScreen = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === welcome_content.length - 1;
    return (
        <SafeAreaView style={styles.container}>
            {/* start to swiper*/}
            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {welcome_content.map((item, index) => (
                    <View key={index} style={styles.slide}>
                        <Image source={item.img} style={styles.image} resizeMode="cover" />

                        <View style={styles.textWrapper}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.content}>{item.content}</Text>
                        </View>
                    </View>
                ))}
            </Swiper>
            {/* end  to swiper*/}

            {/* start to skip or next button */}
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    gap: 8,
                    width: "100%",
                }}
            >
                <CustomButton
                    title="Skip"
                    rounded="full"
                    bgVariant="secondary"
                    textVariant="primary"
                    width="half"
                    onPress={() => router.replace("/(auth)/sign-up")}
                />

                <CustomButton
                    title={isLastSlide ? "Get Stared" : "Next"}
                    rounded="full"
                    bgVariant="primary"
                    textVariant="secondary"
                    width="half"
                    onPress={() =>
                        isLastSlide
                            ? router.replace("/(auth)/sign-up")
                            : swiperRef.current?.scrollBy(1)
                    }
                />
            </View>
            {/* end to skip or next button */}
        </SafeAreaView>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        position: "relative",
        padding: 12,
        gap: 10,
    },

    dot: {
        width: 7,
        height: 7,
        marginHorizontal: 2,
        backgroundColor: color.secondary[200],
        borderRadius: 100,
    },
    activeDot: {
        width: 32,
        height: 7,
        marginHorizontal: 2,
        backgroundColor: color.primary[800],
        borderRadius: 100,
    },
    slide: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 26,
    },
    image: {
        width: "100%",
        height: 450,
    },
    textWrapper: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingHorizontal: 8,
        gap: 20,
    },
    title: {
        textAlign: "center",
        color: color.secondary[900],
        fontSize: 24,
        fontFamily: "Jakarta-Bold",
    },
    content: {
        textAlign: "center",
        color: color.secondary[600],
        fontSize: 18,
        fontFamily: "Jakarta-Medium",
        marginHorizontal: 20,
        marginTop: 12,
    },
});
