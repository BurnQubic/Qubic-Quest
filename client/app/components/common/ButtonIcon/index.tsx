import React from "react";
import { Text, View, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styles } from "./styles";
import { Image } from "expo-image";

type Props = TouchableOpacityProps & {
  title: string;
  image: any;
};

export function ButtonIcon({ title, image, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={image} style={styles.icon} />
      </View>

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
