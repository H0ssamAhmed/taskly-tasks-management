import { useState } from "react";
import type { ProjectEpicsType } from "../schema/types";
import { updateEpic } from "../services/ProjectsApi";
import toast from "react-hot-toast";

export type EditableEpicField =
  | "title"
  | "description"
  | "deadline"
  | "assignee_id";

export function useUpdateEpic(epic: ProjectEpicsType) {
  const [localEpic, setLocalEpic] =
    useState<ProjectEpicsType>(epic);

  const [isSaving, setIsSaving] = useState(false);

  const updateField = async (
    field: EditableEpicField,
    value: string | null
  ) => {
    const previous = structuredClone(localEpic);

    // optimistic update

    if (field === "title") {
      setLocalEpic(prev => ({
        ...prev,
        title: value ?? "",
      }));
    }

    if (field === "description") {
      setLocalEpic(prev => ({
        ...prev,
        description: value ?? "",
      }));
    }

    if (field === "deadline") {
      setLocalEpic(prev => ({
        ...prev,
        deadline: value,
      }));
    }

    try {
      setIsSaving(true);
      await toast.promise(updateEpic({ id: epic.id, payload: { [field]: value, } }),
        {
          loading: `Updating ${field}...`,
          success: `Epic ${field} updated`,
          error: `Failed to update ${field}`
        },
        { position: "top-center" }
      )
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