export type LevelCode =
  | "PP1" | "PP2"
  | "GRADE1" | "GRADE2" | "GRADE3"
  | "GRADE4" | "GRADE5" | "GRADE6"
  | "GRADE7" | "GRADE8";

export const LEVEL_OPTIONS: { code: LevelCode; label: string }[] = [
  { code: "PP1", label: "PP1" },
  { code: "PP2", label: "PP2" },
  { code: "GRADE1", label: "Grade 1" },
  { code: "GRADE2", label: "Grade 2" },
  { code: "GRADE3", label: "Grade 3" },
  { code: "GRADE4", label: "Grade 4" },
  { code: "GRADE5", label: "Grade 5" },
  { code: "GRADE6", label: "Grade 6" },
  { code: "GRADE7", label: "Grade 7" },
  { code: "GRADE8", label: "Grade 8" },
];

export function levelLabel(code: string): string {
  return LEVEL_OPTIONS.find((l) => l.code === code)?.label ?? code;
}

export const DOCUMENTS_TO_BRING = [
  "Child's birth certificate",
  "Previous school report (if any)",
  "2 passport photos",
  "Parent/guardian ID",
  "Child medical report",
  "Disability notice (if any)",
];