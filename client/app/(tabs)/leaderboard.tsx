import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { ThemedView } from "@/app/components/common/ThemedView";
import { ThemedText } from "@/app/components/common/ThemedText";
import { theme } from "@/config/theme";
import ParallaxScrollView from "../components/common/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Avatar } from "@/app/components/common/Avatar";

const mockLeaderboardData = [
  {
    id: "1",
    rank: 1,
    username: "Player1",
    score: 1000,
    avatar: "https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1/logos/52cccfb454d946c4b7dfa5e816f9e576",
  },
  {
    id: "2",
    rank: 2,
    username: "Player2",
    score: 950,
    avatar: "https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1/logos/52cccfb454d946c4b7dfa5e816f9e576",
  },
  {
    id: "3",
    rank: 3,
    username: "Player3",
    score: 900,
    avatar: "https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1/logos/52cccfb454d946c4b7dfa5e816f9e576",
  },
  {
    id: "4",
    rank: 4,
    username: "Player4",
    score: 850,
    avatar: "https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1/logos/52cccfb454d946c4b7dfa5e816f9e576",
  },
  {
    id: "5",
    rank: 5,
    username: "Player5",
    score: 800,
    avatar: "https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1/logos/52cccfb454d946c4b7dfa5e816f9e576",
  },
];

export default function LeaderboardScreen() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = () => {
    // Simulating API call delay
    setTimeout(() => {
      setLeaderboardData(mockLeaderboardData);
      setLoading(false);
    }, 3000);
  };

  const renderLeaderboardItem = ({ item }) => (
    <ThemedView style={styles.leaderboardItem}>
      <ThemedText style={styles.rank}>{item.rank}</ThemedText>
      <Avatar urlImage={item.avatar} />
      <ThemedText style={styles.username}>{item.username}</ThemedText>
      <ThemedText style={styles.score}>{item.score}</ThemedText>
    </ThemedView>
  );

  return (
    <ParallaxScrollView bannerComponent={<Ionicons size={310} name="trophy-outline" style={styles.logo} />}>
      <ThemedView style={styles.container}>
        <Image source={require("@/assets/svg/top100.svg")} style={styles.topImage} />
        {loading && <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />}
        {!loading && (
          <FlatList
            data={leaderboardData}
            renderItem={renderLeaderboardItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<ThemedText style={styles.emptyText}>No leaderboard data available</ThemedText>}
          />
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  leaderboardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  topImage: {
    height: 84,
    marginBottom: 20,
    resizeMode: "contain",
    textAlign: "center",
  },
  rank: {
    flex: 1,
    fontWeight: "bold",
  },
  avatar: {
    marginRight: 10,
  },
  logo: {
    color: "#dddddd",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  username: {
    flex: 3,
  },
  score: {
    flex: 1,
    textAlign: "right",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
  loader: {
    marginTop: 20,
  },
});
