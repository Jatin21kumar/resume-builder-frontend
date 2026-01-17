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
        padding: "32px",
        color: "#e5e7eb",
        fontSize: "0.9rem",
        boxSizing: "border-box",
      }}
    >
      {/* PROFILE */}
      {profile.fullName && (
        <Typography variant="h4" fontWeight={700}>
          {profile.fullName}
        </Typography>
      )}

      {profile.designation && (
        <Typography sx={{ color: "#94a3b8", mb: 2 }}>
          {profile.designation}
        </Typography>
      )}

      {profile.summary && (
        <Typography sx={{ lineHeight: 1.6 }}>
          {profile.summary}
        </Typography>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight={600}>
            Experience
          </Typography>

          {experience.map((exp, i) => (
            <Box key={i} sx={{ mt: 1.5 }}>
              <Typography fontWeight={600}>
                {exp.role} — {exp.company}
              </Typography>
              <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                {exp.startDate} – {exp.endDate}
              </Typography>
              {exp.description && (
                <Typography sx={{ mt: 0.5 }}>
                  {exp.description}
                </Typography>
              )}
            </Box>
          ))}
        </>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight={600}>
            Education
          </Typography>

          {education.map((edu, i) => (
            <Box key={i} sx={{ mt: 1.5 }}>
              <Typography fontWeight={600}>{edu.degree}</Typography>
              <Typography sx={{ color: "#94a3b8" }}>
                {edu.institution}
              </Typography>
              <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                {edu.startDate} – {edu.endDate}
              </Typography>
            </Box>
          ))}
        </>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight={600}>
            Skills
          </Typography>

          {skills.map((skill, i) => (
            <Box key={i} sx={{ mt: 1 }}>
              <Typography>{skill.name}</Typography>
              <Box
                sx={{
                  height: 6,
                  backgroundColor: "#1e293b",
                  borderRadius: 3,
                }}
              >
                <Box
                  sx={{
                    width: `${skill.progress}%`,
                    height: "100%",
                    backgroundColor: "#3b82f6",
                    borderRadius: 3,
                  }}
                />
              </Box>
            </Box>
          ))}
        </>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" fontWeight={600}>
            Projects
          </Typography>

          {projects.map((p, i) => (
            <Box key={i} sx={{ mt: 1.5 }}>
              <Typography fontWeight={600}>
                {p.title}
              </Typography>

              {p.company && (
                <Typography sx={{ color: "#94a3b8" }}>
                  {p.company}
                </Typography>
              )}

              <Typography sx={{ mt: 0.5 }}>
                {p.description}
              </Typography>

              {p.link && (
                <Typography sx={{ color: "#60a5fa", mt: 0.5 }}>
                  {p.link}
                </Typography>
              )}
            </Box>
          ))}
        </>
      )}


    </Box>
  );
}
