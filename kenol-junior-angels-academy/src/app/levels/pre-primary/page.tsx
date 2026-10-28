import type { Metadata } from "next";
import LevelLayout, { type LevelContent } from "@/components/LevelLayout";

export const metadata: Metadata = {
  title: "Pre-Primary (PP1 & PP2) | Kenol Junior Angels Academy",
  description: "Play-based learning in a warm, nurturing environment for ages 4–5 in Kenol.",
};

const level: LevelContent = {
  current: "pre-primary",
  applyCodes: ["PP1", "PP2"],
  title: "Pre-Primary",
  headline: "Little Stars, First Wings",
  grades: "PP1 & PP2",
  ages: "Ages 4–5",
  tagline: "Every star starts as a spark. Every flight starts with a flutter.",
  intro:
    "Our youngest learners build confidence, curiosity and the first skills in reading, writing and number through play, songs, stories and hands-on activities.",
  learnHeading: "Little minds, big discoveries",
  learnIntro: "Play is how our smallest stars learn. Here is what fills their days.",
  subjects: [
    { play: "Little Voices", name: "Language activities", detail: "Listening, speaking, early reading and pre-writing skills." },
    { play: "Counting Stars", name: "Mathematical activities", detail: "Counting, sorting, patterns, shapes and early number work." },
    { play: "Little Explorers", name: "Environmental activities", detail: "Exploring plants, animals, weather, home and community." },
    { play: "Flutter and Create", name: "Psychomotor and creative activities", detail: "Drawing, music, movement and games that develop coordination." },
    { play: "Hearts that Shine", name: "Religious education activities", detail: "Values, stories and prayer that support character growth." },
  ],
  skills: ["Communication", "Confidence and independence", "Sharing and teamwork", "Fine and gross motor skills"],
  activities: ["Songs and rhymes", "Outdoor play", "Story time", "Arts and crafts"],
};

export default function PrePrimaryPage() {
  return <LevelLayout level={level} />;
}