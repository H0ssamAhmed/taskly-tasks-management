export const taskStatus = {
  "TO DO": "TO_DO",
  "IN PROGRESS": "IN_PROGRESS",
  BLOCKED: "BLOCKED",
  "IN REVIEW": "IN_REVIEW",
  "READY FOR QA": "READY_FOR_QA",
  REOPENED: "REOPENED",
  "READY FOR PRODUCTION": "READY_FOR_PRODUCTION",
  DONE: "DONE",
};
export type TaskStatusKey = keyof typeof taskStatus;
export const taskStatusDisaply: TaskStatusKey[] = [
  "TO DO",
  "IN PROGRESS",
  "BLOCKED",
  "IN REVIEW",
  "READY FOR QA",
  "REOPENED",
  "READY FOR PRODUCTION",
  "DONE",
] as const;

export const taskStatus_spaced = {
  "TO DO": "TO_DO",
  "IN PROGRESS": "IN_PROGRESS",
  BLOCKED: "BLOCKED",
  "IN REVIEW": "IN_REVIEW",
  "READY FOR QA": "READY_FOR_QA",
  REOPENED: "REOPENED",
  "READY FOR PRODUCTION": "READY_FOR_PRODUCTION",
  DONE: "DONE",
} as const;
export const taskStatus_underscore = {
  TO_DO: "TO DO",
  IN_PROGRESS: "IN PROGRESS",
  BLOCKED: "BLOCKED",
  IN_REVIEW: "IN REVIEW",
  READY_FOR_QA: "READY FOR QA",
  REOPENED: "REOPENED",
  READY_FOR_PRODUCTION: "READY FOR PRODUCTION",
  DONE: "DONE",
} as const;

export const statusBadgeStyle = {
  TO_DO: "bg-slate-mid/20 text-slate-dark font-semibold",
  IN_PROGRESS: "bg-blue-400/30 text-blue-800 font-semibold",
  BLOCKED: "bg-error/10 text-error font-semibold",
  IN_REVIEW: "bg-muted/10 text-muted font-semibold",
  READY_FOR_QA: "bg-warning  text-primary font-semibold",
  REOPENED: "bg-orange-400 text-black font-semibold",
  READY_FOR_PRODUCTION: "bg-green-400/80 text-black  font-semibold",
  DONE: "bg-green-400/50 text-black  font-semibold",
} as const;
