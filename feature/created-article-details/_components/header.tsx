import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { color } from '../../../constants/colors';
import Popover from "react-native-popover-view";
import { Image } from 'expo-image';
import { icons } from '../../../constants/icons';
import { usePublishArticle } from '../hooks/use-publish-aticle';

interface Props {
    onOpenChange : (value : boolean) => void;
    is_published : number
}

/**
 * Header for the created article screen with publish toggle and contextual actions.
 * @param {(value: boolean) => void} onOpenChange Triggers the delete drawer when true.
 *
 * @example
 * const [drawerOpen, setDrawerOpen] = useState(false);
 *
 * return (
 *   <>
 *     <Header onOpenChange={setDrawerOpen} />
 *     <DeleteArticleDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
 *   </>
 * );
 */
const Header = ({onOpenChange, is_published} : Props) => {
    const {mutate : onPublished} = usePublishArticle()
    const [isPublished, setIsPublished] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const menuAnchorRef = useRef<React.ComponentRef<typeof TouchableOpacity> | null>(null);


    useEffect(() => {
        setIsPublished(is_published === 1 ? true : false)
    }, [is_published])

    return (
        <View style={styles.container}>
            <Text style={styles.header_heading}>Created article</Text>

            <View style={styles.published_box}>
                <TouchableOpacity
                    style={[
                        styles.badge,
                        isPublished
                            ? styles.selectedBadgeBG
                            : styles.badgeBG,
                    ]}
                    onPress={() =>{
                        setIsPublished((prev) => !prev);
                        onPublished();
                    }}
                >
                    <Text
                        style={[
                            styles.badgeText,
                            isPublished
                                ? styles.badgeTextColor
                                : styles.selectedBadgeTextColor,
                        ]}
                    >
                        {isPublished ? "Published" : "Publish"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    ref={menuAnchorRef}
                    onPress={() => setVisible(true)}
                >
                    <Image
                        source={icons.menuIcon}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25
                        }}
                    />
                </TouchableOpacity>

                <Popover
                    isVisible={visible}
                    from={menuAnchorRef as unknown as React.RefObject<React.Component>}
                    onRequestClose={() => setVisible(false)}
                >
                    <View style={{ padding: 10}}>
                        <TouchableOpacity 
                            style = {styles.delete_popover}
                            onPress={() => {
                                setVisible(false);
                                onOpenChange(true);
                            }}
                        >
                            <Image 
                                source={icons.deleteIcon} 
                                style = {styles.delete_popover_icon} 
                                resizeMode="contain" 
                                tintColor={color.primary[800]} 
                            />
                            <Text style={{ fontSize: 16 }}>Delete article</Text>
                        </TouchableOpacity>

                    </View>

                </Popover>
            </View>
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
        backgroundColor: "#fff",
        paddingBottom: 15,
    },

    header_heading: {
        fontFamily: "Jakarta-Bold",
        fontSize: 23
    },

    published_box: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 10
    },

    badge: {
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginBottom: 10,
        marginRight: 10,
        borderWidth: 1.5,
        borderColor: color.primary[800],
    },
    badgeText: {
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "Jakarta-SemiBold",
    },

    badgeTextColor: {
        color: "#fff",
    },

    selectedBadgeTextColor: {
        color: color.primary[800],
    },

    badgeBG: {
        backgroundColor: "#FFFFFF",
    },

    selectedBadgeBG: {
        backgroundColor: color.primary[800],
    },

    delete_popover : {
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        gap : 10,
        width : "100%",
        padding : 8,
        borderRadius : 20
    },

    delete_popover_icon : {
        width : 23,
        height : 23
    }
})
