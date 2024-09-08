import React from "react";
import { Text, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { styles } from "./styles";
import { Image } from "expo-image";

type Props = RectButtonProps & {
  title: string;
  image: any;
};

export function ButtonIcon({ title, image, ...rest }: Props) {
  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={image} style={styles.icon} />
      </View>

      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}
