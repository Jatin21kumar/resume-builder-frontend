// src/components/resumes/ResumesList.jsx

import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserResumes } from "../../api/resumeApi";

const ResumesList = forwardRef((props, ref) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchResumes = async () => {
    try {
      const data = await getUserResumes();
      setResumes(data || []);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    reload: fetchResumes
  }));

  useEffect(() => {
    fetchResumes();
  }, []);

  if (loading) {
    return <Typography>Loading resumes...</Typography>;
  }

  if (resumes.length === 0) {
    return (
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h6">No resumes yet</Typography>
          <Typography color="text.secondary">
            Click “Create Resume” to start building.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={3}>
      {resumes.map((resume) => (
        <Grid item xs={12} sm={6} md={4} key={resume.id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {resume.title || "Untitled Resume"}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {resume.profileInfo?.fullName || "No name set"}
              </Typography>

              <Box>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    navigate(`/resume/${resume.id}/edit`)
                  }
                >
                  EDIT
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});

export default ResumesList;
