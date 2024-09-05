export const theme = {
  colors: {
    text: "#FFFFFF",
    primary: "#E51C44",
    primary30: "#FF3366",
    primary40: "#CC0033",
    primary50: "#990033",
    primary60: "#660033",
    primary70: "#330033",

    secondary100: "#0A1033",
    secondary90: "#0D133D",
    secondary80: "#0E1647",
    secondary85: "#171F52",
    secondary70: "#1B2565",
    secondary60: "#1B2565",
    secondary50: "#243189",
    secondary40: "#1D2766",
    secondary30: "#495BCC",

    overlay: "rgba(0,0,0,0.7)",
    highlight: "#ABB1CC",
    heading: "#DDE3F0",
    line: "#991F36",
    on: "#32BD50",
    error: "#FF0000",
    gold: "#FFD700",
    lightBackground: "#F5F5F5",
  },

  fonts: {
    title700: "Rajdhani_700Bold",
    title500: "Rajdhani_500Medium",
    text400: "Inter_400Regular",
    text500: "Inter_500Medium",
  },
};

export type Theme = typeof theme;
