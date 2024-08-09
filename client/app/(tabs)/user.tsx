import { Tabs } from "expo-router";
import React, { useState } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedInput } from "@/components/common/ThemedInput"; // Updated import
import { Button } from "react-native";
import { StyleSheet } from "react-native"; // Ensure this import is present
import { ThemedView } from "@/components/common/ThemedView";
import { ThemedText } from "@/components/common/ThemedText";

export default function UserProfile() {
  const colorScheme = useColorScheme();
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    const authMethod = isSignUp
      ? createUserWithEmailAndPassword
      : signInWithEmailAndPassword;
    authMethod(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.container}>
        {" "}
        {/* Updated from View to ThemedView */}
        <ThemedText style={styles.title}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </ThemedText>{" "}
        {/* Updated from Text to ThemedText */}
        <ThemedInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <ThemedInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button
          title={isSignUp ? "Sign Up" : "Sign In"}
          onPress={handleAuth}
          style={styles.button}
        />
        <Button
          title={`Switch to ${isSignUp ? "Sign In" : "Sign Up"}`}
          onPress={() => setIsSignUp(!isSignUp)}
          style={styles.button}
        />
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
    color: Colors.light.text,
    marginBottom: 20,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
  },
});
