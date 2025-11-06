import React, { useEffect, useRef, useState } from 'react';
import { Text, Animated, Dimensions, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { color } from '../../../constants/colors';
import CustomButton from '../../../components/CustomButton';
import { useDeleteArticleById } from '../hooks/use-delete-article-by-id';

const screenHeight = Dimensions.get('window').height;

interface Props {
    open: boolean;
    onOpenChange: (value: boolean) => void;
}

/**
 * Bottom drawer component that animates in for delete confirmation flows.
 * @param {boolean} open Controls whether the drawer is visible.
 * @param {(value: boolean) => void} onOpenChange Callback invoked when the drawer should toggle visibility.
 * @example
 * const [drawerOpen, setDrawerOpen] = useState(false);
 *
 * return (
 *   <>
 *     <Button title="Delete Article" onPress={() => setDrawerOpen(true)} />
 *     <DeleteArticleDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
 *   </>
 * );
 */
const DeleteArticleDrawer = ({ open, onOpenChange }: Props) => {
    const {mutate: onDeleteArticle, isPending} = useDeleteArticleById();
    const drawerAnim = useRef(new Animated.Value(screenHeight)).current;
    const backdropAnim = useRef(new Animated.Value(0)).current;
    const [visible, setVisible] = useState(open); 

    useEffect(() => {
        if (open) setVisible(true);

        Animated.parallel([
            Animated.timing(drawerAnim, {
                toValue: open ? 0 : screenHeight,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(backdropAnim, {
                toValue: open ? 1 : 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (!open) setVisible(false); 
        });
    }, [open]);

    if (!visible) return null;

    return (
        <>
            {/* Backdrop with blur */}
            <TouchableWithoutFeedback onPress={() => onOpenChange(false)}>
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: backdropAnim,
                        zIndex: 5,
                    }}
                >
                    <BlurView intensity={50} tint="dark" style={{ flex: 1 }} />
                </Animated.View>
            </TouchableWithoutFeedback>

            {/* Drawer content */}
            <Animated.View
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: screenHeight * 0.4,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    transform: [{ translateY: drawerAnim }],
                    shadowColor: '#000',
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    elevation: 5,
                    zIndex: 10,
                    paddingHorizontal: 20,
                }}
            >
                <View style={styles.container} >

                    <View style={styles.container_heading_box}>
                        <Text style={styles.container_heading}>
                            Delete Article
                        </Text>
                    </View>

                    <View style={styles.delete_btn_box}>
                        <View style={styles.delete_btn_box_heading}>
                            <Text style={styles.delete_btn_box_title}>
                                Are you sure you want to delete this article?
                            </Text>
                        </View>

                        <View style = {styles.btn_box}>
                            <CustomButton 
                                bgVariant="secondary" 
                                title='Cancel' 
                                width="half" 
                                onPress={() => onOpenChange(false)} 
                                rounded="full" 
                                textVariant="primary"
                            />
                            <CustomButton 
                                title='Delete' 
                                width="half"
                                rounded="full" 
                                onPress={onDeleteArticle}
                                loading = {isPending}
                            />
                        </View>
                    </View>

                </View>
            </Animated.View>
        </>
    );
};

export default DeleteArticleDrawer;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        paddingVertical: 10
    },

    container_heading_box: {
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "transparent",
        borderBottomColor: color.primary[100]
    },


    container_heading: {
        fontFamily: "Jakarta-Bold",
        fontSize: 23,
        textAlign: "center",
        color: color.primary[800]
    },

    delete_btn_box: {
        height: "70%",
    },

    delete_btn_box_title: {
        textAlign: "center",
        fontFamily: "Jakarta-SemiBold",
        fontSize: 19,
        color : color.secondary[700]
    },

    delete_btn_box_heading: {
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
    },

    btn_box : {
                            display : "flex",
                            alignItems : "center",
                            justifyContent : "space-between",
                            flexDirection : "row",
                            gap : 5
                        }
})
