import { useState } from "react";
import { type EpicQuery, type ProjectEpicsType } from "../schema/types";
import { fetchEpicDetails } from "../services/ProjectsApi";

export const useEpicDetails = () => {
  const [epic, setEpic] = useState<ProjectEpicsType | null>(null);
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchEpic = async ({ epicId, projectId }: EpicQuery) => {
    setOpenModel(true);
    setLoading(true);
    try {
      const epicDetails = await fetchEpicDetails({
        epicId: epicId,
        projectId: projectId,
      });
      setEpic(epicDetails[0]);
      setLoading(false);
      return epicDetails;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetModel = () => {
    setEpic(null);
    setLoading(false);
    setOpenModel(false);
  };

  return {
    epic,
    setEpic,
    openModel,
    setOpenModel,
    loading,
    setLoading,
    fetchEpic,
    resetModel,
  };
};
