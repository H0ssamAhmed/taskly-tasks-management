import { useState } from "react";
import { type EpicQuery, type ProjectEpicsType } from "../schema/types";
import { fetchEpicDetails } from "../services/ProjectsApi";

export const useEpicDetails = () => {
  const [epic, setEpic] = useState<ProjectEpicsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchEpic = async ({ epicId, projectId }: EpicQuery) => {
    try {
      const epicDetails = await fetchEpicDetails({
        epicId: epicId,
        projectId: projectId,
      });
      setEpic(epicDetails);
      return epicDetails;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { epic, setEpic, loading, setLoading, fetchEpic };
};
