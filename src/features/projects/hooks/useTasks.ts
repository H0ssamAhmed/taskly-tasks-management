import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEpicTasks } from "../services/TasksApi";
import type { EpicTask } from "../schema/types";

export const useTasks = (epicId: string) => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<EpicTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchTasks = async () => {
    setLoading(true);
    setError(false);

    const response = await getEpicTasks(epicId);
    if (response) {
      setTasks(response);
      setLoading(false);
      return;
    }
    setError(true);
  };
  useEffect(() => {
    fetchTasks();
  }, [id, epicId]);

  return {
    fetchTasks,
    tasks,
    loading,
    error,
  };
};
