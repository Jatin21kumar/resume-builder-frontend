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
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (form.name.length < 2 || form.name.length > 15)
      newErrors.name = "Name must be between 2 and 15 characters";

    if (!form.email.includes("@"))
      newErrors.email = "Enter a valid email";

    if (form.password.length < 8 || form.password.length > 15)
      newErrors.password = "Password must be between 8 and 15 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      setLoading(true);
      await register(form);
      alert("Check your email to verify.");
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setServerError(err.response?.data?.message || "Registration failed");
      }
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
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <PersonAddIcon sx={{ fontSize: 32, color: "white" }} />
              </Box>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                Create Your Account
              </Typography>
              <Typography variant="body2" sx={{ color: "#a0aac0" }}>
                Join Resume Builder and create professional resumes
              </Typography>
            </Box>

            {serverError && <Alert severity="error" sx={{ mb: 3 }}>{serverError}</Alert>}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  name="name"
                  label="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth
                  placeholder="John Doe"
                />

                <TextField
                  name="email"
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  placeholder="you@example.com"
                />

                <TextField
                  name="password"
                  type="password"
                  label="Password"
                  value={form.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                  placeholder="Minimum 8 characters"
                />

                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{
                    mt: 2,
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #059669 0%, #047857 100%)"
                    }
                  }}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </Stack>
            </form>

            <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid rgba(255, 255, 255, 0.1)", textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "#a0aac0" }}>
                Already have an account?{" "}
                <Typography
                  component="span"
                  sx={{ color: "#3b82f6", cursor: "pointer", fontWeight: 600, "&:hover": { color: "#60a5fa" } }}
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Typography>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
