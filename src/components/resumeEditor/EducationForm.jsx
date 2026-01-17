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

export default function EducationForm({ resume, onSave }) {
  const [educations, setEducations] = useState([]);
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setEducations(resume.educations || []);
  }, [resume]);

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        degree: "",
        instituion: "",
        startDate: "",
        endDate: ""
      }
    ]);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
    setErrors("");
    setSuccess(false);
  };

  const removeEducation = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const validate = () => {
    for (let i = 0; i < educations.length; i++) {
      const e = educations[i];
      if (!e.degree.trim() || !e.instituion.trim()) {
        setErrors("Degree and Institution are required for all entries");
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    await onSave({ educations });
    setSuccess(true);
  };

  return (
    <Box sx={{ maxWidth: 900 }}>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>

      {errors && <Alert severity="error">{errors}</Alert>}
      {success && <Alert severity="success">Education saved</Alert>}

      <Stack spacing={3} mt={2}>
        {educations.map((edu, index) => (
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
                label="Degree *"
                value={edu.degree}
                onChange={(e) =>
                  updateEducation(index, "degree", e.target.value)
                }
              />

              <TextField
                label="Institution *"
                value={edu.instituion}
                onChange={(e) =>
                  updateEducation(index, "instituion", e.target.value)
                }
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Start Date"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEducation(index, "startDate", e.target.value)
                  }
                />

                <TextField
                  label="End Date"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateEducation(index, "endDate", e.target.value)
                  }
                />
              </Stack>

              <Box textAlign="right">
                <IconButton
                  color="error"
                  onClick={() => removeEducation(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Stack>
          </Box>
        ))}

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={addEducation}>
            Add Education
          </Button>

          <Button variant="contained" onClick={handleSave}>
            Save Education
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
