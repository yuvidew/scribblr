import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { color } from '../../../constants/colors'
import { icons } from '../../../constants/icons'
import { useAddAndRemoveBookmarks } from '../../../global-api-function/hooks/use-add-and-remove-bookmarks'

interface Props {
    article_id: number,
    title: string,
    img: string,
    author_img: string,
    author_name: string,
    time: string,
    is_bookmarked: boolean
}

/**
 * Article card component used in the feed list.
 *
 * @param {number} article_id - Unique ID of the article.
 * @param {string} title - Title of the article.
 * @param {string} img - Main cover image URL of the article.
 * @param {string} author_img - Author's profile image URL.
 * @param {string} author_name - Full name of the author.
 * @param {string} time - Time label (e.g., "2h ago", "Yesterday").
 * @param {boolean} is_bookmarked - Whether the article is already bookmarked or not.
 *
 * @example
 * <ArticleCard
 *    article_id={12}
 *    title="The Future of AI in India"
 *    img="https://example.com/article-image.jpg"
 *    author_img="https://example.com/profile.jpg"
 *    author_name="Yuvraj Dewangan"
 *    time="5 min ago"
 *    is_bookmarked={true}
 * />
 */



const ArticleCard = ({
    article_id,
    title,
    img,
    author_img,
    author_name,
    time,
    is_bookmarked
}: Props) => {
    const { mutate: onAddAndRemoveBookmark } = useAddAndRemoveBookmarks();
    return (
        <TouchableOpacity style={styles.container}>
            {/* TODO: add save button */}
            <View style={styles.img_container}>
                {/* start to bookmark button */}
                <TouchableOpacity
                    style={styles.bookmark_btn}
                    onPress={(e) => {
                        e.stopPropagation();
                        onAddAndRemoveBookmark(article_id);
                    }}
                >
                    <Image
                        source={is_bookmarked
                            ? icons.bookmark
                            : icons.bookmark_selected
                        }
                        style={styles.bookmark_Btn_img}
                        tintColor={color.success[100]}
                    />
                </TouchableOpacity>
                {/* end to bookmark button */}
                <Image source={{
                    uri: img
                }} resizeMode="cover" style={styles.img} />
            </View>

            {/* start to text */}
            <Text style={styles.text} numberOfLines={2}
                ellipsizeMode="tail"
                accessibilityLabel={title}>
                {title.length < 38 ? title : `${title.slice(0, 39)}....`}
            </Text>
            {/* end to text */}

            {/* start to author info */}
            <View style={styles.author_box}>
                <View style={styles.author_image_text}>
                    <Image
                        source={{
                            uri: author_img || "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"
                        }}

                        resizeMode="cover"
                        style={styles.author_image}
                    />

                    <Text style={styles.author_text}>
                        {author_name}
                    </Text>
                </View>

                {/* start time and more option */}
                <View style={styles.time_and_option}>
                    <Text style={styles.time}>
                        {time}
                    </Text>
                </View>
                {/* end time and more option */}

            </View>
            {/* end to author info */}

        </TouchableOpacity>
    )
}

export default ArticleCard

const styles = StyleSheet.create({
    container: {
        width: "48%",
        borderRadius: 10,
        marginBottom: 10,
        gap: 10,
        position: "relative"
    },

    img_container: {
        width: "100%",
        height: 200,
        borderRadius: 15,
        overflow: "hidden"
    },

    bookmark_btn: {
        position: "absolute",
        top: "5%",
        right: "5%",
        backgroundColor: color.primary[800],
        zIndex: 10,
        borderRadius: 10,
        padding: 7
    },

    bookmark_Btn_img: {
        width: 20,
        height: 20
    },

    img: {
        width: "100%",
        height: "100%",
    },

    text: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 18
    },

    author_box: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8
    },

    author_image_text: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    author_image: {
        width: 30,
        height: 30,
        borderRadius: 100
    },
    author_text: {
        fontFamily: "Jakarta-Medium",
        fontSize: 15,
        color: color.primary[800]
    },

    time_and_option: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 8
    },

    time: {
        fontFamily: "Jakarta-Medium",
        fontSize: 14,
        color: color.secondary[600]
    }
})
