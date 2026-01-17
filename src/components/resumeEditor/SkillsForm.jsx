import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  Alert,
  Slider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SkillsForm({ resume, onSave }) {
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSkills(resume.skills || []);
    setLanguages(resume.languages || []);
  }, [resume]);

  const addSkill = () => {
    setSkills([...skills, { name: "", progress: 50 }]);
    setSuccess(false);
  };

  const addLanguage = () => {
    setLanguages([...languages, { name: "", progress: 50 }]);
    setSuccess(false);
  };

  const validate = () => {
    const all = [...skills, ...languages];
    for (const item of all) {
      if (!item.name.trim()) {
        setError("All skills and languages must have a name");
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    setError("");
    if (!validate()) return;

    await onSave({
      skills,
      languages
    });

    setSuccess(true);
  };

  return (
    <Box sx={{ maxWidth: 900 }}>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Saved successfully</Alert>}

      <Stack spacing={2} mt={2}>
        {skills.map((skill, i) => (
          <Box key={i} sx={{ p: 2, border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2 }}>
            <Stack spacing={2}>
              <TextField
                label="Skill Name"
                value={skill.name}
                onChange={(e) => {
                  const updated = [...skills];
                  updated[i].name = e.target.value;
                  setSkills(updated);
                }}
              />

              <Slider
                value={skill.progress}
                onChange={(e, v) => {
                  const updated = [...skills];
                  updated[i].progress = v;
                  setSkills(updated);
                }}
                valueLabelDisplay="auto"
                min={0}
                max={100}
              />

              <IconButton color="error" onClick={() =>
                setSkills(skills.filter((_, idx) => idx !== i))
              }>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
        ))}

        <Button variant="outlined" onClick={addSkill}>
          Add Skill
        </Button>
      </Stack>

      <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
        Languages
      </Typography>

      <Stack spacing={2} mt={2}>
        {languages.map((lang, i) => (
          <Box key={i} sx={{ p: 2, border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2 }}>
            <Stack spacing={2}>
              <TextField
                label="Language"
                value={lang.name}
                onChange={(e) => {
                  const updated = [...languages];
                  updated[i].name = e.target.value;
                  setLanguages(updated);
                }}
              />

              <Slider
                value={lang.progress}
                onChange={(e, v) => {
                  const updated = [...languages];
                  updated[i].progress = v;
                  setLanguages(updated);
                }}
                valueLabelDisplay="auto"
                min={0}
                max={100}
              />

              <IconButton color="error" onClick={() =>
                setLanguages(languages.filter((_, idx) => idx !== i))
              }>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
        ))}

        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="outlined" onClick={addLanguage}>
            Add Language
          </Button>

          <Button variant="contained" onClick={handleSave}>
            Save Skills & Languages
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
