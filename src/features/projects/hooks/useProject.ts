import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProjects } from "../services/ProjectsApi";

export const useProject = () => {
  const [searchparams] = useSearchParams();
  const currentpage = searchparams.get("page") || 1;
  const limit = searchparams.get("limmit") || 10;
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPaginantion] = useState<string>("");
  const [projects, setProjects] = useState([]);

  const fetchProject = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await getProjects({
        page: Number(currentpage),
        limit: Number(limit),
      });
      setProjects(response.data);
      setPaginantion(response.pagination);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [searchParams]);
  return {
    error,
    isLoading,
    pagination,
    projects,
    fetchProject,
  };
};
