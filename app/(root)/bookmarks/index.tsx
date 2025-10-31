import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../feature/bookmarks/_components/header'

const Bookmarks = () => {
    return (
        <ScrollView style={styles.scroll_container}>
            <SafeAreaView style={styles.container}>
                 {/*start header  */}
                    <Header/>
                 {/*end header  */}
                <Text>Bookmarks</Text>
            </SafeAreaView>
        </ScrollView>
    )
}

export default Bookmarks

const styles = StyleSheet.create({
    scroll_container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    container: {
        paddingBottom: 80,
        gap: 20,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        flex: 1,
    },
})