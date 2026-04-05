import { Box, TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProjectsForm({ resume, onSave, onChange }) {
  const projects = resume.projects || [];

  const emitUpdate = (updatedProjects) => {
    if (typeof onChange === "function") {
      onChange({ projects: updatedProjects });
      return;
    }

    onSave({ projects: updatedProjects });
  };

  const updateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    emitUpdate(updated);
  };

  const addProject = () => {
    emitUpdate([
      ...projects,
      { title: "", company: "", description: "", link: "" }
    ]);
  };

  const removeProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    emitUpdate(updated);
  };

  return (
    <Box>
      {projects.map((p, i) => (
        <Box
          key={i}
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            border: "1px solid #334155"
          }}
        >
          <TextField
            fullWidth
            label="Project Title"
            value={p.title}
            sx={{ mb: 2 }}
            onChange={(e) => updateProject(i, "title", e.target.value)}
          />

          <TextField
            fullWidth
            label="Organization / Company (optional)"
            value={p.company}
            sx={{ mb: 2 }}
            onChange={(e) => updateProject(i, "company", e.target.value)}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={p.description}
            sx={{ mb: 2 }}
            onChange={(e) => updateProject(i, "description", e.target.value)}
          />

          <TextField
            fullWidth
            label="Link (GitHub, Demo, etc.)"
            value={p.link}
            sx={{ mb: 2 }}
            onChange={(e) => updateProject(i, "link", e.target.value)}
          />

          <IconButton onClick={() => removeProject(i)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ))}

      <Button variant="contained" onClick={addProject}>
        Add Project
      </Button>

      <Button variant="outlined" sx={{ ml: 2 }} onClick={() => onSave({ projects })}>
        Save Projects
      </Button>
    </Box>
  );
}
