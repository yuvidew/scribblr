import Drafts from '@/feature/my-articles/_components/Drafts';
import { color } from '../../../constants/colors';
import Header from '../../../feature/my-articles/_components/header'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Published from '@/feature/my-articles/_components/Published';

const tab = [
  {
    text: "Drafts"
  },
  {
    text: "Published"
  },
];

const MyArticles = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Drafts");
  return (
    <ScrollView style={styles.scroll_container}>
      <SafeAreaView style={styles.container}>
        {/* start to header */}
        <Header />
        {/* end to header */}

        {/* start to tabs */}
        <View style={styles.tab_container}>
          {tab.map(({ text }, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.tab_button, selectedTab === text ? styles.select_tab_button : ""]}

              onPress={() => setSelectedTab(text)}
            >
              <Text
                style={[styles.tab_text, selectedTab === text ? styles.select_tab_text : ""]}
              >
                {text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* end to tabs */}

        {/* start to tabs container */}
        {selectedTab === "Drafts" ? <Drafts /> : <Published />}
        {/* end to tabs container */}
      </SafeAreaView>
    </ScrollView>
  )
}

export default MyArticles

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

  tab_container: {
    display: "flex",
    flexDirection: "row"
  },
  tab_button: {
    width: "50%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    borderWidth: 1,
    borderColor: "transparent",

  },
  select_tab_button: {
    borderBottomColor: color.primary[800],
  },
  tab_text: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 16
  },
  select_tab_text: {
    color: color.primary[800]
  }

})