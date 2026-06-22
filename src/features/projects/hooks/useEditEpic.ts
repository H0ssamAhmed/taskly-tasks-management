import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById, updatePrpject } from "../services/ProjectsApi";
import type { EditProjectPayLoad, ProjectType } from "../schema/types";
import { ToastError, ToastSuccess } from "@/utils/Toast";
import type { ProjectFormData } from "../schema/Project.schema";

export const useEditEpic = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [epicDetails, setEpicDetails] = useState<ProjectType | null>();

  const fetchEpicDetails = async () => {
    setLoading(true);
    try {
      const response = await getProjectById(id!);
      if (response.ok) {
        const result = await response.json();
        setEpicDetails(result[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const submitEdits = async (values: ProjectFormData): Promise<void> => {
    setisSubmitting(true);
    const payload: EditProjectPayLoad = {
      id: id!,
      name: values.name,
      description: values.description,
    };

    try {
      const res = await updatePrpject({ id: id!, payload });
      if (!res.ok) {
        const { msg }: { msg: string } = await res.json();
        ToastError(`Failed to update project ${msg}`);
        return;
      }
      ToastSuccess("Project updated successfully");
    } catch (error) {
      ToastError(`Failed to update project`);
      console.error(error);
    } finally {
      setisSubmitting(false);
    }
  };

  useEffect(() => {
    fetchEpicDetails();
  }, [id]);
  return {
    loading,
    isSubmitting,
    setisSubmitting,
    epicDetails,
    submitEdits,
  };
};
