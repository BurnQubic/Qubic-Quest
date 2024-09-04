import { Tabs, router } from "expo-router";
import React, { useState, useEffect } from "react";
import { TabBarIcon } from "@/app/components/navigation/TabBarIcon";
import { Colors } from "@/config/constants/Colors";
import { useColorScheme } from "@/config/hooks/useColorScheme";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase";
import ParallaxScrollView from "@/app/components/common/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Module, Pressable, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { ThemedView } from "@/app/components/common/ThemedView";
import { ThemedText } from "@/app/components/common/ThemedText";
import { useRecoilState } from "recoil";
import { authState } from "@/config/store/auth";
import { theme } from "@/config/theme";
import { ThemedInput } from "../components/common/ThemedInput";
import { useToast } from "@/config/hooks/useToast";

export default function UserProfile() {
  const colorScheme = useColorScheme();
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);
  const { showToast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      console.log("FIREBASE AUTH");
      console.log(currentUser);
      // setAuth(prevState => ({ ...prevState, user: currentUser }));
      // if (currentUser) {
      //   router.replace("/user");

      //   router.replace("/user");
      // }
    });

    return () => unsubscribe();
  }, []);

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleSignUp = async () => {
    if (validateEmail(email) && validatePassword(password)) {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;
        console.log("user", user);
        showToast({ title: "Sign up successful", body: "Sign up successful", type: "success" });
      } catch (error) {
        console.log(error.code, error.message);
        showToast({ title: "Error", body: "Error", type: "error" });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignIn = async () => {
    if (validateEmail(email) && validatePassword(password)) {
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;
        console.log("user", user);
        showToast({ title: "Sign in successful", body: "Sign in successful", type: "success" });
      } catch (error) {
        console.log(error.code, error.message);
        showToast({ title: "Error", body: "Error", type: "error" });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseAuth.signOut();
      showToast("Signed out successfully", "success");
    } catch (error) {
      console.log(error.message);
      showToast("Error", "error");
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={theme.colors.secondary90}
      headerImage={<Ionicons size={310} name="person-circle-outline" style={styles.logo} />}
    >
      <ThemedText type="title">User Auth</ThemedText>
      <ThemedView style={styles.container}>
        {auth.isAuthenticated ? (
          <>
            {/* <ThemedText style={styles.title}>Welcome, {user.email}</ThemedText> */}
            <TouchableOpacity onPress={handleSignOut} style={styles.button}>
              <Text>Sign Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <ThemedText style={styles.title}>{isSignUp ? "Sign Up" : "Sign In"}</ThemedText>
            <ThemedInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                validateEmail(text);
              }}
              style={styles.input}
            />
            {emailError && <ThemedText style={styles.errorText}>{emailError}</ThemedText>}
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
            {passwordError && <ThemedText style={styles.errorText}>{passwordError}</ThemedText>}
            <ThemedView style={styles.buttonView}>
              {loading ? (
                <ActivityIndicator size="large" color={Colors[colorScheme].text} />
              ) : (
                <>
                  <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                  </TouchableOpacity>
                </>
              )}
            </ThemedView>
            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} style={styles.switchButton}>
              <ThemedText>
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </ThemedText>
            </TouchableOpacity>
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
    color: theme.colors.text,
    marginBottom: 20,
  },
  logo: {
    color: "#dddddd",
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
    width: "40%",
    height: 40,
    backgroundColor: "#00aaff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
  },
  buttonView: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 3,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  switchButton: {
    marginTop: 20,
  },
});
