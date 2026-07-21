import { useEffect, useState } from "react";
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
  const currentpage = searchParams.get("page") ?? 1;
  const limit = searchParams.get("limit") ?? 10;

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

  const fetchBoardTasks = async (colStatus: TaskStatusType) => {
    setLoading(true);
    try {
      const { data: response, pagination } = await getProjectTasksBoardView({
        projectId: id!,
        status: colStatus,
      });
      if (response) {
        const sortedTasks = response.sort(
          (a: EpicTask, b: EpicTask) =>
            new Date(String(b.created_at)).getTime() -
            new Date(String(a.created_at)).getTime(),
        );
        setProjectTasksBoardView(sortedTasks);
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
    return { isFetched: !error };
  };

  const fetchListTasks = async () => {
    setLoading(true);
    try {
      const { data: response, pagination } = await getProjectTasksInListView({
        projectId: id!,
        searchTerm: searchTerm,
        page: Number(currentpage),
        limit: limit ? Number(limit) : 10,
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
        fetchBoardTasks(status);
        return;
      }
      if (currentView == "list") {
        fetchListTasks();
        return;
      }
    }, 300);
  }, [searchTerm, searchParams]);

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
