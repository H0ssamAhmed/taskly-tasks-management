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
  toDo: "TO_DO",
  inProgress: "IN_PROGRESS",
  blocked: "BLOCKED",
  inReview: "IN_REVIEW",
  readyForQA: "READY_FOR_QA",
  REOPENED: "REOPENED",
  "READY FOR PRODUCTION": "READY_FOR_PRODUCTION",
  DONE: "DONE",
};
