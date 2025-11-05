import { StyleSheet, View } from 'react-native'
import React from 'react'
import Spinner from './Spinner'

const LoadingState = () => {
    return (
        <View style={styles.loading_container}>
            <Spinner loading color="primary" />
        </View>
    )
}

export default LoadingState

const styles = StyleSheet.create({
    loading_container: {
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
})