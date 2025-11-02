import { ScrollView, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../feature/created-article-details/_components/header';
import DeleteArticleDrawer from '../../../feature/created-article-details/_components/delete-article-drawer';

const ArticleDetails = () => {
    const {id} = useLocalSearchParams();

    const [open , setOpen] = useState(false);


    return (
        <>
        <ScrollView style={styles.scroll_container}>
            <SafeAreaView style={styles.container}>
                {/* start to header */}
                <Header onOpenChange={setOpen} />
                {/* end to header */}
                <Text>ArticleDetails {id}</Text>
            </SafeAreaView>
        </ScrollView>
        <DeleteArticleDrawer open = {open} onOpenChange={(value) => setOpen(value)} />
        </>
    );
};

export default ArticleDetails;

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
});