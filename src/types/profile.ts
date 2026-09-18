export type SkillGroup = {
  label: string;
  items: string[];
};

export type ExperienceItem = {
  role: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
};

export type ProjectItem = {
  name: string;
  period: string;
  stack: string[];
  summary: string;
  bullets: string[];
  href?: string;
};

export type EducationItem = {
  school: string;
  credential: string;
  location: string;
  year: string;
};

export type Profile = {
  displayName: string;
  fullName: string;
  shortName: string;
  headline: string;
  availability: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  githubUsername: string;
  linkedin: string;
  about: string;
  stats: { value: string; label: string }[];
  skillGroups: SkillGroup[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  photoFile: string;
  resumeFile: string;
  resumeMode: "generated" | "uploaded";
};
