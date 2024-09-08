import { theme } from "@/config/theme";
import React from "react";
import { View, Image, ViewStyle, ImageSourcePropType, StyleSheet } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  bannerImage?: ImageSourcePropType;
}

export const Card: React.FC<CardProps> = ({ children, style, bannerImage }) => {
  return (
    <View style={[styles.card, style]}>
      {bannerImage && <Image source={bannerImage} style={styles.bannerImage} />}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.secondary50,
    borderRadius: 10,
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: theme.colors.secondary70,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bannerImage: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    padding: 4,
  },
});
