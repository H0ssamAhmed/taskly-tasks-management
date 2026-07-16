import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  getProjectTasksBoardView,
  getProjectTasksInListView,
} from "../services/TasksApi";
import type { EpicTask, TaskStatusType } from "../schema/types";

type ViewType = "board" | "list" | string | null;

export const useProjectTask = (status: TaskStatusType) => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentView: ViewType =
    searchParams.get("view") === "list" ? "list" : "board";
  const searchTerm = searchParams.get("title") || "";
  const [projectTasksBoardView, setProjectTasksBoardView] = useState<
    EpicTask[] | []
  >([]);
  const [projectTasksListView, setProjectTasksListView] = useState<
    EpicTask[] | []
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const changeView = (nextView: ViewType) => {
    if (nextView) {
      setSearchParams({
        view: nextView,
      });
    }
  };

  const fetchBoardTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getProjectTasksBoardView({
        projectId: id!,
        status: status,
      });
      if (response) {
        setProjectTasksBoardView(response);

        return;
      }
      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);
  const fetchListTasks = async () => {
    setLoading(true);
    try {
      const response = await getProjectTasksInListView({
        projectId: id!,
        searchTerm: searchTerm,
      });
      if (response) {
        setProjectTasksListView(response);

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
    fetchBoardTasks();
    fetchListTasks();
  }, [searchTerm]);

  return {
    loading,
    projectTasksBoardView,
    projectTasksListView,
    error,
    changeView,
    currentView,
    fetchBoardTasks,
    fetchListTasks,
  };
};
