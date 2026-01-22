import { Box, Typography, Divider } from "@mui/material";

export default function ResumePreview({ resume }) {
  const profile = resume.profileInfo || {};
  const skills = resume.skills || [];
  const education = resume.educations || [];
  const experience = resume.workExperience || [];
  const projects = resume.projects || [];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        padding: "40px",
        color: "#f0f4f8",
        fontSize: "0.95rem",
        boxSizing: "border-box",
        background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
        color: "#1f2937",
        lineHeight: 1.7
      }}
    >
      {/* PROFILE HEADER */}
      {(profile.fullName || profile.designation || profile.summary) && (
        <Box sx={{ mb: 4 }}>
          {profile.fullName && (
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                mb: 0.5,
                color: "#0a0e27",
                letterSpacing: "-0.02em"
              }}
            >
              {profile.fullName}
            </Typography>
          )}

          {profile.designation && (
            <Typography
              sx={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#3b82f6",
                mb: 2
              }}
            >
              {profile.designation}
            </Typography>
          )}

          {profile.summary && (
            <Typography
              sx={{
                lineHeight: 1.7,
                color: "#4b5563",
                fontStyle: "italic"
              }}
            >
              {profile.summary}
            </Typography>
          )}
        </Box>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Divider sx={{ my: 2, borderColor: "#d1d5db" }} />
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              mb: 2,
              color: "#0a0e27",
              textTransform: "uppercase",
              fontSize: "0.9rem",
              letterSpacing: "0.1em"
            }}
          >
            Experience
          </Typography>

          {experience.map((exp, i) => (
            <Box key={i} sx={{ mb: 2.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <Typography fontWeight={700} sx={{ color: "#0a0e27" }}>
                  {exp.role}
                </Typography>
                <Typography variant="caption" sx={{ color: "#6b7280", fontWeight: 500 }}>
                  {exp.startDate} – {exp.endDate}
                </Typography>
              </Box>
              <Typography sx={{ color: "#3b82f6", fontWeight: 600, mb: 0.5 }}>
                {exp.company}
              </Typography>
              {exp.description && (
                <Typography sx={{ color: "#4b5563", lineHeight: 1.6 }}>
                  {exp.description}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Divider sx={{ my: 2, borderColor: "#d1d5db" }} />
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              mb: 2,
              color: "#0a0e27",
              textTransform: "uppercase",
              fontSize: "0.9rem",
              letterSpacing: "0.1em"
            }}
          >
            Education
          </Typography>

          {education.map((edu, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography fontWeight={700} sx={{ color: "#0a0e27" }}>
                {edu.degree}
              </Typography>
              <Typography sx={{ color: "#3b82f6", fontWeight: 600 }}>
                {edu.institution}
              </Typography>
              <Typography variant="caption" sx={{ color: "#6b7280", fontWeight: 500 }}>
                {edu.startDate} – {edu.endDate}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Divider sx={{ my: 2, borderColor: "#d1d5db" }} />
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              mb: 2,
              color: "#0a0e27",
              textTransform: "uppercase",
              fontSize: "0.9rem",
              letterSpacing: "0.1em"
            }}
          >
            Skills
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
            {skills.map((skill, i) => (
              <Box key={i}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography fontWeight={600} sx={{ color: "#0a0e27" }}>
                    {skill.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#6b7280" }}>
                    {skill.progress}%
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 6,
                    backgroundColor: "#e5e7eb",
                    borderRadius: 2,
                    overflow: "hidden"
                  }}
                >
                  <Box
                    sx={{
                      width: `${skill.progress}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
                      borderRadius: 2,
                      transition: "width 0.3s ease"
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Divider sx={{ my: 2, borderColor: "#d1d5db" }} />
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              mb: 2,
              color: "#0a0e27",
              textTransform: "uppercase",
              fontSize: "0.9rem",
              letterSpacing: "0.1em"
            }}
          >
            Projects
          </Typography>

          {projects.map((p, i) => (
            <Box key={i} sx={{ mb: 2.5 }}>
              <Typography fontWeight={700} sx={{ color: "#0a0e27" }}>
                {p.title}
              </Typography>

              {p.company && (
                <Typography sx={{ color: "#3b82f6", fontWeight: 600 }}>
                  {p.company}
                </Typography>
              )}

              {p.description && (
                <Typography sx={{ mt: 0.5, color: "#4b5563" }}>
                  {p.description}
                </Typography>
              )}

              {p.link && (
                <Typography
                  component="a"
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#3b82f6",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" }
                  }}
                >
                  {p.link}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
