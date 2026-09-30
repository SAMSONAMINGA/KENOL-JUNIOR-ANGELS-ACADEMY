import type { Metadata } from "next";
import LevelLayout, { type LevelContent } from "@/components/LevelLayout";

export const metadata: Metadata = {
  title: "Lower Primary (Grade 1–3) | Kenol Junior Angels Academy",
  description: "A strong foundation in reading, writing and mathematics for ages 6–8 in Kenol.",
};

const level: LevelContent = {
  current: "lower-primary",
  applyCodes: ["GRADE1", "GRADE2", "GRADE3"],
  title: "Lower Primary",
  grades: "Grade 1–3",
  ages: "Ages 6–8",
  tagline: "A strong foundation in reading, writing and mathematics.",
  intro:
    "Learners move from play-based learning to more structured lessons, with a strong focus on literacy and numeracy taught through practical, activity-based lessons.",
  subjects: [
    { name: "English language activities", detail: "Reading, phonics, writing and speaking." },
    { name: "Kiswahili language activities", detail: "Kusoma, kuandika na kuzungumza." },
    { name: "Indigenous language activities", detail: "Developing the learner's mother tongue or local language." },
    { name: "Mathematical activities", detail: "Numbers, addition and subtraction, measurement and shapes." },
    { name: "Environmental activities", detail: "Science and social themes: health, nature, home and community." },
    { name: "Religious education activities", detail: "Values and moral growth." },
    { name: "Creative activities", detail: "Art, music, movement and physical education." },
  ],
  skills: ["Reading fluency", "Basic number sense", "Curiosity and questioning", "Working with others"],
  activities: ["Reading time", "Music", "Sports and games", "Clubs"],
};

export default function LowerPrimaryPage() {
  return <LevelLayout level={level} />;
}