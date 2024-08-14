import React, { useRef, useState, useMemo, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { levelItemsState } from "../../../store/levelItems";
import { levelTasksState } from "../../../store/levelTasks";
import { LevelTasks } from "../../../types";
import useScore from "../../../hooks/useScore";
import { Image } from "expo-image";
import { iceCreamSprite } from "../../../extern";

type IceCreamProps = {
  id: string;
  index: number;
};

const IceCream = ({ id, index }: IceCreamProps) => {
  const [show, setShow] = useState(true);
  const opacity = useRef(new Animated.Value(1)).current;
  const itemUsedRef = useRef(false);
  const levelItems = useRecoilValue(levelItemsState);
  //   const playAudio = useAudio();
  const matched = useMemo(() => !levelItems.some((x) => x?.id === id), [levelItems]);
  const setLevelTasks = useSetRecoilState<LevelTasks>(levelTasksState);

  useScore(matched, index, "IceCream");

  useEffect(() => {
    if (matched && !itemUsedRef.current) {
      onItemMatch();
    }
  }, [levelItems]);

  const onItemMatch = () => {
    itemUsedRef.current = true;
    // playAudio({ audioName: "iceCreamMatch" });
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShow(false));

    setLevelTasks((tasks) => ({
      ...tasks,
      iceCreams: tasks.iceCreams + 1,
    }));
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity },
        !show && { display: "none" }, // Hide when show is false
      ]}
    >
      <Image source={iceCreamSprite} style={styles.image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default IceCream;
