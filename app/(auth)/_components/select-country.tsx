import { ScrollView, StyleSheet, Text, View, } from 'react-native'
import React, { useMemo, useState } from 'react'
import SearchBox from '../../../components/search-box'
import { color } from '../../../constants/colors';
import { Image } from 'expo-image'
import { useGetCountries } from '../hook/use-get-counties'
import Spinner from '../../../components/Spinner'
import { icons } from '../../../constants/icons';
import CustomButton from '../../../components/CustomButton';

interface Props {
    onProgressState: () => void
}

/**
 * SelectCountry - A screen that allows users to select their country from a searchable list.
 *
 * @param {Object} props - Component props.
 * @param {() => void} props.onProgressState - Callback function invoked when the user taps "Continue".
 *
 * @example
 * // Using inside a parent component with a progress step state
 * const [progressState, setProgressState] = useState<
 *   "country" | "profile" | "sign-up"
 * >("profile");
 * 
 * <SelectCountry onProgressState={() => setProgressState("profile")} />
 *
 * The component displays:
 * - A title and description at the top.
 * - A searchable list of countries fetched via `useGetCountries` hook.
 * - Loading spinner while data is fetching.
 * - Empty state if no country matches the search.
 * - A "Continue" button that triggers the `onProgressState` callback.
 */

const SelectCountry = ({ onProgressState }: Props) => {
    // TODO : implement a api hook to submit the selected country
    const { isLoading, isError, data } = useGetCountries();


    const [searchValue, setSearchValue] = useState("")

    const filterCountry = useMemo(() => {
        return (data ?? []).filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()))
    }, [searchValue, data])

    return (
        <View style={styles.container}>
            <View style={{ gap: 20 }}>
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

            </View>
            <ScrollView
                style={styles.country_list_container}
                contentContainerStyle={styles.country_list_content}
                showsVerticalScrollIndicator={false}
            >
                {
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
                    ) : filterCountry?.map((item, i) => (
                        <View key={i} style={styles.country_box}>
                            <Image
                                source={{ uri: item.flag?.png ?? item.flag?.svg }}
                                style={{ width: 40, height: 40 }}
                                resizeMode="contain"
                            />
                            <Text style={styles.country_sign}>{item.name?.slice(0, 2).toUpperCase()}</Text>
                            <Text style={styles.country_text}>{item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}</Text>
                        </View>
                    ))
                }
            </ScrollView>

            <CustomButton title='Continue' onPress={onProgressState} rounded="full" />
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
        width: "100%",
    },

    country_list_content: {
        gap: 8,
        paddingBottom: 24,
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
