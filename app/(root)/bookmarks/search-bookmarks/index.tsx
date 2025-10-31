import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchBookmark = () => {
    return (
        <ScrollView style={styles.scroll_container}>
            <SafeAreaView style={styles.container}>
                <Text>SearchBookmark</Text>
            </SafeAreaView>
        </ScrollView>
    )
}

export default SearchBookmark

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