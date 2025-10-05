import React, { useState } from 'react';
import {
    ActivityIndicator,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Image } from 'expo-image';
import CustomButton from '../../../components/CustomButton';
import { color } from '../../../constants/colors';
import { icons } from '../../../constants/icons';

const users = [
    { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', username: 'alex_dev', name: 'Alex Johnson' },
    { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', username: 'sarah.designs', name: 'Sarah Parker' },
    { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', username: 'mike_codes', name: 'Michael Smith' },
    { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', username: 'emma_art', name: 'Emma Williams' },
    { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', username: 'john_travel', name: 'John Anderson' },
    { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', username: 'lisa_reads', name: 'Lisa Brown' },
    { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', username: 'chris_music', name: 'Chris Davis' },
    { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', username: 'olivia_fitness', name: 'Olivia Martinez' },
    { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', username: 'daniel.tech', name: 'Daniel Taylor' },
    { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', username: 'nina_writer', name: 'Nina Wilson' },
];


const FollowPeople = () => {
    // TODO : fetch the users from the backend
    const [people, setPeople] = useState(users.map(u => ({ ...u, isFollowing: false })));
    const [showSuccess, setShowSuccess] = useState(false);

    const toggleFollow = (index: number) => {
        const updated = [...people];
        updated[index].isFollowing = !updated[index].isFollowing;
        setPeople(updated);
    };

    const onContinue = () => {
        setShowSuccess(true);
        // (optional) auto-close after a moment:
        // setTimeout(() => setShowSuccess(false), 1800);
    };

    return (
        <View style={styles.container}>
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
                {people.map((item, index) => (
                    <View key={index} style={styles.userCard}>
                        <View style={styles.userInfo}>
                            <Image source={{ uri: item.image }} style={styles.avatar} />
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.username}>@{item.username}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.followButton,
                                item.isFollowing ? styles.followingButton : styles.followButtonActive,
                            ]}
                            onPress={() => toggleFollow(index)}
                        >
                            <Text
                                style={[
                                    styles.followText,
                                    item.isFollowing ? styles.followingText : styles.followTextActive,
                                ]}
                            >
                                {item.isFollowing ? 'Following' : 'Follow'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {/* continue */}
            <CustomButton title="Continue" rounded="full" onPress={onContinue} />

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

                        <ActivityIndicator size="small" style={{ marginTop: 16 }} color={color.primary[800]} />

                        <Pressable style={styles.cardBtn} onPress={() => setShowSuccess(false)}>
                            <Text style={styles.cardBtnText}>Okay</Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

export default FollowPeople;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        gap: 35,
        paddingBottom: 85,
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
