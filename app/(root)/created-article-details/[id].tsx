import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../feature/created-article-details/_components/header';
import DeleteArticleDrawer from '../../../feature/created-article-details/_components/delete-article-drawer';
import { Image } from 'expo-image';
import Markdown from "react-native-markdown-display";
import { color } from '../../../constants/colors';
import { useStoreImage } from '@/zustand/manage_image';
import { useStoreArticleForm } from '@/zustand/manage_article_form';


const markdownContent = `
# Earth's Remarkable Havens of Silence 🌍

**Category:** Travel  
**Description:** Dive into a world where true quiet reigns supreme, exploring some of Earth's most profoundly silent places and the unique experiences they offer to the modern traveler.

---

## Introduction

In our increasingly noisy world, true silence has become a rare and coveted commodity. From the ceaseless hum of urban environments to the constant digital pings, our senses are perpetually bombarded.  

This overwhelming sonic landscape has sparked a growing yearning for respite — for destinations where the loudest sound is often the beating of one's own heart.  

Travelers are now actively seeking out those extraordinary corners of our planet where tranquility is not just a concept, but a tangible, all-encompassing experience.  

This article delves into what makes a place genuinely silent and why these quiet havens are so crucial for our well-being.  

We will journey to some of the most remarkably hushed locales on Earth, exploring the unique allure and restorative power of these serene sanctuaries.  

Discover why venturing into these spaces offers more than just a break from noise — it provides a profound connection to nature and an invaluable opportunity for introspection.

---

## The Profound Impact of True Quiet

Silence is far more than just the absence of sound — it is a profound state that significantly impacts our mental and physical health.  

Constant noise exposure contributes to stress, fatigue, and even chronic health issues. Conversely, immersing oneself in genuine quiet can:

- Lower blood pressure  
- Reduce cortisol levels  
- Improve cognitive function  

These effects foster a sense of calm and clarity that is increasingly elusive in daily life.  

Silent environments allow our minds to truly rest and recalibrate. Without external distractions, our thoughts become clearer, fostering creativity and problem-solving.  

For travelers, seeking out such places offers deep rejuvenation — a return to self that crowded tourist spots simply cannot provide.

---

## Nature's Ultimate Soundscapes: Wilderness Silence

Many of Earth's most silent places are found in its most untouched and remote wilderness areas.  

Think of:
- Vast deserts where the only sounds are shifting sands and distant wildlife calls  
- Dense, ancient forests where the canopy absorbs all but the gentlest rustle of leaves  

These **natural cathedrals of quiet** are often far removed from human infrastructure, offering an unparalleled opportunity to experience pure, unadulterated stillness.  

Examples include:
- The **Hoh Rainforest** in Olympic National Park 🌲  
- The **Sahara Desert** 🏜️  

Such destinations provide an auditory experience defined by scarcity, inviting a deeper connection to the natural world.

---

## The Journey to Inner Stillness

For many, the pursuit of silent places is a **pilgrimage toward inner peace**.  

These journeys often lead to destinations where the landscape itself dictates the experience of quiet, demanding a slower pace and greater mindfulness from visitors.  

Examples of such experiences include:
- Backpacking through the untouched expanse of **Patagonia**  
- Meditating in a secluded **Himalayan monastery** 🏔️  
- Sitting quietly on a vast, empty beach 🌊  

Seeking silence becomes a transformative travel experience — encouraging introspection and offering a rare chance to disconnect from digital noise while reconnecting with one’s own thoughts and senses.  

The contrast between our everyday clamor and these serene environments amplifies the appreciation for subtle sounds and the comfort found in their absence.

---

## Conclusion

The pursuit of silence is an increasingly vital aspect of modern travel, offering profound benefits for both mind and body.  

Earth's remarkably quiet places — from vast wildernesses to remote corners — provide not just an escape from noise but an opportunity for deep rejuvenation and a unique connection with our planet.  

As we continue to navigate a world filled with constant sensory input, recognizing and preserving these precious havens of stillness becomes more critical than ever.  

May we all seek out and cherish these **profound auditory landscapes**, allowing them to restore our inner equilibrium and foster a deeper appreciation for the quiet wonders of our world.

---

### 🏷️ Keywords

silent places, quiet travel, tranquil destinations, wilderness, nature therapy, solitude, mindful travel

`;



