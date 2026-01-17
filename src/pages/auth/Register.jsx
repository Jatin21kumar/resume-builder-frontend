import { useState, useContext } from "react";
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

export default function Register() {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

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
      await register(form);
      alert("Check your email to verify.");
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setServerError(err.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 450, mx: "auto" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create Account
        </Typography>

        {serverError && <Alert severity="error">{serverError}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />

            <TextField
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              name="password"
              type="password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />

            <Button variant="contained" type="submit">
              Register
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
