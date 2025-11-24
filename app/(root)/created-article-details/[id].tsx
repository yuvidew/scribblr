import { Image } from "expo-image";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ErrorState from "../../../components/Error-state";
import LoadingState from "../../../components/loading-state";
import { color } from "../../../constants/colors";
import DeleteArticleDrawer from "../../../feature/created-article-details/_components/delete-article-drawer";
import Header from "../../../feature/created-article-details/_components/header";
import { useGetArticleById } from "../../../global-api-function/hooks/use-get-article-by-id";
import MarkdownContent from "../../../components/markdown-content";



const ArticleDetails = () => {
    const { data, isError, isPending } = useGetArticleById();

    const [open, setOpen] = useState(false);

    const article = data  ? data.article : undefined;

    return (
        <>
            <ScrollView style={styles.scroll_container}>
                <SafeAreaView style={styles.container}>
                    {/* start to header */}
                    <Header onOpenChange={setOpen} is_published={article?.is_published as number} />
                    {/* end to header */}

                    {isPending ? (
                        <LoadingState />
                    ) : isError || !article  ? (
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
                                        uri: article.image_url,
                                    }}
                                />
                            </View>
                            {/* end to image*/}

                            {/* start to article title */}
                            <Text style={styles.article_title}>
                                {article.title}
                            </Text>
                            {/* end to article title */}

                            <TouchableOpacity style={styles.badge}>
                                <Text style={styles.badgeText}>{article.category}</Text>
                            </TouchableOpacity>


                            <MarkdownContent>
                                {article.ai_generated_content}
                            </MarkdownContent>
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
