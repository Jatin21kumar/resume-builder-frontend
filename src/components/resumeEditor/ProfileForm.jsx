import { useState, useEffect } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";

export default function ProfileForm({ resume, onSave }) {
  const [form, setForm] = useState({
    fullName: "",
    designation: "",
    summary: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

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

    await onSave({
      profileInfo: {
        ...resume.profileInfo,
        ...form
      }
    });

    setSuccess(true);
  };

  return (
    <Box sx={{ maxWidth: 700, display: "flex", flexDirection: "column", gap: 3 }}>
      {success && <Alert severity="success">Profile saved</Alert>}

      <TextField
        label="Full Name"
        value={form.fullName}
        error={!!errors.fullName}
        helperText={errors.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        required
      />

      <TextField
        label="Designation"
        value={form.designation}
        onChange={(e) => setForm({ ...form, designation: e.target.value })}
      />

      <TextField
        label="Summary"
        value={form.summary}
        multiline
        minRows={4}
        onChange={(e) => setForm({ ...form, summary: e.target.value })}
      />

      <Button sx={{ mt: 2 }} variant="contained" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
}
