import React from "react";
import { StyleSheet, Text } from "react-native";
import { firebaseAuth } from "@/config/firebase";
import ParallaxScrollView from "@/app/components/common/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/app/components/common/ThemedView";
import { ThemedText } from "@/app/components/common/ThemedText";
import { useRecoilValue } from "recoil";
import { authState } from "@/config/store/auth";
import { ButtonWrapper } from "../components/common/ButtonWrapper";
import { theme } from "@/config/theme";
import { useToast } from "@/config/hooks/useToast";

export default function UserProfile() {
  const auth = useRecoilValue(authState);
  const { showToast } = useToast();

  const handleSignOut = async () => {
    try {
      await firebaseAuth.signOut();
      showToast({
        title: "Success",
        body: "Signed out successfully",
        type: "success",
      });
    } catch (error) {
      console.log(error.message);
      showToast({
        title: "Error",
        body: "Failed to sign out",
        type: "error",
      });
    }
  };

  return (
    <ParallaxScrollView bannerComponent={<Ionicons size={310} name="person-circle-outline" style={styles.logo} />}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          {auth.user ? auth.user.email : "Not Signed In"}
        </ThemedText>
        <ThemedView style={styles.innerContainer}>
          {auth.user ? (
            <>
              <ThemedText style={styles.info}>Email: {auth.user.email}</ThemedText>
              <ThemedText style={styles.info}>User ID: {auth.user.uid}</ThemedText>
              <ThemedText style={styles.info}>Account created: {auth.user.displayName}</ThemedText>
              <ButtonWrapper onPress={handleSignOut} style={styles.button}>
                <Text style={styles.buttonText}>Sign Out</Text>
              </ButtonWrapper>
            </>
          ) : (
            <>
              <ThemedText style={styles.title}>Not Signed In</ThemedText>
              <ThemedText style={styles.info}>Please sign in to view your profile</ThemedText>
            </>
          )}
        </ThemedView>
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
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 20, // Added margin for better spacing
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
    height: 50,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
