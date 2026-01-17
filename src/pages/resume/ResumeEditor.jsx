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
  DialogActions
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



  const handleMockUpgrade = async () => {
    try {
      await api.post("/api/payment/mock-success");
      alert("Upgraded to Premium (Mock)");
      window.location.reload(); // refresh user state
    } catch (e) {
      alert("Mock payment failed");
    }
  };



  if (!resume) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 580px",
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        {/* LEFT — EDITOR */}
        <Box sx={{ minWidth: 0 }}>
          {/* TEMPLATE SELECTOR */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontWeight: 600 }}>
              Choose Template
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                sx={{ width: 220, background: "#020617", color: "#e5e7eb" }}
              >
                <MenuItem value="basic">Basic (Free)</MenuItem>
                <MenuItem value="modern">Modern (Premium)</MenuItem>
              </Select>

              <Button variant="contained" onClick={handleStartPayment}>
                Upgrade to Premium
              </Button>

            </Box>
          </Box>

          {/* TITLE */}
          <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
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
              />
            ) : (
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ cursor: "pointer" }}
                onClick={() => setEditingTitle(true)}
              >
                {resume.title || "Untitled Resume"}
              </Typography>
            )}

            {saving && (
              <Typography variant="caption" sx={{ color: "#22c55e" }}>
                Saving…
              </Typography>
            )}

            <Button
              variant="outlined"
              size="small"
              sx={{ ml: "auto" }}
              onClick={handleDownload}
            >
              Download PDF
            </Button>
          </Box>

          {/* TABS */}
          <Tabs
            value={tab}
            onChange={(e, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: 3,
              overflowX: "auto",
              "& .MuiTabs-flexContainer": { gap: 1 },
            }}
          >
            <Tab label="Profile" />
            <Tab label="Education" />
            <Tab label="Experience" />
            <Tab label="Skills" />
            <Tab label="Projects" />
          </Tabs>

          {tab === 0 && <ProfileForm resume={resume} onSave={handleUpdate} />}
          {tab === 1 && <EducationForm resume={resume} onSave={handleUpdate} />}
          {tab === 2 && <ExperienceForm resume={resume} onSave={handleUpdate} />}
          {tab === 3 && <SkillsForm resume={resume} onSave={handleUpdate} />}
          {tab === 4 && <ProjectsForm resume={resume} onSave={handleUpdate} />}
        </Box>

        {/* RIGHT — PREVIEW */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 580,
            position: "sticky",
            top: 24,
            borderRadius: 3,
            backgroundColor: "#020617",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <Box ref={previewRef}>
            <ResumePreview resume={resume} />
          </Box>
        </Box>
      </Box>

      {/* UPGRADE MODAL */}
      <Dialog open={showUpgrade} onClose={() => setShowUpgrade(false)}>
        <DialogTitle>Upgrade to Premium</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 1 }}>
            Premium unlocks:
          </Typography>

          <ul style={{ marginTop: 0 }}>
            <li>Modern resume templates</li>
            <li>Better formatting & design</li>
            <li>Cleaner downloadable PDFs</li>
          </ul>

          <Typography sx={{ mt: 2, fontWeight: 600 }}>
            Price: ₹199 (one-time)
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setShowUpgrade(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleStartPayment}>
            Continue to Payment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
