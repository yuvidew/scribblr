import { icons } from "../../../constants/icons";
import TabIcon from "../../../components/TabIcon";
import { Tabs } from "expo-router"

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    position: "absolute",
                    // borderTopColor: ,
                    borderTopWidth: 1,
                    minHeight: 70,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={focused ? icons.home_select : icons.home}
                            // title="Home"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={ focused ? icons.explore_select : icons.explore}
                            // title="Search"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="my_articles"
                options={{
                    title: "My Articles",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={focused ? icons.document : icons.document}
                            // title="Search"
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            icon={focused ? icons.profile_select : icons.profile}
                            // title="Profile"
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    )
}

export default TabsLayout;