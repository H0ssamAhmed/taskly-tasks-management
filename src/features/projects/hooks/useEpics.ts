import { useParams, useSearchParams } from "react-router-dom";
import usePagination from "./usePagination";
import type { ProjectEpicsType } from "../schema/types";
import { useEffect, useState } from "react";
import { getPrpjectEpics } from "../services/ProjectsApi";

export const useEpics = () => {
  const { id } = useParams();
  const { limit, currentpage } = usePagination();
  const [searchParams] = useSearchParams();
  const [epics, setEpics] = useState<ProjectEpicsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searachValue, setSearchValue] = useState<string>("");
  const [fixedResponse, setFisedResponse] = useState<ProjectEpicsType[]>([]);
  const [pagination, setPaginantion] = useState<string>("");

  const fetchEpics = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await getPrpjectEpics({
        id: id!,
        page: Number(currentpage),
        limit: Number(limit),
      });
      setEpics(response.data);
      setFisedResponse(response.data);
      setPaginantion(response.pagination);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEpics();
  }, [id, searchParams]);

  const handleSearchInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearchValue(value);
    if (value) {
      const filterEpics = fixedResponse.filter((epic) =>
        epic.title.includes(value),
      );
      setEpics(filterEpics);
      return;
    }
    setEpics(fixedResponse);
  };

  const handleReset = () => {
    setSearchValue("");
    setEpics(fixedResponse);
  };
  return {
    loading,
    epics,
    error,
    fetchEpics,
    fixedResponse,
    searachValue,
    handleSearchInputValue,
    handleReset,
    pagination,
  };
};
