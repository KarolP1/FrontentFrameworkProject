import { DefaultTheme } from "styled-components";

export const colorTheme: DefaultTheme = {
  color: {
    darkTint: "#2E0249",
    darkest: "#C021B5",
    dark: "#872673",
    medium: "#D076B4",
    tint: "#6D98BA",
    lightest: "#FFFBFF",
  },
};

export type IColorThemeType = typeof colorTheme;
