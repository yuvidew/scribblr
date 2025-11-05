import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../feature/created-article-details/_components/header";
import DeleteArticleDrawer from "../../../feature/created-article-details/_components/delete-article-drawer";
import { Image } from "expo-image";
import Markdown from "react-native-markdown-display";
import { color } from "../../../constants/colors";
import { useGetArticleById } from "../../../feature/created-article-details/hooks/use-get-article-by-id";
import ErrorState from "../../../components/Error-state";
import LoadingState from "../../../components/loading-state";



const ArticleDetails = () => {
    const { data, isError, isPending } = useGetArticleById();

    const [open, setOpen] = useState(false);

    return (
        <>
            <ScrollView style={styles.scroll_container}>
                <SafeAreaView style={styles.container}>
                    {/* start to header */}
                    <Header onOpenChange={setOpen} is_published={data?.article.is_published as number} />
                    {/* end to header */}

                    {isPending ? (
                        <LoadingState />
                    ) : isError ? (
                        <ErrorState />
                    ) : (
                        <View style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 20
                        }}>
                            {/* start to image*/}
                            <View style={styles.image_box}>
                                <Image
                                    style={styles.image}
                                    resizeMode="cover"
                                    source={{
                                        uri: data?.article.image_url,
                                    }}
                                />
                            </View>
                            {/* end to image*/}

                            {/* start to article title */}
                            <Text style={styles.article_title}>
                                {data?.article.title}
                            </Text>
                            {/* end to article title */}

                            <TouchableOpacity style={styles.badge}>
                                <Text style={styles.badgeText}>{data?.article.category}</Text>
                            </TouchableOpacity>

                            <Markdown
                                style={{
                                    body: {
                                        fontFamily: "Jakarta",
                                        color: color.secondary[900],
                                        fontSize: 16,
                                        lineHeight: 26, // More comfortable paragraph spacing
                                    },
                                    heading1: {
                                        fontFamily: "Jakarta-ExtraBold",
                                        fontSize: 28,
                                        lineHeight: 36,
                                        color: color.secondary[900],
                                        marginTop: 24,
                                        marginBottom: 12,
                                    },
                                    heading2: {
                                        fontFamily: "Jakarta-Bold",
                                        fontSize: 24,
                                        lineHeight: 32,
                                        color: color.secondary[800],
                                        marginTop: 20,
                                        marginBottom: 10,
                                    },
                                    heading3: {
                                        fontFamily: "Jakarta-SemiBold",
                                        fontSize: 20,
                                        lineHeight: 28,
                                        color: color.secondary[700],
                                        marginTop: 18,
                                        marginBottom: 8,
                                    },
                                    paragraph: {
                                        fontFamily: "Jakarta-Medium",
                                        color: color.secondary[800],
                                        fontSize: 16,
                                        lineHeight: 26,
                                        marginBottom: 10,
                                    },
                                    strong: {
                                        fontFamily: "Jakarta-Bold",
                                        color: color.secondary[900],
                                        lineHeight: 24,
                                    },
                                    em: {
                                        fontFamily: "Jakarta-Medium",
                                        color: color.secondary[700],
                                        fontStyle: "italic",
                                        lineHeight: 24,
                                    },
                                    link: {
                                        color: "#007aff",
                                        fontFamily: "Jakarta-SemiBold",
                                        textDecorationLine: "underline",
                                        lineHeight: 24,
                                    },
                                    list_item: {
                                        flexDirection: "row",
                                        marginVertical: 6,
                                        lineHeight: 24,
                                    },
                                    bullet_list: {
                                        paddingLeft: 22,
                                    },
                                    ordered_list: {
                                        paddingLeft: 22,
                                    },
                                    code_inline: {
                                        backgroundColor: color.secondary[200],
                                        color: color.secondary[900],
                                        fontFamily: "Jakarta-Medium",
                                        paddingHorizontal: 6,
                                        paddingVertical: 3,
                                        borderRadius: 6,
                                        lineHeight: 20,
                                    },
                                    code_block: {
                                        backgroundColor: color.secondary[200],
                                        color: color.secondary[900],
                                        fontFamily: "Jakarta-Medium",
                                        fontSize: 14,
                                        lineHeight: 22,
                                        padding: 12,
                                        borderRadius: 8,
                                        marginVertical: 10,
                                    },
                                    blockquote: {
                                        borderLeftWidth: 4,
                                        borderLeftColor: color.secondary[500],
                                        paddingLeft: 12,
                                        color: color.secondary[700],
                                        fontStyle: "italic",
                                        lineHeight: 24,
                                        marginVertical: 10,
                                    },
                                    hr: {
                                        backgroundColor: color.secondary[300],
                                        height: 1,
                                        marginVertical: 14,
                                    },
                                }}
                            >
                                {data?.article.ai_generated_content}
                            </Markdown>
                        </View>
                    )}
                </SafeAreaView>
            </ScrollView>
            <DeleteArticleDrawer
                open={open}
                onOpenChange={(value) => setOpen(value)}
            />
        </>
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

    loading_container: {
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    image_box: {
        width: "100%",
        height: 270,
        borderRadius: 15,
        overflow: "hidden",
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
    },

    article_title: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 25,
    },

    badge: {
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginBottom: 10,
        marginRight: 10,
        borderWidth: 1.5,
        borderColor: color.primary[800],
        alignSelf: "flex-start", 
        flexShrink: 0,           
    },
    badgeText: {
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "Jakarta-SemiBold",
        color : color.primary[800],
    },


});
