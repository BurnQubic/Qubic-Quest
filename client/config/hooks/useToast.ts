import { useCallback } from "react";
import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info";

interface ToastOptions {
  title?: string;
  body: string;
  type?: ToastType;
}

export const useToast = () => {
  const showToast = useCallback(({ title, body, type = "info" }: ToastOptions) => {
    let toastTitle = title || (type === "success" ? "Success" : type === "error" ? "Error" : "Information");

    Toast.show({
      type: type,
      text1: toastTitle,
      text2: body,
      position: "bottom",
    });
  }, []);

  return { showToast };
};
