import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Stack,
  Alert
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ExperienceForm({ resume, onSave }) {
  const [experiences, setExperiences] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setExperiences(resume.workExperience || []);
  }, [resume]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ]);
    setError("");
    setSuccess(false);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
    setError("");
    setSuccess(false);
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const validate = () => {
    for (const exp of experiences) {
      if (!exp.company.trim() || !exp.role.trim()) {
        setError("Company and Role are required for all entries");
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    await onSave({ workExperience: experiences });
    setSuccess(true);
  };

  return (
    <Box sx={{ maxWidth: 900, pt: 1 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Work Experience
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Experience saved</Alert>}

      <Stack spacing={3} mt={2}>
        {experiences.map((exp, index) => (
          <Box
            key={index}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.15)"
            }}
          >
            <Stack spacing={2}>
              <TextField
                label="Company *"
                value={exp.company}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
              />

              <TextField
                label="Role *"
                value={exp.role}
                onChange={(e) =>
                  updateExperience(index, "role", e.target.value)
                }
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Start Date"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(index, "startDate", e.target.value)
                  }
                />

                <TextField
                  label="End Date"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateExperience(index, "endDate", e.target.value)
                  }
                />
              </Stack>

              <TextField
                label="Description"
                multiline
                minRows={4}
                value={exp.description}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
              />

              <Box textAlign="right">
                <IconButton
                  color="error"
                  onClick={() => removeExperience(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Stack>
          </Box>
        ))}

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={addExperience}>
            Add Experience
          </Button>

          <Button variant="contained" onClick={handleSave}>
            Save Experience
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
