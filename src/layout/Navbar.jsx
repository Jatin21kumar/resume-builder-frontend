import { AppBar, Toolbar, Button, Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BuildIcon from "@mui/icons-material/Build";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #0a0e27 0%, #0f1629 50%, #0a0e27 100%)",
        borderBottom: "1px solid rgba(59, 130, 246, 0.2)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)"
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 1.5
          }}
        >
          {/* LEFT SIDE — APP NAME & LOGO */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              "&:hover": { opacity: 0.8 }
            }}
            onClick={() => navigate("/")}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <BuildIcon sx={{ color: "white", fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: "1.3rem",
                background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px"
              }}
            >
              Resume Builder
            </Typography>
          </Box>

          {/* RIGHT SIDE — NAV BUTTONS */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* Always visible */}
            <Button
              color="inherit"
              onClick={() => navigate("/")}
              sx={{
                fontWeight: 600,
                fontSize: "0.95rem",
                px: 2,
                py: 1,
                borderRadius: "8px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  color: "#60a5fa"
                }
              }}
            >
              Home
            </Button>

            {/* Only when NOT logged in */}
            {!user && (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate("/login")}
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      color: "#60a5fa"
                    }
                  }}
                >
                  Sign In
                </Button>

                <Button
                  onClick={() => navigate("/register")}
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    px: 3,
                    py: 1,
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    color: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                      transform: "translateY(-2px)"
                    }
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}

            {/* Only when LOGGED IN */}
            {user && (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate("/dashboard")}
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      color: "#60a5fa"
                    }
                  }}
                >
                  Dashboard
                </Button>

                <Button
                  color="inherit"
                  startIcon={<LogoutIcon />}
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    color: "#ef4444",
                    borderColor: "#ef4444",
                    border: "1px solid #ef4444",
                    "&:hover": {
                      backgroundColor: "rgba(239, 68, 68, 0.1)"
                    }
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
