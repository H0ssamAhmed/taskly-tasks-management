import { useEffect, useState } from "react";
import type { EpicTask, TaskStatusType } from "../schema/types";
import { updateTask } from "../services/TasksApi";
import toast from "react-hot-toast";

export type EditableTaskField =
  | "title"
  | "description"
  | "due_date"
  | "assignee_id"
  | "epic_id"
  | "status";

const fieldLabels: Record<EditableTaskField, string> = {
  title: "title",
  description: "description",
  due_date: "due date",
  assignee_id: "assignee",
  epic_id: "epic",
  status: "status",
};

export function useUpdateTask(task: EpicTask) {
  const [localTask, setLocalTask] = useState<EpicTask>(task);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  const updateField = async (
    field: EditableTaskField,
    value: string | null,
    optimisticPatch?: Partial<EpicTask>,
  ) => {
    const previous = structuredClone(localTask);

    setLocalTask((prev) => {
      const next: EpicTask = { ...prev, ...optimisticPatch };

      if (field === "title") next.title = value ?? "";
      if (field === "description") next.description = value ?? "";
      if (field === "due_date") next.due_date = value;
      if (field === "status") next.status = (value ?? "TO_DO") as TaskStatusType;
      if (field === "epic_id") next.epic_id = value;

      return next;
    });

    try {
      setIsSaving(true);
      const label = fieldLabels[field];

      await toast.promise(
        updateTask({ id: task.id, payload: { [field]: value } }),
        {
          loading: `Updating ${label}...`,
          success: `Task ${label} updated`,
          error: `Failed to update ${label}`,
        },
        { position: "top-center" },
      );
    } catch {
      setLocalTask(previous);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    localTask,
    isSaving,
    updateField,
  };
}
