import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    // Background shades
    background: {
      default: "#0a0e27",   // deep navy
      paper: "#0f1629"      // card panels
    },

    // Text tones
    text: {
      primary: "#f0f4f8",
      secondary: "#a0aac0"
    },

    // Premium blue gradient colors
    primary: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#1e40af"
    },

    secondary: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669"
    },

    success: {
      main: "#10b981"
    },

    warning: {
      main: "#f59e0b"
    },

    error: {
      main: "#ef4444"
    },

    info: {
      main: "#06b6d4"
    }
  },

  shape: {
    borderRadius: 14
  },

  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.02em"
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em"
    },
    h3: {
      fontWeight: 700
    },
    h4: {
      fontWeight: 700
    },
    h5: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 600
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.4px"
    }
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          padding: "10px 24px",
          fontSize: "0.95rem",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.2)"
          }
        },
        contained: {
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
          }
        },
        containedSuccess: {
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #059669 0%, #047857 100%)"
          }
        },
        outlined: {
          borderColor: "#3b82f6",
          color: "#60a5fa",
          "&:hover": {
            borderColor: "#60a5fa",
            backgroundColor: "rgba(59, 130, 246, 0.08)"
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          backgroundColor: "#0f1629",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 25px 50px rgba(59, 130, 246, 0.15)",
            borderColor: "rgba(59, 130, 246, 0.3)"
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "rgba(255, 255, 255, 0.2)",
              backgroundColor: "rgba(255, 255, 255, 0.04)"
            },
            "&.Mui-focused": {
              borderColor: "#3b82f6",
              boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
            }
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #0a0e27 0%, #0f1629 50%, #0a0e27 100%)",
          borderBottom: "1px solid rgba(59, 130, 246, 0.2)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)"
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backgroundColor: "#0f1629"
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
        },
        indicator: {
          height: "3px",
          borderRadius: "2px",
          background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)"
        }
      }
    }
  }
});

export default theme;
