import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../feature/explore/_components/header";
import { SearchComp } from "../../../components/search";
import MostPopularArticle from "../../../feature/explore/_components/most-popular-article";
import { icons } from "../../../constants/icons";
import { color } from "../../../constants/colors";

const topics = [
    { title: "Personal Development", articles_count: 28 },
    { title: "Education", articles_count: 34 },
    { title: "Design", articles_count: 19 },
    { title: "Health", articles_count: 45 },
    { title: "Economy", articles_count: 25 },
    { title: "Music", articles_count: 17 },
    { title: "Lifestyle", articles_count: 30 },
    { title: "Technology", articles_count: 42 },
    { title: "Travel", articles_count: 26 },
    { title: "Food", articles_count: 31 },
    { title: "Fashion", articles_count: 23 },
    { title: "Sports", articles_count: 37 },
    { title: "Science", articles_count: 29 },
    { title: "Environment", articles_count: 22 },
    { title: "Politics", articles_count: 15 },
    { title: "Business", articles_count: 39 },
    { title: "Art", articles_count: 20 },
    { title: "Culture", articles_count: 16 },
    { title: "Entertainment", articles_count: 41 },
    { title: "Fitness", articles_count: 33 },
    { title: "Parenting", articles_count: 12 },
    { title: "Photography", articles_count: 24 },
    { title: "Gaming", articles_count: 38 },
    { title: "Finance", articles_count: 27 },
    { title: "History", articles_count: 13 },
    { title: "Books & Literature", articles_count: 21 },
    { title: "Psychology", articles_count: 36 },
    { title: "Social Media", articles_count: 18 },
    { title: "Movies & TV", articles_count: 44 },
    { title: "Automobile", articles_count: 14 },
];


const Explore = () => {
    const [value, setValue] = useState("");
    return (
        <ScrollView style={styles.scroll_container}>
            <SafeAreaView style={styles.container}>
                {/* start to header */}
                <Header />
                {/* end to header */}

                {/* start to search */}
                <SearchComp value={value} onChange={setValue} />
                {/* end to search */}

                {/* start to most popular */}
                <MostPopularArticle />
                {/* end to most popular */}

                {/* start explore by topics */}
                <View style={styles.topics_container}>
                    {/* start to heading and  arrow */}
                    <View style={styles.heading_arrow}>
                        <Text style={styles.heading}>Explore by topics </Text>

                        <TouchableOpacity>
                            <Image
                                source={icons.right_arrow}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                }}
                                tintColor={color.primary[800]}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* end to heading and  arrow */}

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: "row" }}>

                        </View>
                    </ScrollView>
                </View>
                {/* end explore by topics */}
            </SafeAreaView>
        </ScrollView>
    );
};

export default Explore;

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

    topics_container: {
        gap: 15,
    },
    heading_arrow: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    heading: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 18,
    },
});
