import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  Alert
} from "@mui/material";

export default function Login() {
  const { login } = useContext(AuthContext);

  // 👈 MUST be inside the component
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

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
      await login(form.email, form.password);
      navigate("/dashboard");   // 👈 redirect works now
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setServerError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );
    }
  };

  return (
    <Card sx={{ maxWidth: 450, mx: "auto" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {serverError && <Alert severity="error">{serverError}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              type="password"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />

            <Button variant="contained" type="submit">
              Login
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
