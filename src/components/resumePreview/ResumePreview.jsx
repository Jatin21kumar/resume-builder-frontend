import TemplateModern from "./TemplateModern";
import TemplateBasic from "./TemplateModern";


export default function ResumePreview({ resume }) {
  const template = resume.template || "basic";

  if (template === "modern") return <TemplateModern resume={resume} />;

  return <TemplateBasic resume={resume} />;
}
