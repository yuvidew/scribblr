import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../feature/bookmarks/_components/header";
import { Image } from "expo-image";
import { icons } from "../../../constants/icons";
import { color } from "../../../constants/colors";
import ArticleCard from "../../..//feature/bookmarks/_components/bookmarks-article-card";
import ArticleCard2 from "../../../feature/bookmarks/_components/bookmarks-article-card-2";

const articles = [
    {
        img: "https://i.pinimg.com/1200x/a7/02/d2/a702d26b7fd0872eb8f81fd9180459fb.jpg",
        text: "10 tips for boosting your productivity",
        author_img:
            "https://i.pinimg.com/736x/3f/2c/13/3f2c1327e2c1c67238caef88345d14b5.jpg",
        author_text: "Alex",
        time: "5 days ago",
    },
    {
        img: "https://i.pinimg.com/736x/33/0c/30/330c305bcb959a4517041e43edae0c31.jpg",
        text: "How to stay focused while working remotely",
        author_img:
            "https://i.pinimg.com/736x/3c/bc/8a/3cbc8a0b2e6c721a04c072c32ef517b8.jpg",
        author_text: "Sophie",
        time: "2 days ago",
    },
    {
        img: "https://i.pinimg.com/736x/c5/f8/ff/c5f8ffa4b4fa6777147355c624bc8bcd.jpg",
        text: "Morning routines that actually work",
        author_img:
            "https://i.pinimg.com/736x/ae/e6/d4/aee6d45245609592339c8508ae27182d.jpg",
        author_text: "Jordan",
        time: "1 week ago",
    },
    {
        img: "https://i.pinimg.com/1200x/cd/42/03/cd4203a4d62c8947cc226cbb98fec48d.jpg",
        text: "Design thinking: how to innovate smarter",
        author_img:
            "https://i.pinimg.com/1200x/69/be/99/69be995c82bb0ad0a9c6cb6caa891b52.jpg",
        author_text: "Emma",
        time: "3 days ago",
    },
    {
        img: "https://i.pinimg.com/736x/d6/12/a3/d612a353335081d9e5e84503f51b4d3c.jpg",
        text: "The future of remote collaboration tools",
        author_img:
            "https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg",
        author_text: "Liam",
        time: "6 hours ago",
    },
    {
        img: "https://i.pinimg.com/1200x/dc/67/65/dc6765f9029f359d7acc7f1eb12529cd.jpg",
        text: "5 UI design trends to watch in 2025",
        author_img:
            "https://i.pinimg.com/1200x/b4/f0/4d/b4f04de35a64a288d4a325ef3ca3be6e.jpg",
        author_text: "Mia",
        time: "1 day ago",
    },
    {
        img: "https://i.pinimg.com/736x/d6/12/a3/d612a353335081d9e5e84503f51b4d3c.jpg",
        text: "How to build better habits that last",
        author_img:
            "https://i.pinimg.com/736x/7e/46/c6/7e46c6d2798eff446b365c5246f4c9ca.jpg",
        author_text: "Ethan",
        time: "3 weeks ago",
    },
    {
        img: "https://i.pinimg.com/1200x/d1/4e/d5/d14ed53991e2a3ec0b364a91e680563a.jpg",
        text: "A beginner’s guide to mindfulness at work",
        author_img:
            "https://i.pinimg.com/736x/d3/7c/2b/d37c2b5d09c1cdfa805d6487ea80d10f.jpg",
        author_text: "Olivia",
        time: "4 days ago",
    },
    {
        img: "https://i.pinimg.com/736x/77/ba/5d/77ba5d2f4aeb52aee3d28da131191055.jpg",
        text: "How to overcome creative burnout",
        author_img:
            "https://i.pinimg.com/1200x/55/99/e8/5599e8d8b9c7a336a22f0406128b2533.jpg",
        author_text: "Noah",
        time: "1 month ago",
    },
    {
        img: "https://i.pinimg.com/736x/42/cc/69/42cc69b35f9e7f2bd48b6bf266b2906a.jpg",
        text: "Why feedback matters more than ever",
        author_img:
            "https://i.pinimg.com/736x/07/58/e9/0758e9e73b8d9a802d189a621861485f.jpg",
        author_text: "Ava",
        time: "2 weeks ago",
    },
    {
        img: "https://i.pinimg.com/1200x/cd/32/12/cd321214048051b835b278078cbb2ed8.jpg",
        text: "Top 7 productivity apps for developers",
        author_img:
            "https://i.pinimg.com/1200x/55/99/e8/5599e8d8b9c7a336a22f0406128b2533.jpg",
        author_text: "Daniel",
        time: "8 hours ago",
    },
];

const Bookmarks = () => {
    const [selectDisplayCard, setSelectDisplayCard] = useState<
        "grid-1" | "grid-4"
    >("grid-1");

    return (
        <ScrollView style={styles.scroll_container}>
            <SafeAreaView style={styles.container}>
                {/*start header  */}
                <Header />
                {/*end header  */}

                {/* start to article count and grid options */}
                <View style={styles.article_count_container}>
                    <Text style={styles.article_count}>{articles.length} Articles</Text>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        {/* TODO: open a new search screen */}
                        <TouchableOpacity onPress={() => setSelectDisplayCard("grid-1")}>
                            <Image
                                source={icons.grid1Icon}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                }}
                                tintColor={
                                    selectDisplayCard === "grid-1"
                                        ? color.primary[800]
                                        : color.secondary[500]
                                }
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setSelectDisplayCard("grid-4")}>
                            <Image
                                source={icons.grid4Icon}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                }}
                                tintColor={
                                    selectDisplayCard === "grid-4"
                                        ? color.primary[800]
                                        : color.secondary[500]
                                }
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* end to article count and grid options */}

                {selectDisplayCard === "grid-4" ? (
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                        }}
                    >
                        {articles.map((article, index) => (
                            <ArticleCard key={index} {...article} />
                        ))}
                    </View>
                ) : (
                    articles.map((article, index) => (
                        <ArticleCard2 key={index} {...article} />
                    ))
                )}

                {/* end to bookmarks article cards */}
            </SafeAreaView>
        </ScrollView>
    );
};

export default Bookmarks;

const styles = StyleSheet.create({
    scroll_container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    container: {
        paddingBottom: 80,
        gap: 25,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        flex: 1,
    },

    article_count_container: {
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },

    article_count: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 16,
    },
    grid_1_container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});
