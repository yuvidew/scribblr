import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { icons } from '../../../constants/icons';
import { color } from '../../../constants/colors';
import { useAddAndRemoveBookmarks } from '../../../global-api-function/hooks/use-add-and-remove-bookmarks';

interface Props {
    is_bookmarked: boolean;
    article_id : number
}

const Header = ({
    is_bookmarked ,
    article_id,
}: Props) => {
    const {mutate : onAddAndRemoveBookmark} = useAddAndRemoveBookmarks();
    const router = useRouter();

    console.log("the is bookmarked" , is_bookmarked);


    return (
        <View style={styles.container}>
            {/* start to back button */}
            <TouchableOpacity style={styles.icons_button} onPress={() => router.back()}>
                <Image
                    source={icons.backArrow}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                    }}
                    tintColor={"#fff"}
                />
            </TouchableOpacity>
            {/* end to back button */}

            {/* start to more buttons */}
            <View style={styles.view_more_buttons}>
                <TouchableOpacity style={styles.icons_button} onPress={() => onAddAndRemoveBookmark(article_id)}>
                    <Image
                        source={is_bookmarked
                            ? icons.bookmark_selected
                            : icons.bookmark
                        }
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                        }}
                        tintColor={is_bookmarked ? color.primary[600] : "#fff"}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.icons_button} onPress={() => router.back()}>
                    <Image
                        source={icons.menuIcon}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                        }}
                        tintColor={"#fff"}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.icons_button} onPress={() => router.back()}>
                    <Image
                        source={icons.moreIcon}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                        }}
                        tintColor={"#fff"}
                    />
                </TouchableOpacity>
            </View>
            {/* end to more buttons */}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingBottom: 15,
    },

    icons_button: {
        backgroundColor: "#66656390",
        padding: 8,
        borderRadius: 7
    },

    view_more_buttons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    }
})