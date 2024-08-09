import { Tabs } from "expo-router";
import React, { useState } from "react";
import { TabBarIcon } from "@/app/components/navigation/TabBarIcon";
import { Colors } from "@/config/constants/Colors";
import { useColorScheme } from "@/config/hooks/useColorScheme";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import ParallaxScrollView from "@/app/components/common/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedInput } from "@/app/components/common/ThemedInput"; // Updated import
import { Button } from "react-native";
import { StyleSheet, Module } from "react-native"; // Ensure this import is present
import { ThemedView } from "@/app/components/common/ThemedView";
import { ThemedText } from "@/app/components/common/ThemedText";
import * as Notifications from "expo-notifications";

export default function UserProfile() {
  const colorScheme = useColorScheme();
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleSignUp = () => {
    if (validateEmail(email) && validatePassword(password)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Success",
              body: "Sign up successful",
              sound: "default",
            },
            trigger: null,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Error",
              body: errorMessage,
              sound: "default",
            },
            trigger: null,
          });
        });
    }
  };

  const handleSignIn = () => {
    if (validateEmail(email) && validatePassword(password)) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Success",
              body: "Sign in successful",
              sound: "default",
            },
            trigger: null,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Error",
              body: errorMessage,
              sound: "default",
            },
            trigger: null,
          });
        });
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedText type="title">User Auth</ThemedText>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </ThemedText>
        <ThemedInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
          style={styles.input}
        />
        {emailError && (
          <ThemedText style={{ color: "red" }}>{emailError}</ThemedText>
        )}
        <ThemedInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
          }}
          secureTextEntry
          style={styles.input}
        />
        {passwordError && (
          <ThemedText style={{ color: "red" }}>{passwordError}</ThemedText>
        )}
        <ThemedView>
          <Button
            title="Sign Up"
            onPress={handleSignUp}
            style={styles.button}
          />
          <Button
            title="Sign In"
            onPress={handleSignIn}
            style={styles.button}
          />
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
  buttonView: {
    display: "flex",
    gap: 3,
  },
});
