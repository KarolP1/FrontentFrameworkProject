import { DefaultTheme } from "styled-components";

export const colorTheme: DefaultTheme = {
  color: {
    darkTint: "#3F334D",
    darkest: "#3F334D",
    dark: "#574B60",
    medium: "#9B8DA5",
    tint: "#CEABB1",
    lightest: "#F6F6F4",
  },
};

export type IColorThemeType = typeof colorTheme;
