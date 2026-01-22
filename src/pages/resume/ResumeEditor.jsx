import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import  api  from "../../api/axios";

import {
  Box,
  Tabs,
  Tab,
  CircularProgress,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  Stack,
  Chip,
  Container
} from "@mui/material";

import { getResumeById, updateResume } from "../../api/resumeApi";

import ProfileForm from "../../components/resumeEditor/ProfileForm";
import EducationForm from "../../components/resumeEditor/EducationForm";
import ExperienceForm from "../../components/resumeEditor/ExperienceForm";
import SkillsForm from "../../components/resumeEditor/SkillsForm";
import ProjectsForm from "../../components/resumeEditor/ProjectsForm";

import ResumePreview from "../../components/resumePreview/TemplateBasic";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import SaveIcon from "@mui/icons-material/Save";
import GetAppIcon from "@mui/icons-material/GetApp";
import LockIcon from "@mui/icons-material/Lock";

export default function ResumeEditor() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [tab, setTab] = useState(0);

  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const previewRef = useRef(null);

  // premium popup
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    getResumeById(id).then((data) => {
      setResume(data);
      setTitle(data.title || "");
    });
  }, [id]);

  const handleUpdate = async (partialUpdate) => {
    if (!resume) return;

    setSaving(true);

    const updated = await updateResume(id, {
      ...resume,
      ...partialUpdate,
    });

    setResume(updated);
    setSaving(false);
  };

  const handleDownload = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(img, "PNG", 0, 0, width, height);
    pdf.save(`${resume?.title || "resume"}.pdf`);
  };

  // placeholder payment starter
  const handleStartPayment = async () => {
    try {
      await api.post("/api/payment/mock-success");
      await handleUpdate({ isPremium: true });
      setShowUpgrade(false);
      alert("Premium activated (mock)");
    } catch (err) {
      console.error("Mock payment failed", err);
    }
  };

  if (!resume) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Container maxWidth="100%" sx={{ py: 4 }}>
        {/* HEADER */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            {editingTitle ? (
              <TextField
                value={title}
                size="small"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                onBlur={async () => {
                  setEditingTitle(false);
                  await handleUpdate({ title });
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    setEditingTitle(false);
                    await handleUpdate({ title });
                  }
                }}
                sx={{ flex: 1 }}
              />
            ) : (
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{ cursor: "pointer", flex: 1, "&:hover": { color: "#60a5fa" }, transition: "color 0.3s" }}
                onClick={() => setEditingTitle(true)}
              >
                {resume.title || "Untitled Resume"}
              </Typography>
            )}

            {saving && (
              <Chip
                icon={<SaveIcon />}
                label="Saving..."
                size="small"
                sx={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "white" }}
              />
            )}
          </Box>

          {/* TEMPLATE SELECTOR & BUTTONS */}
          <Card sx={{ p: 3, border: "1px solid rgba(59, 130, 246, 0.2)" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
              <Box sx={{ flex: 1, minWidth: 250 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: "#a0aac0" }}>
                  Choose Template
                </Typography>
                <Select
                  value={resume.template || "basic"}
                  size="small"
                  onChange={async (e) => {
                    const value = e.target.value;

                    if (!resume.isPremium && value !== "basic") {
                      setShowUpgrade(true);
                      return;
                    }

                    await handleUpdate({ template: value });
                  }}
                  sx={{
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "10px"
                  }}
                >
                  <MenuItem value="basic">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      Basic (Free)
                    </Box>
                  </MenuItem>
                  <MenuItem value="modern">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LockIcon sx={{ fontSize: 16 }} />
                      Modern (Premium)
                    </Box>
                  </MenuItem>
                </Select>
              </Box>

              <Button
                variant="contained"
                onClick={() => setShowUpgrade(true)}
                sx={{
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)"
                  }
                }}
              >
                Upgrade to Premium
              </Button>

              <Button
                variant="contained"
                startIcon={<GetAppIcon />}
                onClick={handleDownload}
                sx={{
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #059669 0%, #047857 100%)"
                  }
                }}
              >
                Download PDF
              </Button>
            </Box>
          </Card>
        </Box>

        {/* MAIN EDITOR LAYOUT */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 650px",
            gap: 4,
            alignItems: "flex-start"
          }}
        >
          {/* LEFT — EDITOR FORMS */}
          <Box sx={{ minWidth: 0 }}>
            <Card sx={{ borderRadius: "16px", border: "1px solid rgba(59, 130, 246, 0.1)", p: 0, overflow: "hidden" }}>
              {/* TABS */}
              <Box sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <Tabs
                  value={tab}
                  onChange={(e, v) => setTab(v)}
                  variant="fullWidth"
                  sx={{
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      py: 2
                    }
                  }}
                >
                  <Tab label="Profile" />
                  <Tab label="Education" />
                  <Tab label="Experience" />
                  <Tab label="Skills" />
                  <Tab label="Projects" />
                </Tabs>
              </Box>

              {/* FORM CONTENT */}
              <Box sx={{ p: 4 }}>
                {tab === 0 && <ProfileForm resume={resume} onSave={handleUpdate} />}
                {tab === 1 && <EducationForm resume={resume} onSave={handleUpdate} />}
                {tab === 2 && <ExperienceForm resume={resume} onSave={handleUpdate} />}
                {tab === 3 && <SkillsForm resume={resume} onSave={handleUpdate} />}
                {tab === 4 && <ProjectsForm resume={resume} onSave={handleUpdate} />}
              </Box>
            </Card>
          </Box>

          {/* RIGHT — PREVIEW */}
          <Box
            sx={{
              position: "sticky",
              top: 20,
              height: "calc(100vh - 100px)"
            }}
          >
            <Card
              sx={{
                borderRadius: "16px",
                border: "2px solid rgba(59, 130, 246, 0.2)",
                height: "100%",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 20px 60px rgba(59, 130, 246, 0.15)"
              }}
            >
              <Box
                sx={{
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)",
                  p: 2,
                  borderBottom: "1px solid rgba(59, 130, 246, 0.2)"
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#a0aac0" }}>
                  Live Preview
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  overflow: "auto",
                  background: "#020617"
                }}
                ref={previewRef}
              >
                <ResumePreview resume={resume} />
              </Box>
            </Card>
          </Box>
        </Box>
      </Container>

      {/* UPGRADE MODAL */}
      <Dialog open={showUpgrade} onClose={() => setShowUpgrade(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.3rem" }}>Unlock Premium Features</DialogTitle>

        <DialogContent sx={{ py: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 2, color: "#a0aac0" }}>
              Get access to professional resume templates and advanced features:
            </Typography>

            <Stack spacing={1.5}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ color: "#10b981", fontSize: "1.3rem" }}>✓</Box>
                <Typography>Modern & Modern Pro templates</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ color: "#10b981", fontSize: "1.3rem" }}>✓</Box>
                <Typography>Premium formatting & design options</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ color: "#10b981", fontSize: "1.3rem" }}>✓</Box>
                <Typography>High-quality PDF export</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ color: "#10b981", fontSize: "1.3rem" }}>✓</Box>
                <Typography>Priority support</Typography>
              </Box>
            </Stack>
          </Box>

          <Card sx={{ p: 2, background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)", border: "1px solid rgba(16, 185, 129, 0.2)", textAlign: "center" }}>
            <Typography variant="h6" fontWeight={700} sx={{ color: "#10b981" }}>
              ₹199 <Typography component="span" sx={{ fontSize: "0.9rem", color: "#a0aac0", fontWeight: 400 }}>(one-time)</Typography>
            </Typography>
          </Card>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button onClick={() => setShowUpgrade(false)} variant="outlined">
            Maybe Later
          </Button>
          <Button
            variant="contained"
            onClick={handleStartPayment}
            sx={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #059669 0%, #047857 100%)"
              }
            }}
          >
            Continue to Payment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
