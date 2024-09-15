import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/config/hooks/useColorScheme";
import NotificationService from "./notification";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RecoilRoot } from "recoil";
import { StatusBar } from "react-native";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { Rajdhani_500Medium, Rajdhani_700Bold } from "@expo-google-fonts/rajdhani";
import { LilyScriptOne_400Regular } from "@expo-google-fonts/lily-script-one";
import Toast from "react-native-toast-message";
import toastConfig from "@/config/toastConfig";
import SplashScreen from "@/app/components/SplashScreen";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold,
    LilyScriptOne_400Regular,
  });

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!loaded || showSplash) {
    return <SplashScreen onFinish={() => {}} />;
  }

  return (
    <RecoilRoot>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
          backgroundColor="transparent"
          translucent
          hidden={true}
        />
        {/* <NotificationService /> */}
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="puzzles/[id]" />
        </Stack>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </RecoilRoot>
  );
}
