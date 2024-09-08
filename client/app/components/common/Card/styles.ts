import { StyleSheet } from "react-native";
import { theme } from "@/config/theme";

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.secondary50,
    borderRadius: 10,
    padding: 16,
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
});

export { styles };
