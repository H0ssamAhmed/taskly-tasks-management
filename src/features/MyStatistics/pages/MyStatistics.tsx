import PageHeader from "@/shared/PageHeader";
import PageError from "@/shared/PageError";
import Spinner from "@/shared/UI/Spinner";
import { useMyStatistics } from "../hooks/useMyStatistics";
import StatisticsFilters from "../components/StatisticsFilters";
import KPICards from "../components/KPICards";
import WeeklyCalendarView from "../components/WeeklyCalendarView";
import DoughnutChart from "../components/DoughnutChart";
import ProjectsStatsList from "../components/ProjectsStatsList";
import PageSpinner from "../components/PageSpinner";

const MyStatistics = () => {
  const {
    filters,
    calendarStats,
    projectCounts,
    projects,
    isLoading,
    error,
    dateRangeError,
    updateDateRange,
    updateProject,
    updateStatus,
    refetch,
  } = useMyStatistics();

  if (error) {
    return (
      <div className="py-6 px-4 md:px-8 min-h-[calc(100vh-64px)]">
        <PageHeader
          title="My Statistics"
          description="View your task insights and metrics"
        />
        <PageError onClick={refetch} />
      </div>
    );
  }

  if (isLoading && !calendarStats) {
    return (<PageSpinner message="Loading statistics..." />

    );
  }

  return (
    <div className="py-4 px-4 md:px-6 lg:px-8 min-h-[calc(100vh-84px)] relative flex flex-col gap-6 pb-24">
      <PageHeader
        title="My Statistics"
        description="Track your weekly task metrics and insights"
      />

      {/* Filters section */}
      <StatisticsFilters
        startDate={filters.startDate}
        endDate={filters.endDate}
        projectId={filters.projectId}
        status={filters.status}
        projects={projects}
        dateRangeError={dateRangeError}
        onDateChange={updateDateRange}
        onProjectChange={updateProject}
        onStatusChange={updateStatus}
      />

      {/* Loading overlay during background filter refetches */}
      <div className="relative flex-1 flex flex-col gap-6">
        {isLoading && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-md">
            <Spinner className="w-20 h-20 text-primary-container" />
          </div>
        )}

        {/* KPI Cards */}
        <KPICards
          totalTasks={calendarStats?.total_tasks ?? 0}
          completedTasks={calendarStats?.done_tasks ?? 0}
          overdueTasks={calendarStats?.overdue_tasks ?? 0}
        />

        <WeeklyCalendarView
          startDate={filters.startDate}
          endDate={filters.endDate}
          dailyStats={calendarStats?.daily ?? []}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 flex-col gap-6">
          <DoughnutChart
            totals={calendarStats?.totals ?? {}}
          />
          <ProjectsStatsList projectCounts={projectCounts} />
        </div>
      </div>
    </div>
  );
};

export default MyStatistics;