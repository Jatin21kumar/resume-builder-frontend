import { Box, Card, CardContent, Typography, Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import WorkIcon from "@mui/icons-material/Work";
import StorageIcon from "@mui/icons-material/Storage";
import DownloadIcon from "@mui/icons-material/Download";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const features = [
    {
      icon: <WorkIcon sx={{ fontSize: 40, color: "#3b82f6" }} />,
      title: "Multiple Templates",
      description: "Choose from professional resume templates designed by experts"
    },
    {
      icon: <StorageIcon sx={{ fontSize: 40, color: "#10b981" }} />,
      title: "Auto-Save",
      description: "Your work is automatically saved as you type"
    },
    {
      icon: <DownloadIcon sx={{ fontSize: 40, color: "#f59e0b" }} />,
      title: "Download as PDF",
      description: "Export your resume in high-quality PDF format"
    },
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 40, color: "#06b6d4" }} />,
      title: "Instant Updates",
      description: "See changes in real-time as you build your resume"
    }
  ];

  return (
    <Box sx={{ minHeight: "100vh", pt: 4, pb: 8 }}>
      {/* HERO SECTION */}
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            mb: 8,
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)",
            borderRadius: "20px",
            p: 8,
            border: "1px solid rgba(59, 130, 246, 0.2)",
            backdropFilter: "blur(10px)"
          }}
        >
          <Typography variant="h2" fontWeight={800} sx={{ mb: 3, background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Build Your Perfect Resume
          </Typography>

          <Typography variant="h6" sx={{ mb: 6, color: "#a0aac0", maxWidth: 600, mx: "auto", lineHeight: 1.8 }}>
            Create a professional resume in minutes with our intuitive builder. Stand out to employers with an ATS-optimized design.
          </Typography>

          <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/resume/new/edit")}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: "1.1rem",
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  transform: "translateY(-3px)"
                }
              }}
            >
              Create New Resume
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/resume/list")}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: "1.1rem",
                borderColor: "#3b82f6",
                color: "#60a5fa",
                "&:hover": {
                  borderColor: "#60a5fa",
                  backgroundColor: "rgba(59, 130, 246, 0.1)"
                }
              }}
            >
              View My Resumes
            </Button>
          </Box>
        </Box>

        {/* FEATURES GRID */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 6, textAlign: "center" }}>
            Why Choose Resume Builder?
          </Typography>

          <Grid container spacing={3}>
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card sx={{ h: "100%", textAlign: "center", p: 3, border: "1px solid rgba(59, 130, 246, 0.1)", transition: "all 0.3s ease", "&:hover": { boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)", borderColor: "rgba(59, 130, 246, 0.3)", transform: "translateY(-5px)" } }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#a0aac0" }}>
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* PREMIUM SECTION */}
        <Card
          sx={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)",
            border: "2px solid rgba(59, 130, 246, 0.3)",
            p: 6,
            textAlign: "center",
            mb: 8
          }}
        >
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: "#f0f4f8" }}>
            Unlock Premium Features
          </Typography>
          <Typography sx={{ mb: 4, color: "#a0aac0", maxWidth: 500, mx: "auto" }}>
            Access exclusive templates, advanced formatting, and priority support for just ₹199
          </Typography>
          
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2, mb: 4, textAlign: "left" }}>
            <Box sx={{ p: 2 }}>
              <Typography sx={{ color: "#10b981", fontWeight: 600, mb: 1 }}>✓ Premium Templates</Typography>
              <Typography variant="body2" sx={{ color: "#a0aac0" }}>Modern & Modern Pro designs</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography sx={{ color: "#10b981", fontWeight: 600, mb: 1 }}>✓ Better Formatting</Typography>
              <Typography variant="body2" sx={{ color: "#a0aac0" }}>Enhanced styling options</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography sx={{ color: "#10b981", fontWeight: 600, mb: 1 }}>✓ High-Quality Export</Typography>
              <Typography variant="body2" sx={{ color: "#a0aac0" }}>Professional PDF output</Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              px: 5,
              py: 1.5,
              fontSize: "1rem",
              "&:hover": {
                background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                transform: "translateY(-2px)"
              }
            }}
          >
            Upgrade to Premium
          </Button>
        </Card>

        {/* CTA */}
        {!user && (
          <Card sx={{ p: 6, textAlign: "center" }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              Ready to Get Started?
            </Typography>
            <Typography sx={{ mb: 4, color: "#a0aac0" }}>
              Sign up now and create your first professional resume
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/register")}
                sx={{ px: 4 }}
              >
                Sign Up Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/login")}
                sx={{ px: 4 }}
              >
                Sign In
              </Button>
            </Box>
          </Card>
        )}
      </Container>
    </Box>
  );
}
