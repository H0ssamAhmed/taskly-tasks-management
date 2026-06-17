import { useState } from "react";
import type { ProjectEpicsType } from "../schema/types";
import { updateEpic } from "../services/ProjectsApi";
import { ToastError, ToastSuccess } from "@/utils/Toast";
// {
// 	"title": "Updated epic title",
// 	"description": "Updated epic description",
// 	"assignee_id": "user-id-or-null",
// 	"deadline": "2026-01-30"
// }
export function useUpdateEpic(epic: ProjectEpicsType) {
  const cleanedUpEpic = {
    title: epic.title,
    description: epic.description,
    assignee_id: epic.created_by.sub,
    deadline: epic.deadline
  };

  const [localEpic, setLocalEpic] = useState(epic);
  const [isSaving, setIsSaving] = useState(false);

  const updateField = async (
    field: string,
    value: string | null
  ) => {
    const previous = epic;

    const newValues = {
      ...cleanedUpEpic,

      [field]: value,
    }

    try {
      setIsSaving(true);
      const res = await updateEpic({ id: epic.id, payload: newValues });
      if (!res.ok) {
        ToastError("Failed to update epic. Please try again.");
        return
      }

      ToastSuccess("Epic updated");

      ToastSuccess("Epic updated");
      return res

    } catch {
      setLocalEpic(previous);
    } finally {
      setIsSaving(false);
    }

  };

  return {
    localEpic,
    isSaving,
    updateField,
  };
}