import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import usePagination from "./usePagination";
import { getProjectEpics } from "../services/ProjectsApi";
import type { ProjectEpicsType } from "../schema/types";

export const useEpics = () => {
  const { id } = useParams();
  const { limit } = usePagination({});
  const [searchParams, setSearchParams] = useSearchParams();
  const currentpage = searchParams.get("page") ?? 1;
  const [epics, setEpics] = useState<ProjectEpicsType[]>([]);
  const [pagination, setPagination] = useState("");

  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const fetchEpics = async (search = searchValue.trim()) => {
    if (!id) return;
    const searching = search.length > 0;

    if (searching) {
      setIsSearching(true);
    } else {
      setLoading(true);
    }

    setError(false);

    try {
      const { data, pagination } = await getProjectEpics({
        id,
        page: Number(currentpage),
        limit: limit ? Number(limit) : 10,
        searchTerm: search,
      });

      setEpics(data);
      setPagination(pagination);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchEpics();
  }, [id, searchParams]);

  const handleSearchInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("page");
    newSearchParams.delete("limit");

    setSearchParams(newSearchParams);

    if (value) {
      newSearchParams.set("title", value);
    } else {
      newSearchParams.delete("title");
    }
    setSearchValue(value);
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
