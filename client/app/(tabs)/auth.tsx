import { Tabs, router } from "expo-router";
import React, { useState, useEffect } from "react";
import { TabBarIcon } from "@/app/components/navigation/TabBarIcon";
import { Colors } from "@/config/constants/Colors";
import { useColorScheme } from "@/config/hooks/useColorScheme";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase";
import ParallaxScrollView from "@/app/components/common/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Module, Pressable, Text, TouchableOpacity, ActivityIndicator, View } from "react-native";
import { ThemedView } from "@/app/components/common/ThemedView";
import { ThemedText } from "@/app/components/common/ThemedText";
import { useRecoilState } from "recoil";
import { authState } from "@/config/store/auth";
import { theme } from "@/config/theme";
import { ThemedInput } from "../components/common/ThemedInput";
import { useToast } from "@/config/hooks/useToast";
import { ButtonWrapper } from "../components/common/ButtonWrapper";

export default function UserProfile() {
  const colorScheme = useColorScheme();
  const [isSignUp, setIsSignUp] = useState(false);
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
        showToast({ title: "Sign up successful", body: "Welcome to our app!", type: "success" });
        setAuth((prevState) => ({ ...prevState, user: user }));
      } catch (error) {
        console.log(error.code, error.message);
        showToast({ title: "Sign Up Error", body: error.message, type: "error" });
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
        setAuth((prevState) => ({ ...prevState, user: user, isAuthenticated: true }));
        showToast({ title: "Sign in successful", body: "Signed in as " + user.email, type: "success" });
      } catch (error) {
        console.log(error.code, error.message);
        showToast({ title: "Sign In Error", body: error.message, type: "error" });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseAuth.signOut();
      showToast({ title: "Signed out successfully", body: "See you soon!", type: "success" });
    } catch (error) {
      console.log(error.message);
      showToast({ title: "Sign Out Error", body: error.message, type: "error" });
    }
  };

  return (
    <ParallaxScrollView bannerComponent={<Ionicons size={310} name="person-circle-outline" style={styles.logo} />}>
      <ThemedText type="title" style={styles.pageTitle}>
        User Authentication
      </ThemedText>
      <ThemedView style={styles.container}>
        {auth.isAuthenticated ? (
          <View style={styles.authenticatedContainer}>
            <ThemedText style={styles.welcomeText}>Welcome, {auth.user?.email}</ThemedText>
            <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <ThemedText style={styles.title}>{isSignUp ? "Create Account" : "Sign In"}</ThemedText>
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
                <ActivityIndicator size="large" color={theme.colors.primary} />
              ) : (
                <ButtonWrapper onPress={isSignUp ? handleSignUp : handleSignIn} style={styles.authButton}>
                  <Text style={styles.buttonText}>{isSignUp ? "Sign Up" : "Sign In"}</Text>
                </ButtonWrapper>
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
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 30,
    textAlign: "center",
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
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  authButton: {
    width: "100%",
    height: 50,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 10,
    fontSize: 14,
  },
  switchButton: {
    marginTop: 20,
  },
  authenticatedContainer: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
  signOutButton: {
    width: 150,
    height: 50,
    backgroundColor: theme.colors.error,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});
