import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { icons } from '../../../constants/icons'
import { color } from '../../../constants/colors'
import ArticleCard from '../../../components/article-card'
import { useGetRecentArticle } from '../hook/use-get-recent-articles'
import ErrorState from '../../../components/Error-state'
import LoadingState from '../../../components/loading-state'
import { timeAgo } from '../../../lib/util'

const RecentArticle = () => {
    const { data, isError, isPending } = useGetRecentArticle();



    if (isPending) return <LoadingState />;
    if (isError) return <ErrorState title="Failed to fetch recent article" />;
    if (!data) return <ErrorState title="No recent articles yet" />;




    return (
        <View style={styles.container}>
            {/* start to header and  arrow */}
            <View style={styles.heading_arrow}>
                <Text style={styles.heading}>Recent Article</Text>

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
                {/* {
                    articles.map((article , index) => (

                        <ArticleCard key={index} {...article} />
                    ))
                } */}
                <View style={{ flexDirection: "row" }}>
                    {data.map(({ title, image_url, created_at, author_name, author_image , is_bookmarked}, index) => (
                        <ArticleCard
                            key={index}
                            widthRange={230}
                            title={title}
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

export default RecentArticle

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