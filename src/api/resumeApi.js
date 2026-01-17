import api from "./axios";

export const getUserResumes = async () => {
  const res = await api.get("/api/resumes");
  return res.data;
};

export const createResume = async (title) => {
  const res = await api.post("/api/resumes", { title });
  return res.data;   // <-- important
};

export const getResumeById = async (id) => {
  const res = await api.get(`/api/resumes/${id}`);
  return res.data;
};

export const updateResume = async (id, data) => {
  const res = await api.put(`/api/resumes/${id}`, data);
  return res.data;
};
