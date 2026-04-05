import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ResumesList from "../../components/resumes/ResumesList";

export default function ResumeListPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 2,
          flexWrap: "wrap"
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Resume Library
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/dashboard")}
          >
            Back
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/resume/new/edit")}
            sx={{
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
              }
            }}
          >
            New Resume
          </Button>
        </Box>
      </Box>

      <ResumesList />
    </Box>
  );
}
