import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { icons } from '../../../constants/icons'
import { color } from '../../../constants/colors'
import ArticleCard from '../../../components/article-card'
import { useGetYourArticles } from '../hook/use-get-your-articles'
import LoadingState from '../../../components/loading-state'
import ErrorState from '../../../components/Error-state'
import { timeAgo } from '../../../lib/util'

const YourArticle = () => {
    const { data, isError, isPending } = useGetYourArticles();


    if (isPending) return <LoadingState />;
    if (isError) return <ErrorState title="Failed to fetch recent article" />;
    if (!data) return <ErrorState title="No recent articles yet" />;

    return (
        <View style={styles.container}>
            {/* start to header and  arrow */}
            <View style={styles.heading_arrow}>
                <Text style={styles.heading}>Your Article</Text>

                <TouchableOpacity>
                    <Image
                        source={icons.right_arrow}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25
                        }}
                        tintColor={color.primary[800]}
                    />
                </TouchableOpacity>
            </View>
            {/* end to header and  arrow */}

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "row" }}>
                    {data.map(({ title, article_id, image_url, created_at, author_name, author_image , is_bookmarked}, index) => (
                        <ArticleCard
                            key={index}
                            widthRange={230}
                            title={title}
                            article_id = {article_id}
                            img={image_url}
                            author_img={author_image}
                            time={timeAgo(created_at)}
                            author_name={author_name}
                            is_bookmarked = {is_bookmarked === 0 }
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default YourArticle

const styles = StyleSheet.create({
    container: {
        gap: 15
    },

    heading_arrow: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    heading: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 18
    },

    box: {
        width: 150,
        height: 150,
        backgroundColor: "#add8e6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        borderRadius: 10,
    },
})