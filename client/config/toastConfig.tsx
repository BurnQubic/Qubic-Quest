import { Ionicons } from "@expo/vector-icons";
import { BaseToast, ToastConfig, BaseToastProps } from "react-native-toast-message";
import { ViewStyle, TextStyle } from "react-native";

const defaultProps = {
  style: {
    borderRadius: 10,
    alignItems: "center",
    borderLeftWidth: 0,
    padding: 4,
    paddingLeft: 10,
    shadowColor: "#444444",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  } as ViewStyle,
  text1Style: {
    fontSize: 18,
    fontFamily: "Arial",
    fontWeight: "normal",
  } as TextStyle,
};

const createToast = (
  props: BaseToastProps,
  iconName: keyof typeof Ionicons.glyphMap,
  iconColor: string,
  backgroundColor: string,
  textColor: string
) => {
  return (
    <BaseToast
      {...props}
      style={{
        ...defaultProps.style,
        backgroundColor,
      }}
      text1Style={{
        ...defaultProps.text1Style,
        color: textColor,
      }}
      renderLeadingIcon={() => <Ionicons name={iconName} size={24} color={iconColor} style={{ marginLeft: 10 }} />}
    />
  );
};

const toastConfig: ToastConfig = {
  success: (props) => createToast(props, "checkmark-circle", "green", "#e6ffe6", "#000"),
  error: (props) => createToast(props, "close-circle", "red", "#ffe6e6", "#000"),
  info: (props) => createToast(props, "information-circle", "blue", "#e6f0ff", "#000"),
};

export default toastConfig;
