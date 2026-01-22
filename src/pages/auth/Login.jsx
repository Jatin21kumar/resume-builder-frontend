import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  Container
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.email.includes("@"))
      newErrors.email = "Enter a valid email";

    if (!form.password)
      newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      setLoading(true);
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setServerError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: 4 }}>
      <Box sx={{ width: "100%" }}>
        <Card
          sx={{
            borderRadius: "16px",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  mx: "auto",
                  mb: 2,
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <LockIcon sx={{ fontSize: 32, color: "white" }} />
              </Box>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                Welcome Back
              </Typography>
              <Typography variant="body2" sx={{ color: "#a0aac0" }}>
                Sign in to your Resume Builder account
              </Typography>
            </Box>

            {serverError && <Alert severity="error" sx={{ mb: 3 }}>{serverError}</Alert>}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  placeholder="you@example.com"
                />

                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                  placeholder="Enter your password"
                />

                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 2,
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
                    }
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </form>

            <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid rgba(255, 255, 255, 0.1)", textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "#a0aac0" }}>
                Don't have an account?{" "}
                <Typography
                  component="span"
                  sx={{ color: "#3b82f6", cursor: "pointer", fontWeight: 600, "&:hover": { color: "#60a5fa" } }}
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Typography>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
