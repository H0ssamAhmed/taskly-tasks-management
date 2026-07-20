import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById, updatePrpject } from "../services/ProjectsApi";
import type { EditProjectPayLoad, ProjectType } from "../schema/types";
import { ToastError, ToastSuccess } from "@/utils/Toast";
import type { ProjectFormData } from "../schema/Project.schema";

export const useEditEpic = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmmitting] = useState(false);
  const [epicDetails, setEpicDetails] = useState<ProjectType | null>();
  const [error, setError] = useState(false);

  const fetchEpicDetails = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data: response } = await getProjectById(id!);
      if (response.length) {
        console.log(response);

        setEpicDetails(response[0]);
      }
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const submitEdits = async (values: ProjectFormData): Promise<void> => {
    setIsSubmmitting(true);
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
      setIsSubmmitting(false);
    }
  };

  useEffect(() => {
    fetchEpicDetails();
  }, [id]);
  return {
    loading,
    setIsSubmmitting,
    isSubmitting,
    error,
    fetchEpicDetails,
    epicDetails,
    submitEdits,
  };
};
