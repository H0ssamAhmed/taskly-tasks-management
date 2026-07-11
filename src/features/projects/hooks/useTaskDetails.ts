import { useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskDetails } from "../services/TasksApi";
const useTaskDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<object | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchTaskDetails = async (taskId: string) => {
    setLoading(true);
    setError(false);
    setSelectedTaskId(taskId);
    try {
      const response = await getTaskDetails({ projectId: id!, taskId: taskId });
      if (response) {
        setDetails(response);
        return;
      }
      setError(false);
    } catch (error) {
      setError(true);
      setSelectedTaskId(null);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedTaskId,
    details,
    fetchTaskDetails,
    loading,
    error,
  };
};

export default useTaskDetails;
