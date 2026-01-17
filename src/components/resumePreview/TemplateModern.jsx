import { Box, Typography, Divider } from "@mui/material";

export default function TemplateModern({ resume }) {
  const p = resume.profileInfo || {};

  return (
    <Box sx={{ padding: 3, color: "#111", background: "#fff" }}>
      <Typography variant="h3" fontWeight={800}>
        {p.fullName}
      </Typography>

      <Typography sx={{ color: "#6b7280", mb: 2 }}>
        {p.designation}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography sx={{ fontStyle: "italic" }}>
        {p.summary}
      </Typography>

      {/* Add simplified sections below */}
    </Box>
  );
}
