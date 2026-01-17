import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  

  return (
    <AppBar position="static" color="primary">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT SIDE — APP NAME */}
        <Typography
          variant="h6"
          sx={{ cursor: "pointer", fontWeight: 700 }}
          onClick={() => navigate("/")}
        >
          Resume Builder
        </Typography>

        {/* RIGHT SIDE — NAV BUTTONS */}
        <Box>
          {/* Always visible */}
          <Button color="inherit" onClick={() => navigate("/")}>
            HOME
          </Button>

          {/* Only when NOT logged in */}
          {!user && (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                LOGIN
              </Button>

              <Button color="inherit" onClick={() => navigate("/register")}>
                REGISTER
              </Button>
            </>
          )}

          {/* Only when LOGGED IN */}
          {user && (
            <>
              <Button color="inherit" onClick={() => navigate("/dashboard")}>
                MY RESUMES
              </Button>

              <Button
                color="inherit"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                LOGOUT
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
