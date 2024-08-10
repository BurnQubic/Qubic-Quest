import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/app/components/navigation/TabBarIcon";
import { Colors } from "@/config/constants/Colors";
import { useColorScheme } from "@/config/hooks/useColorScheme";
import CandyTilePuzzle from "../puzzles/candytile";

export default function GameScreen() {
  const colorScheme = useColorScheme();

  return <CandyTilePuzzle />;
}
