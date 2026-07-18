import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePagination from "./usePagination";
import { getPrpjectEpics } from "../services/ProjectsApi";
import type { ProjectEpicsType } from "../schema/types";

export const useEpics = () => {
  const { id } = useParams();
  const { limit, currentpage } = usePagination({});

  const [epics, setEpics] = useState<ProjectEpicsType[]>([]);
  const [pagination, setPagination] = useState("");

  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const fetchEpics = useCallback(
    async (search = searchValue.trim()) => {
      if (!id) return;

      const searching = search.length > 0;

      if (searching) {
        setIsSearching(true);
      } else {
        setLoading(true);
      }

      setError(false);

      try {
        const response = await getPrpjectEpics({
          id,
          page: Number(currentpage),
          limit: Number(limit),
          searchTerm: search,
        });

        setEpics(response.data);
        setPagination(response.pagination);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
        setIsSearching(false);
      }
    },
    [id, currentpage, limit, searchValue],
  );

  useEffect(() => {
    fetchEpics();
  }, [fetchEpics]);

  const handleSearchInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleReset = () => {
    setSearchValue("");
  };

  return {
    loading,
    error,
    epics,
    pagination,

    searchValue,
    isSearching,

    fetchEpics,

    handleReset,
    handleSearchInputValue,
  };
};
