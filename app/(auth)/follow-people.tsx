import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import Spinner from '../../components/Spinner';
import { color } from '../../constants/colors';
import { icons } from '../../constants/icons';
import BackArrowProgressBar from '../../feature/auth/_components/back-arrow-progressbar';
import { useFollowUser } from '../../feature/auth/hook/use-follow-user';
import { useGetAllUsers } from '../../feature/auth/hook/use-get-all-users';



const FollowPeople = () => {
    const { data: users, isLoading } = useGetAllUsers();
    const { mutate: onFollowUser } = useFollowUser()
    const [showSuccess, setShowSuccess] = useState(false);
    const [count , setCount] = useState(0);

    const onRedirectToSignIn = () => {
        setShowSuccess(false);
        router.replace("/(auth)/sign-in")
    }


    return (
        <SafeAreaView style={styles.container}>
            <BackArrowProgressBar />
            {/* title + description */}
            <View style={styles.container_description}>
                <Text style={styles.title}>Discover People 🥰</Text>
                <Text style={styles.description}>Pick same people to follow.</Text>
            </View>

            {/* list */}
            <ScrollView
                style={styles.users_list_container}
                contentContainerStyle={styles.users_list_content}
                showsVerticalScrollIndicator={false}
            >
                {isLoading ? (
                    <View style={styles.loading_state}>
                        <Spinner loading={true} color="primary" />
                    </View>
                ) : users?.map((item, index) => (
                    <View key={index} style={styles.userCard}>
                        <View style={styles.userInfo}>
                            <Image source={{ uri: item.image_url }} style={styles.avatar} />
                            <View>
                                <Text style={styles.name}>{item.fullname}</Text>
                                <Text style={styles.username}>@{item.fullname}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.followButton,
                                item.follow ? styles.followingButton : styles.followButtonActive,
                            ]}
                            onPress={() => {
                                onFollowUser(item.profile_id)
                                setCount(prev => prev + 1)
                            }}
                        >
                            <Text
                                style={[
                                    styles.followText,
                                    item.follow ? styles.followingText : styles.followTextActive,
                                ]}
                            >
                                {item.follow ? 'Following' : 'Follow'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {/* continue */}
            <CustomButton title="Continue" rounded="full" disabled={count === 0} onPress={() => setShowSuccess(true)} />

            {/* success modal */}
            <Modal
                visible={showSuccess}
                transparent
                animationType="fade"
                onRequestClose={() => setShowSuccess(false)}
            >
                {/* Backdrop */}
                <Pressable style={styles.backdrop} onPress={() => setShowSuccess(false)}>
                    {/* Card (use pointerEvents to keep presses inside) */}
                    <Pressable style={styles.card} onPress={() => { }} pointerEvents="box-none">
                        {/* Icon circle */}
                        <Image source={icons.SignUpUser} style = {{
                            width : 180,
                            height : 180
                        }} resizeMode="contain" tintColor={color.primary[800]} />

                        <Text style={styles.cardTitle}>Sign Up Successful!</Text>
                        <Text style={styles.cardSubtitle}>
                            Your account has been created.{'\n'}Please wait a moment, we are preparing for you...
                        </Text>


                        <Pressable style={styles.cardBtn} onPress={onRedirectToSignIn}>
                            <Text style={styles.cardBtnText}>Okay</Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
};

export default FollowPeople;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        gap: 35,
        paddingBottom: 25,
    },

    container_description: {
        display: 'flex',
        gap: 18,
    },

    title: {
        fontFamily: 'Jakarta-Bold',
        fontSize: 30,
    },

    description: {
        fontFamily: 'Jakarta',
        fontSize: 17,
    },

    users_list_container: {
        width: '100%',
    },

    users_list_content: {
        gap: 8,
        paddingBottom: 24,
    },

    userCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
    },
    name: {
        fontFamily: 'Jakarta-SemiBold',
        fontSize: 16,
        color: '#111',
    },
    username: {
        fontFamily: 'Jakarta',
        fontSize: 14,
        color: '#777',
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

    loading_state : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        height : 300
    },

    /* Modal styles */
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    card: {
        width: '100%',
        maxWidth: 360,
        borderRadius: 24,
        backgroundColor: '#fff',
        paddingVertical: 28,
        paddingHorizontal: 22,
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
    },
    iconCircle: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: color.primary[800],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    iconGlyph: {
        fontSize: 34,
        color: '#fff',
    },
    cardTitle: {
        fontFamily: 'Jakarta-Bold',
        fontSize: 20,
        color: '#6a4a3d',
        marginTop: 2,
        marginBottom: 6,
    },
    cardSubtitle: {
        fontFamily: 'Jakarta',
        fontSize: 14,
        color: '#6b6b6b',
        textAlign: 'center',
        lineHeight: 20,
    },
    cardBtn: {
        marginTop: 18,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 18,
        backgroundColor: color.primary[800],
    },
    cardBtnText: {
        fontFamily: 'Jakarta-SemiBold',
        color: '#fff',
        fontSize: 14,
    },
});
