import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { icons } from '../constants/icons';
import { color } from '../constants/colors';

interface Props {
    title?: string;
    description?: string;
}

const ErrorState = ({
    title = 'Failed to fetch article',
    description = 'Please check your internet connection or try again later.',
}: Props) => {
    return (
        <View style={styles.container}>
            <Image
                source={icons.alertIcon}
                resizeMode="contain"
                style={styles.icon}
                tintColor={color.primary[700]}
            />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

export default ErrorState;

const styles = StyleSheet.create({
    container: {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 20,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: color.primary[700],
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        color: color.secondary[500], 
        textAlign: 'center',
        maxWidth: '80%',
    },
});
