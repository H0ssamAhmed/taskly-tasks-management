import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useTasks = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    console.log(id);

    setTasks([]);
    setLoading(false);
    setError(false);
  }, []);

  return {
    tasks,
    loading,
    error,
  };
};
