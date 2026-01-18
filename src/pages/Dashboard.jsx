import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 6 }}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 5 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Welcome 👋
          </Typography>

          <Typography sx={{ mb: 4 }}>
            Resume Builder Dashboard
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/resume/new/edit")}
            >
              Create Resume
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/resume/list")}
            >
              My Resumes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
