import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    // Background shades
    background: {
      default: "#0f172a",   // deep navy (not black)
      paper: "#111827"      // card panels
    },

    // Text tones
    text: {
      primary: "#e5e7eb",
      secondary: "#9ca3af"
    },

    // Accent blue (calm, not neon)
    primary: {
      main: "#3b82f6"
    },

    secondary: {
      main: "#22c55e"
    }
  },

  shape: {
    borderRadius: 12
  }
});

export default theme;
