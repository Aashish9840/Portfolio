export interface SkillGroup {
  title: string;
  summary: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Interfaces",
    summary: "Where I spend most of my time: components, layout and motion.",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Motion"],
  },
  {
    title: "Server and data",
    summary: "Enough backend to ship a feature end to end, and growing.",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    title: "Workflow",
    summary: "How the work gets reviewed, versioned and shipped.",
    skills: ["Git", "GitHub", "Vercel", "Zod", "React Hook Form"],
  },
];
