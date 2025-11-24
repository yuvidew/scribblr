import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../feature/article-details/_components/header";
import { useGetArticleById } from "../../../global-api-function/hooks/use-get-article-by-id";
import LoadingState from "../../../components/loading-state";
import ErrorState from "../../../components/Error-state";
import MarkdownContent from "../../../components/markdown-content";
import { color } from "../../../constants/colors";
import { useFollowUser } from "../../../global-api-function/hooks/use-follow-user";
import { useLocalSearchParams } from "expo-router";

const ArticleDetails = () => {
    const { id } = useLocalSearchParams();
    const { data, isError, isPending } = useGetArticleById();
    const { mutate: onFollowUser } = useFollowUser();

    if (isPending) return <LoadingState />;
    if (isError) return <ErrorState title="Failed to fetch recent article" />;
    if (!data) return <ErrorState title="No recent articles yet" />;

    return (
        <ScrollView style={styles.scroll_container}>
            <View style={styles.image_container}>
                {/* start to header */}
                <View style={styles.header}>
                    <Header
                        article_id={data.article.id}
                        is_bookmarked={data.article.is_bookmarked === 1 ? true : false}
                    />
                </View>
                {/* end to header */}

                <Image src={data.article.image_url} style={styles.article_image} />
            </View>
            <SafeAreaView style={styles.container}>
                <Text style={styles.article_title}>{data.article.title}</Text>

                {/* start to profile */}
                <View style={styles.profile_view}>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15
                    }}>
                        <Image
                            source={{
                                uri: data.author.profile_image || "https://i.pinimg.com/1200x/49/38/0a/49380ac48394d7c90c3a73cc0e716d30.jpg"
                            }}

                            resizeMode="cover"
                            style={styles.profile_image}
                        />

                        <Text style={styles.author_text}>
                            {data.author.name}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.followButton,
                            data.author.im_following ? styles.followingButton : styles.followButtonActive,
                        ]}
                        onPress={() => {
                            onFollowUser(Number(id))
                        }}
                    >
                        <Text
                            style={[
                                styles.followText,
                                data.author.im_following ? styles.followingText : styles.followTextActive,
                            ]}
                        >
                            {data.author.im_following ? 'Following' : 'Follow'}
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* end to profile */}

                <MarkdownContent>{data.article.ai_generated_content}</MarkdownContent>
            </SafeAreaView>
        </ScrollView>
    );
};

export default ArticleDetails;

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

    header: {
        position: "absolute",
        top: 2,
        left: 0,
        right: 0,
        height: 100,
        paddingHorizontal: 16,
        paddingTop: 16,
        justifyContent: "space-between",
        // backgroundColor: 'rgba(0,0,0,0.4)',
        width: "100%",
        zIndex: 9,
        display: "flex",
        flexDirection: "row",
    },

    image_container: {
        height: 400,
        position: "relative",
    },

    article_image: {
        height: "100%",
        width: "100%",
        objectFit: "cover",
    },

    article_title: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 25,
    },

    profile_view: {
        borderBottomColor: color.secondary[200],
        borderTopColor: color.secondary[200],
        borderWidth: 1.5,
        paddingVertical: 29,
        borderColor: "transparent",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    profile_image: {
        width: 50,
        height: 50,
        borderRadius: 100
    },

    author_text: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 20,
        color: color.primary[800]
    },

    followButton: {
        borderWidth: 1.5,
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    followButtonActive: {
        backgroundColor: color.primary[800],
        borderColor: color.primary[800],
    },
    followingButton: {
        backgroundColor: '#fff',
        borderColor: color.primary[800],
    },
    followText: {
        fontSize: 14,
        fontFamily: 'Jakarta-SemiBold',
    },
    followTextActive: {
        color: '#fff',
    },
    followingText: {
        color: color.primary[800],
    },
});
