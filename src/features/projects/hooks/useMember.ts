import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ProjectMemberType } from "../schema/types";
import { getProjectMemeber } from "../services/ProjectsApi";

export const useMembers = () => {
  const { id } = useParams();
  const [members, setMembers] = useState<ProjectMemberType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMemebers = async () => {
    setLoading(true);
    setError(false);

    try {
      const memebers = await getProjectMemeber(id!);
      setMembers(memebers);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMemebers();
  }, []);

  return { members, loading, error, fetchMemebers };
};
