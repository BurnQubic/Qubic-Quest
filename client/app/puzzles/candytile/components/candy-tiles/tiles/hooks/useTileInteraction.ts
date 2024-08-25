import { levelItemsState } from "../../../../store/levelItems";
import { useEffect } from "react";
import { View } from "react-native";
import { useRecoilValue } from "recoil";

const ALLOWED_ITEM_TYPES = ["Candy", "SuperCandy", "Chocolate"];
export default (index: number, tileElementState: React.RefObject<View>) => {
  const levelItems = useRecoilValue(levelItemsState);

  useEffect(() => {
    tileElementState.current && validateItemType();
  }, [levelItems, tileElementState]);

  const validateItemType = () => {
    const type = levelItems[index]?.type;
    const allowedType = ALLOWED_ITEM_TYPES.includes(type || "");

    if (allowedType) {
      tileElementState.current?.setNativeProps({ accessibilityLabel: "Tile" });
    } else {
      tileElementState.current?.setNativeProps({ accessibilityLabel: "Not a tile" });
    }
  };
};
