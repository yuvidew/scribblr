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
                            <View >

                            </View>
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
