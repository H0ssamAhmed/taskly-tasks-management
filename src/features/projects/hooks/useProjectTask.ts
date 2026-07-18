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
  const [pagination, setPaginantion] = useState<string>("");

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
      const { data: response, pagination } = await getProjectTasksBoardView({
        projectId: id!,
        status: status,
      });
      if (response) {
        setProjectTasksBoardView(response);
      }
      if (pagination) {
        setPaginantion(pagination);
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
      const { data: response, pagination } = await getProjectTasksInListView({
        projectId: id!,
        searchTerm: searchTerm,
      });
      if (response) {
        setProjectTasksListView(response);
      }
      if (pagination) {
        setPaginantion(pagination);
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
    setTimeout(() => {
      if (currentView == "board") {
        fetchBoardTasks();
        return;
      }
      if (currentView == "list") {
        fetchListTasks();
        return;
      }
    }, 300);
  }, [searchTerm]);

  return {
    loading,
    projectTasksBoardView,
    projectTasksListView,
    error,
    pagination,
    changeView,
    currentView,
    fetchBoardTasks,
    fetchListTasks,
  };
};
