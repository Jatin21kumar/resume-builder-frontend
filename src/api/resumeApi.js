import api from "./axios";

const toApiError = (error, fallbackMessage) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallbackMessage;

  return new Error(message);
};

export const getUserResumes = async () => {
  try {
    const res = await api.get("/api/resumes");
    return res.data;
  } catch (error) {
    throw toApiError(error, "Unable to fetch resumes");
  }
};

export const createResume = async (title) => {
  try {
    const res = await api.post("/api/resumes", { title });
    return res.data;
  } catch (error) {
    throw toApiError(error, "Unable to create resume");
  }
};

export const createDraftResume = async () => {
  try {
    const res = await api.get("/api/resumes/new");
    return res.data;
  } catch (error) {
    throw toApiError(error, "Unable to create draft resume");
  }
};

export const getResumeById = async (id) => {
  try {
    const res = await api.get(`/api/resumes/${id}`);
    return res.data;
  } catch (error) {
    throw toApiError(error, "Unable to fetch resume");
  }
};

export const updateResume = async (id, data) => {
  try {
    const res = await api.put(`/api/resumes/${id}`, data);
    return res.data;
  } catch (error) {
    throw toApiError(error, "Unable to update resume");
  }
};
