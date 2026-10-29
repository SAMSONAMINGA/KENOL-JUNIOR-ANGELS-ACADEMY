export const STATUSES = [
  "PENDING",
  "CONTACTED",
  "INTERVIEW_SCHEDULED",
  "APPROVED",
  "ENROLLED",
  "WAITLISTED",
  "REJECTED",
] as const;

export type StatusCode = (typeof STATUSES)[number];

export const STATUS_LABEL: Record<StatusCode, string> = {
  PENDING: "Pending",
  CONTACTED: "Contacted",
  INTERVIEW_SCHEDULED: "Interview Scheduled",
  APPROVED: "Approved",
  ENROLLED: "Enrolled",
  WAITLISTED: "Waitlisted",
  REJECTED: "Rejected",
};

export const STATUS_COLOR: Record<StatusCode, { bg: string; fg: string }> = {
  PENDING: { bg: "#fbe9d0", fg: "#7a4a00" },
  CONTACTED: { bg: "#e3edf7", fg: "#1f4f7a" },
  INTERVIEW_SCHEDULED: { bg: "#ece4f5", fg: "#54307a" },
  APPROVED: { bg: "#e4f1de", fg: "#2f5f24" },
  ENROLLED: { bg: "#cfe8c6", fg: "#1d4a14" },
  WAITLISTED: { bg: "#f3ecd0", fg: "#6b5a12" },
  REJECTED: { bg: "#f5dede", fg: "#7a2222" },
};

export function isStatus(v: string): v is StatusCode {
  return (STATUSES as readonly string[]).includes(v);
}