import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase";
import ParallaxScrollView from "@/app/components/common/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/app/components/common/ThemedView";
import { ThemedText } from "@/app/components/common/ThemedText";
import * as Notifications from "expo-notifications";
import { Colors } from "@/config/constants/Colors";
import { useColorScheme } from "@/config/hooks/useColorScheme";
import { useRecoilValue } from "recoil";
import { authState } from "@/config/store/auth";
import AuthScreen from "./auth";
import { router, useFocusEffect } from "expo-router";

export default function UserProfile() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await firebaseAuth.signOut();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Success",
          body: "Signed out successfully",
          sound: "default",
        },
        trigger: null,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#34568B", dark: "#34568B" }}
      headerImage={<Ionicons size={310} name="person-circle-outline" style={styles.logo} />}
    >
      <ThemedText type="title">User Profile</ThemedText>
      <ThemedView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors[colorScheme].text} />
        ) : user ? (
          <>
            <ThemedText style={styles.title}>Welcome, {user.email}</ThemedText>
            <ThemedText style={styles.info}>Email: {user.email}</ThemedText>
            <ThemedText style={styles.info}>User ID: {user.uid}</ThemedText>
            <ThemedText style={styles.info}>Account created: {user.metadata.creationTime}</ThemedText>
            <TouchableOpacity onPress={handleSignOut} style={styles.button}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <ThemedText style={styles.title}>Not Signed In</ThemedText>
            <ThemedText style={styles.info}>Please sign in to view your profile</ThemedText>
          </>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logo: {
    color: "#dddddd",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: "40%",
    height: 40,
    backgroundColor: "#00aaff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
