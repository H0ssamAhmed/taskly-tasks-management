import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getProjectTasks } from "../services/TasksApi";
import type { EpicTask, TaskStatusType } from "../schema/types";

type ViewType = "board" | "list" | string | null;

export const useProjectTask = (status: TaskStatusType) => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentView: ViewType =
    searchParams.get("view") === "list" ? "list" : "board";

  const [projectTasks, setProjectTasks] = useState<EpicTask[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const changeView = (nextView: ViewType) => {
    if (nextView) {
      setSearchParams({
        view: nextView,
      });
    }
  };

  const fetchProjectTasks = async () => {
    setLoading(true);
    try {
      const response = await getProjectTasks({
        projectId: id!,
        status: status,
      });
      if (response) {
        setProjectTasks(response);

        return;
      }
      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectTasks();
  }, []);

  return {
    loading,
    projectTasks,
    error,
    changeView,
    currentView,
  };
};
