import { ScrollView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ArticleDetails = () => {
    return (
        <ScrollView style={styles.scroll_container}>
            <SafeAreaView style={styles.container}>
                <Text>ArticleDetails</Text>
            </SafeAreaView>
        </ScrollView>
    )
}

export default ArticleDetails

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
})