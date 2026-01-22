import { useState, useEffect } from "react";
import { Box, TextField, Button, Alert, Stack, Typography, Card } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function ProfileForm({ resume, onSave }) {
  const [form, setForm] = useState({
    fullName: "",
    designation: "",
    summary: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔑 Sync when resume changes
  useEffect(() => {
    setForm({
      fullName: resume.profileInfo?.fullName || "",
      designation: resume.profileInfo?.designation || "",
      summary: resume.profileInfo?.summary || ""
    });
  }, [resume]);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await onSave({
        profileInfo: {
          ...resume.profileInfo,
          ...form
        }
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {success && (
        <Alert severity="success" sx={{ borderRadius: "10px" }}>
          Profile saved successfully!
        </Alert>
      )}

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: "#a0aac0" }}>
          Full Name *
        </Typography>
        <TextField
          label="e.g., John Doe"
          value={form.fullName}
          error={!!errors.fullName}
          helperText={errors.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
          fullWidth
          placeholder="Enter your full name"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255, 255, 255, 0.03)"
            }
          }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: "#a0aac0" }}>
          Designation
        </Typography>
        <TextField
          label="e.g., Software Engineer"
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
          fullWidth
          placeholder="Your job title or position"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255, 255, 255, 0.03)"
            }
          }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: "#a0aac0" }}>
          Professional Summary
        </Typography>
        <TextField
          label="Brief description about yourself"
          value={form.summary}
          multiline
          minRows={5}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          fullWidth
          placeholder="Write a compelling summary of your professional background, skills, and aspirations..."
          helperText={`${form.summary.length}/500 characters`}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255, 255, 255, 0.03)"
            }
          }}
        />
      </Box>

      <Button
        variant="contained"
        onClick={handleSave}
        disabled={loading}
        startIcon={<SaveIcon />}
        sx={{
          mt: 2,
          py: 1.5,
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
          }
        }}
      >
        {loading ? "Saving..." : "Save Profile"}
      </Button>
    </Box>
  );
}
