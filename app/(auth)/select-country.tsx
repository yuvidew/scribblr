import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import CustomButton from '../../components/CustomButton';
import SearchBox from '../../components/search-box';
import Spinner from '../../components/Spinner';
import { color } from '../../constants/colors';
import { icons } from '../../constants/icons';
import BackArrowProgressBar from '../../feature/auth/_components/back-arrow-progressbar';
import { useGetCountries } from '../../feature/auth/hook/use-get-counties';
import { useStoreCountry } from '../../zustand/manage_country';

const SelectCountry = () => {
    const { isLoading, isError, data } = useGetCountries();
    const {setCountry , country} = useStoreCountry()

    const [searchValue, setSearchValue] = useState("")

    const filterCountry = useMemo(() => {
        return (data ?? []).filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()))
    }, [searchValue, data]);


    const onSubmit = () => {
        if (!country) {
            Toast.show({
                type : "error",
                text1 : "Select the country"
            });

            return ;
        }

        router.push("/(auth)/create-profile")
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackArrowProgressBar />
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
                        <TouchableOpacity 
                            key={i} 
                            style={country === item.name ? styles.selected_country_box : styles.country_box}
                            onPress={() => setCountry(item.name)}
                        >
                            <Image
                                source={{ uri: item.flag?.png ?? item.flag?.svg }}
                                style={{ width: 40, height: 40 }}
                                resizeMode="contain"
                            />
                            <Text style={country === item.name ? styles.selected_country_sign : styles.country_sign}>{item.name?.slice(0, 2).toUpperCase()}</Text>
                            <Text style={country === item.name ? styles.selected_country_text  :styles.country_text}>{item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <CustomButton title='Continue' onPress={onSubmit} rounded="full" />
        </SafeAreaView>
    )
}

export default SelectCountry

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingBottom : 25,
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

    selected_country_box: {
        borderWidth: 1,
        borderColor: color.primary[800],
        height: 70,
        // width : "100%",
        backgroundColor : color.primary[300],
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

    selected_country_sign: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 17,
        color: color.primary[800]
    },

    country_text: {
        fontFamily: "Jakarta-Bold",
        fontSize: 20,
        color: color.secondary[800]
    },

    selected_country_text: {
        fontFamily: "Jakarta-Bold",
        fontSize: 20,
        color: "#fff"
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