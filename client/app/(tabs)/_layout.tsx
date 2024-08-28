import { Tabs } from "expo-router";
import React, { useState } from "react";

import { TabBarIcon } from "@/app/components/navigation/TabBarIcon";
import { Colors } from "@/config/constants/Colors";
import { useColorScheme } from "@/config/hooks/useColorScheme";
import SplashScreen from "../components/SplashScreen";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setIsSplashVisible(false);
  };

  if (isSplashVisible) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: "Games",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "game-controller" : "game-controller-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="auth"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
