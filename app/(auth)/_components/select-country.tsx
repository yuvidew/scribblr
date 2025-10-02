import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useMemo, useState } from 'react'
import SearchBox from '../../../components/search-box'
import { color } from '../../../constants/colors';
import { Image } from 'expo-image'
import { useGetCountries } from '../hook/use-get-counties'
import Spinner from '../../../components/Spinner'
import { icons } from '../../../constants/icons';
import CustomButton from '../../../components/CustomButton';
const SelectCountry = () => {
    const { isLoading, isError, data } = useGetCountries();

    console.log("the country data", data?.length);

    const [searchValue, setSearchValue] = useState("")

    const filterCountry = useMemo(() => {
        return (data ?? []).filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()))
    }, [searchValue, data])

    return (
        <View style={styles.container}>

            <FlatList
                data={filterCountry}
                keyExtractor={(item, idx) => `${item.name}-${idx}`}
                renderItem={({ item }) => (
                    <View style={styles.country_box}>
                        <Image
                            source={{ uri: item.flag?.png ?? item.flag?.svg }}
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain"
                        />
                        <Text style={styles.country_sign}>{item.name?.slice(0, 2).toUpperCase()}</Text>
                        <Text style={styles.country_text}>{item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}</Text>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                contentContainerStyle={{ paddingVertical: 8 }}
                showsVerticalScrollIndicator
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={
                    isLoading ? (
                        <View style={styles.loading_container}>
                            <Spinner loading color={color.primary[700]} />
                        </View>
                    ) : isError ? (
                        <View style={styles.empty_country}>
                            <Image
                                source={icons.emptyCountry}
                                style={{
                                    width: 100,
                                    height: 100
                                }}
                                resizeMode="contain"
                            />

                            <View style={styles.alert_message_box}>
                                <Text style={[styles.alert_message, { color: color.secondary[800] }]}>
                                    We couldn’t find a count for
                                </Text>
                                <Text style={[styles.alert_message, { color: color.primary[800] }]}>{searchValue}</Text>
                            </View>
                        </View>
                    ) : null
                }
                ListHeaderComponent={
                    <View style = {{gap : 20}}>
                        {/* start to title or description */}
                        <View style={styles.container_description}>
                            <Text style={styles.title}>
                                Which country are you from ? 🏳️
                            </Text>

                            <Text style={styles.description}>
                                Please select your country of origin for a better recommendations.
                            </Text>
                        </View>
                        {/* end to title or description */}

                        {/* start to search box */}
                        <SearchBox
                            placeholder='Search country'
                            value={searchValue}
                            onChangeText={(value) => setSearchValue(value)}
                        />
                        {/* end to search box */}

                        {/* <View style = {{position : "absolute" , bottom : 0 , left : 0}}>
                            <CustomButton title='Continue' />
                        </View> */}
                    </View>
                }

                ListFooterComponent={<CustomButton title='Continue' />}
            />
        </View>
    )
}

export default SelectCountry

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fff",
        // position: "relative",
        padding: 12,
        gap: 25,
    },

    container_description: {
        display: "flex",
        gap: 18
    },

    title: {
        fontFamily: "Jakarta-Bold",
        fontSize: 30
    },

    description: {
        fontFamily: "Jakarta",
        fontSize: 17
    },

    country_list_container: {
        flex: 1,
        // height: "100%",
        width: "100%"
    },

    country_box: {
        borderWidth: 1,
        borderColor: color.secondary[300],
        height: 70,
        // width : "100%",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 25,
        paddingHorizontal: 20,

    },

    country_sign: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 17,
        color: color.secondary[500]
    },

    country_text: {
        fontFamily: "Jakarta-Bold",
        fontSize: 20,
        color: color.secondary[800]
    },

    loading_container: {
        height: 190,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"

    },

    empty_country: {
        display: "flex",
        gap: 10,
        justifyContent: "center",
        alignItems: "center"
    },

    alert_message_box: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },

    alert_message: {
        fontFamily: "Jakarta",
        fontSize: 18
    }

})