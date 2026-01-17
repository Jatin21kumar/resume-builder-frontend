import { Box, Typography, LinearProgress, Stack } from "@mui/material";

export default function SkillsPreview({ skills = [] }) {
  if (!skills.length) return null;

  return (
    <Box mt={3}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Skills
      </Typography>

      <Stack spacing={1.5}>
        {skills.map((skill, index) => (
          <Box key={index}>
            <Typography variant="body2" mb={0.5}>
              {skill.name}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={skill.progress || 0}
              sx={{
                height: 6,
                borderRadius: 5,
                backgroundColor: "#1e293b",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#3b82f6"
                }
              }}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
