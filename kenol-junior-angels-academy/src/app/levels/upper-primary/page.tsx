import type { Metadata } from "next";
import LevelLayout, { type LevelContent } from "@/components/LevelLayout";

export const metadata: Metadata = {
  title: "Upper Primary (Grade 4–6) | Kenol Junior Angels Academy",
  description: "Deeper understanding, critical thinking and practical life skills for ages 9–11 in Kenol.",
};

const level: LevelContent = {
  current: "upper-primary",
  applyCodes: ["GRADE4", "GRADE5", "GRADE6"],
  title: "Upper Primary",
  grades: "Grade 4–6",
  ages: "Ages 9–11",
  tagline: "Deeper understanding, critical thinking and practical life skills.",
  intro:
    "Learners study a wider range of subjects, apply what they learn to real situations, and build the study habits that prepare them for junior school.",
  subjects: [
    { name: "English", detail: "Comprehension, grammar, composition and oral skills." },
    { name: "Kiswahili", detail: "Ufahamu, sarufi, insha na mazungumzo." },
    { name: "Mathematics", detail: "Number operations, fractions, measurement, geometry and data." },
    { name: "Science and Technology", detail: "Living things, materials, energy and simple technology." },
    { name: "Social Studies", detail: "Our country, environment, citizenship and community." },
    { name: "Agriculture and Nutrition", detail: "Growing food, healthy eating and caring for the environment." },
    { name: "Religious Education", detail: "Values, ethics and moral development." },
    { name: "Creative Arts", detail: "Art, craft and music." },
    { name: "Physical and Health Education", detail: "Fitness, games and healthy living." },
  ],
  skills: ["Critical thinking", "Problem solving", "Research and presentation", "Responsibility"],
  activities: ["Sports and athletics", "Music and drama", "Clubs", "Community projects"],
};

export default function UpperPrimaryPage() {
  return <LevelLayout level={level} />;
}