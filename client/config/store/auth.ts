import { atom } from "recoil";
import { AuthState } from "../types";

export const authState = atom<AuthState>({
  key: "auth",
  default: {
    user: null,
    isAuthenticated: false,
  },
});
