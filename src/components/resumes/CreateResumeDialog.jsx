import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";

export default function CreateResumeDialog({ open, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (title.trim().length < 1) {
      setError("Title is required");
      return;
    }

    onCreate(title.trim());
    setTitle("");
    setError("");
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Resume</DialogTitle>

      <DialogContent>
        <TextField
          label="Resume Title"
          fullWidth
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          error={!!error}
          helperText={error}
          sx={{ mt: 1 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
