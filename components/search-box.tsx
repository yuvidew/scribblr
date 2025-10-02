import {  StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import React from 'react'
import { color } from '../constants/colors'
import { Image } from 'expo-image'
import { icons } from '../constants/icons'

interface Props extends TextInputProps{
    placeholder? : string

}

/**
 * Render a search text input with leading icon.
 * @param placeholder Optional placeholder shown inside the input.
 * @param props Remaining TextInput props forwarded to the input.
 * @example <SearchBox placeholder='Search posts' onChangeText={(text) => setQuery(text)} />
 */
const SearchBox = ({placeholder = "Search here" , ...props} : Props) => {
    return (
        <View style={styles.container} >
            <Image 
                source={icons.search}
                style = {{
                    width : 20,
                    height : 20
                }}
                resizeMode="contain"
            />
            <TextInput 
                placeholder={placeholder} 
                style = {styles.search_input}
                {...props}
            />
        </View>
    )
}

export default SearchBox

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.secondary[200],
        height: 50,
        width: "100%",
        borderRadius: 7,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        gap : 5
    },
    search_input : {
        width : "100%",
        height : "100%"
    } 
})