import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { ThemedView } from "@/app/components/common/ThemedView";
import { ThemedText } from "@/app/components/common/ThemedText";
import { theme } from "@/config/theme";
import ParallaxScrollView from "../components/common/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";

const mockLeaderboardData = [
  { id: '1', rank: 1, username: 'Player1', score: 1000 },
  { id: '2', rank: 2, username: 'Player2', score: 950 },
  { id: '3', rank: 3, username: 'Player3', score: 900 },
  { id: '4', rank: 4, username: 'Player4', score: 850 },
  { id: '5', rank: 5, username: 'Player5', score: 800 },
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
    }, 1000);
  };

  const renderLeaderboardItem = ({ item }) => (
    <ThemedView style={styles.leaderboardItem}>
      <ThemedText style={styles.rank}>{item.rank}</ThemedText>
      <ThemedText style={styles.username}>{item.username}</ThemedText>
      <ThemedText style={styles.score}>{item.score}</ThemedText>
    </ThemedView>
  );

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={theme.colors.secondary90}
      headerImage={<Ionicons size={310} name="trophy-outline" style={styles.logo} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Leaderboard</ThemedText>
        <FlatList
          data={leaderboardData}
          renderItem={renderLeaderboardItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<ThemedText style={styles.emptyText}>No leaderboard data available</ThemedText>}
        />
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
  rank: {
    flex: 1,
    fontWeight: "bold",
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
});