const ArticleDetails = () => {
    const { id } = useLocalSearchParams();
    const { setImage } = useStoreImage();
    const { setForm } = useStoreArticleForm();

    const [open, setOpen] = useState(false);

    const handleEdit = () => {
        setForm({
            title: "The top 5 travel destination in Earth",
            interest: "Travel",
            description: "% place of earth is"
        });

        setImage("https://i.pinimg.com/1200x/49/dc/52/49dc52a67cf3586d6b7ce13f11dd5b76.jpg")

        router.push("/(root)/(tabs)/create_article?is_edit")
    }

    return (
        <>
            <ScrollView style={styles.scroll_container}>
                <SafeAreaView style={styles.container}>
                    {/* start to header */}
                    <Header
                        onOpenChange={setOpen}

                        onEdit={handleEdit}
                    />
                    {/* end to header */}

                    {/* start to image*/}
                    <View style={styles.image_box}>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={{ uri: "https://i.pinimg.com/1200x/49/dc/52/49dc52a67cf3586d6b7ce13f11dd5b76.jpg" }}
                        />



                    </View>
                    {/* end to image*/}

                    {/* start to article title */}
                    <Text style={styles.article_title}>
                        The top 5 travel destination in Earth
                    </Text>
                    {/* end to article title */}

                    <Markdown
                        style={{
                            body: {
                                fontFamily: "Jakarta",
                                color: color.secondary[900],
                                fontSize: 16,
                                lineHeight: 26, // More comfortable paragraph spacing
                            },
                            heading1: {
                                fontFamily: "Jakarta-ExtraBold",
                                fontSize: 28,
                                lineHeight: 36,
                                color: color.secondary[900],
                                marginTop: 24,
                                marginBottom: 12,
                            },
                            heading2: {
                                fontFamily: "Jakarta-Bold",
                                fontSize: 24,
                                lineHeight: 32,
                                color: color.secondary[800],
                                marginTop: 20,
                                marginBottom: 10,
                            },
                            heading3: {
                                fontFamily: "Jakarta-SemiBold",
                                fontSize: 20,
                                lineHeight: 28,
                                color: color.secondary[700],
                                marginTop: 18,
                                marginBottom: 8,
                            },
                            paragraph: {
                                fontFamily: "Jakarta-Medium",
                                color: color.secondary[800],
                                fontSize: 16,
                                lineHeight: 26,
                                marginBottom: 10,
                            },
                            strong: {
                                fontFamily: "Jakarta-Bold",
                                color: color.secondary[900],
                                lineHeight: 24,
                            },
                            em: {
                                fontFamily: "Jakarta-Medium",
                                color: color.secondary[700],
                                fontStyle: "italic",
                                lineHeight: 24,
                            },
                            link: {
                                color: "#007aff",
                                fontFamily: "Jakarta-SemiBold",
                                textDecorationLine: "underline",
                                lineHeight: 24,
                            },
                            list_item: {
                                flexDirection: "row",
                                marginVertical: 6,
                                lineHeight: 24,
                            },
                            bullet_list: {
                                paddingLeft: 22,
                            },
                            ordered_list: {
                                paddingLeft: 22,
                            },
                            code_inline: {
                                backgroundColor: color.secondary[200],
                                color: color.secondary[900],
                                fontFamily: "Jakarta-Medium",
                                paddingHorizontal: 6,
                                paddingVertical: 3,
                                borderRadius: 6,
                                lineHeight: 20,
                            },
                            code_block: {
                                backgroundColor: color.secondary[200],
                                color: color.secondary[900],
                                fontFamily: "Jakarta-Medium",
                                fontSize: 14,
                                lineHeight: 22,
                                padding: 12,
                                borderRadius: 8,
                                marginVertical: 10,
                            },
                            blockquote: {
                                borderLeftWidth: 4,
                                borderLeftColor: color.secondary[500],
                                paddingLeft: 12,
                                color: color.secondary[700],
                                fontStyle: "italic",
                                lineHeight: 24,
                                marginVertical: 10,
                            },
                            hr: {
                                backgroundColor: color.secondary[300],
                                height: 1,
                                marginVertical: 14,
                            },
                        }}

                    >{markdownContent}</Markdown>
                </SafeAreaView>
            </ScrollView>
            <DeleteArticleDrawer open={open} onOpenChange={(value) => setOpen(value)} />
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

    image_box: {
        width: "100%",
        height: 270,
        borderRadius: 15,
        overflow: "hidden",
        position: "relative"
    },
    image: {
        width: "100%",
        height: "100%"
    },

    article_title: {
        fontFamily: "Jakarta-SemiBold",
        fontSize: 25,
    },
});