import type { Metadata } from "next";
import LevelLayout, { type LevelContent } from "@/components/LevelLayout";

export const metadata: Metadata = {
  title: "Junior Secondary (Grade 7–8) | Kenol Junior Angels Academy",
  description: "Preparing for senior school with leadership and independent study, ages 12–13, in Kenol.",
};

const level: LevelContent = {
  current: "junior-secondary",
  applyCodes: ["GRADE7", "GRADE8"],
  title: "Junior Secondary",
  grades: "Grade 7–8",
  ages: "Ages 12–13",
  tagline: "Preparing for senior school with leadership and independent study.",
  intro:
    "Learners explore subjects in more depth, discover their strengths and interests, and develop the leadership and study skills they will need in senior school.",
  subjects: [
    { name: "English", detail: "Literature, grammar, writing and public speaking." },
    { name: "Kiswahili", detail: "Fasihi, sarufi na uandishi." },
    { name: "Mathematics", detail: "Algebra, geometry, measurement and statistics." },
    { name: "Integrated Science", detail: "Biology, chemistry and physics concepts taught together." },
    { name: "Social Studies", detail: "History, geography and citizenship." },
    { name: "Health Education", detail: "Personal health, wellbeing and life skills." },
    { name: "Pre-Technical and Pre-Career Education", detail: "Practical skills, design and career exploration." },
    { name: "Agriculture and Nutrition", detail: "Food production, nutrition and sustainability." },
    { name: "Creative Arts and Sports", detail: "Art, music, drama and physical education." },
    { name: "Religious Education", detail: "Ethics, values and reflection." },
  ],
  skills: ["Leadership", "Independent study", "Digital literacy", "Career awareness"],
  activities: ["Leadership roles", "Sports teams", "Clubs and societies", "Talent shows"],
};

export default function JuniorSecondaryPage() {
  return <LevelLayout level={level} />;
}