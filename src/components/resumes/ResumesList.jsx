import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Skeleton,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserResumes } from "../../api/resumeApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const ResumesList = forwardRef((props, ref) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
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

  const handleDelete = async (id) => {
    // TODO: Implement delete API call
    console.log("Delete resume:", id);
    setDeleteConfirm(null);
  };

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ height: 250 }}>
              <CardContent>
                <Skeleton variant="text" height={30} sx={{ mb: 2 }} />
                <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={40} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (resumes.length === 0) {
    return (
      <Card
        sx={{
          textAlign: "center",
          p: 6,
          border: "2px dashed rgba(59, 130, 246, 0.3)",
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)"
        }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          No Resumes Yet
        </Typography>
        <Typography sx={{ color: "#a0aac0", mb: 4 }}>
          Create your first resume to get started. It only takes a few minutes!
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          onClick={() => navigate("/resume/new/edit")}
          sx={{
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
            }
          }}
        >
          Create Your First Resume
        </Button>
      </Card>
    );
  }

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          My Resumes
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {resumes.map((resume) => (
          <Grid item xs={12} sm={6} md={4} key={resume.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.3s ease",
                border: "1px solid rgba(59, 130, 246, 0.1)",
                "&:hover": {
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)",
                  borderColor: "rgba(59, 130, 246, 0.3)",
                  transform: "translateY(-5px)"
                }
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                  <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>
                    {resume.title || "Untitled Resume"}
                  </Typography>
                  {resume.isPremium && (
                    <Chip
                      label="Premium"
                      size="small"
                      sx={{
                        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                        color: "white",
                        fontWeight: 600
                      }}
                    />
                  )}
                </Box>

                <Typography variant="body2" sx={{ color: "#a0aac0", mb: 3 }}>
                  {resume.profileInfo?.fullName || "No profile information"}
                </Typography>

                <Stack spacing={1.5} sx={{ mb: 3 }}>
                  {resume.profileInfo?.designation && (
                    <Typography variant="caption" sx={{ color: "#6b7280" }}>
                      <strong>Position:</strong> {resume.profileInfo.designation}
                    </Typography>
                  )}
                  <Typography variant="caption" sx={{ color: "#6b7280" }}>
                    <strong>Template:</strong> {resume.template || "Basic"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#6b7280" }}>
                    <strong>Updated:</strong> {new Date(resume.updatedAt).toLocaleDateString()}
                  </Typography>
                </Stack>
              </CardContent>

              <Box sx={{ p: 2, borderTop: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`/resume/${resume.id}/edit`)}
                  fullWidth
                  sx={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
                    }
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => setDeleteConfirm(resume.id)}
                  sx={{
                    borderColor: "#ef4444",
                    color: "#ef4444",
                    "&:hover": {
                      backgroundColor: "rgba(239, 68, 68, 0.1)"
                    }
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Delete Resume?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this resume? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            sx={{ background: "#ef4444", "&:hover": { background: "#dc2626" } }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default ResumesList;
