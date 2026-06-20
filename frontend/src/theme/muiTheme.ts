"use client";

import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: "#008751",
      light: "#00a562",
      dark: "#005c38",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e8a020",
      light: "#f5b83d",
      dark: "#c48910",
      contrastText: "#0d0f0e",
    },
    background: {
      default: "#0d0f0e",
      paper: "#161a18",
    },
    text: {
      primary: "#e8ede9",
      secondary: "#8a9e90",
    },
    error: { main: "#ef4444" },
    success: { main: "#22c55e" },
    warning: { main: "#e8a020" },
    divider: "#2a3030",
  },
  typography: {
    fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
    h1: { fontFamily: "var(--font-syne, 'Syne', sans-serif)" },
    h2: { fontFamily: "var(--font-syne, 'Syne', sans-serif)" },
    h3: { fontFamily: "var(--font-syne, 'Syne', sans-serif)" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#161a18",
          "& fieldset": { borderColor: "#2a3030" },
          "&:hover fieldset": { borderColor: "#334040" },
          "&.Mui-focused fieldset": { borderColor: "#008751" },
        },
      },
    },
  },
});
