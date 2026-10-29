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
  headline: "Guiding Stars, Ready for Take-Off",
  grades: "Grade 7–8",
  ages: "Ages 12–13",
  tagline: "Confident leaders, built to soar into senior school.",
  intro:
    "Learners explore subjects in more depth, discover their strengths and interests, and develop the leadership and study skills they will need in senior school.",
  learnHeading: "Lessons that lift off",
  learnIntro: "Deeper subjects, sharper skills and the confidence to lead. Here is what your child will learn.",
  subjects: [
    { play: "Voices That Carry", name: "English", detail: "Literature, grammar, writing and public speaking." },
    { play: "Voices of East Africa", name: "Kiswahili", detail: "Fasihi, sarufi na uandishi." },
    { play: "Charting the Stars", name: "Mathematics", detail: "Algebra, geometry, measurement and statistics." },
    { play: "Launch Lab", name: "Integrated Science", detail: "Biology, chemistry and physics concepts taught together." },
    { play: "Citizens of the World", name: "Social Studies", detail: "History, geography and citizenship." },
    { play: "Fit to Fly", name: "Health Education", detail: "Personal health, wellbeing and life skills." },
    { play: "Build Your Flight Path", name: "Pre-Technical and Pre-Career Education", detail: "Practical skills, design and career exploration." },
    { play: "Seeds to Stars", name: "Agriculture and Nutrition", detail: "Food production, nutrition and sustainability." },
    { play: "Stage, Studio, Field", name: "Creative Arts and Sports", detail: "Art, music, drama and physical education." },
    { play: "A Compass for Life", name: "Religious Education", detail: "Ethics, values and reflection." },
  ],
  skills: ["Leadership", "Independent study", "Digital literacy", "Career awareness"],
  activities: ["Leadership roles", "Sports teams", "Clubs and societies", "Talent shows"],
};

export default function JuniorSecondaryPage() {
  return <LevelLayout level={level} />;
}