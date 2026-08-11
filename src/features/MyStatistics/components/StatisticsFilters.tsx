import type { ProjectOption, TaskStatusEnum } from "../schema/types";
import { taskStatusDisaply, taskStatus } from "@/utils/constants/TaskStatus";
import DateRangePicker from "./DateRangePicker";
import StatisticsDropdown from "./StatisticsDropdown";
import { formatDateRangeLabel } from "../utils/dateUtils";
import CalenderIcon from "@/assets/svgs/CalenderIcon";

interface StatisticsFiltersProps {
  startDate: Date;
  endDate: Date;
  projectId: string | null;
  status: TaskStatusEnum | null;
  projects: ProjectOption[];
  dateRangeError?: string | null;
  onDateChange: (start: Date, end: Date) => void;
  onProjectChange: (projectId: string | null) => void;
  onStatusChange: (status: TaskStatusEnum | null) => void;
}

const StatisticsFilters = ({
  startDate,
  endDate,
  projectId,
  status,
  projects,
  dateRangeError,
  onDateChange,
  onProjectChange,
  onStatusChange,
}: StatisticsFiltersProps) => {
  const projectOptions = [
    { label: "All Projects", value: null },
    ...projects.map((p) => ({ label: p.name, value: p.id })),
  ];

  const statusOptions = [
    { label: "All Statuses", value: null },
    ...taskStatusDisaply.map((label) => ({
      label,
      value: taskStatus[label] as TaskStatusEnum,
    })),
  ];


  return (
    <>
      {/* Desktop filters */}
      <div className="hidden lg:flex bg-surface-low items-center justify-between p-4 rounded-md w-full">
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChange={onDateChange}
          error={dateRangeError}
        />
        <div className="flex items-center gap-4">
          <StatisticsDropdown
            label="All Projects"
            options={projectOptions}
            value={projectId}
            onChange={onProjectChange}
          />
          <StatisticsDropdown
            label="All Statuses"
            options={statusOptions}
            value={status}
            onChange={(val) => onStatusChange(val as TaskStatusEnum | null)}
          />
        </div>
      </div>

      {/* Mobile filters */}
      <div className="lg:hidden flex flex-col gap-3 w-full">
        <StatisticsDropdown
          label="All Active Projects"
          options={projectOptions}
          value={projectId}
          onChange={onProjectChange}
          className="w-full"
        />
        <div className="flex gap-3">
          <StatisticsDropdown
            label="All Status"
            options={statusOptions}
            value={status}
            onChange={(val) => onStatusChange(val as TaskStatusEnum | null)}
            className="flex-1"
          />
          <div className="flex-1  bg-surface-low rounded-sm flex items-center gap-2 px-3 py-2">
            <CalenderIcon className="text-primary-container shrink-0" />
            <span className="text-sm font-medium text-primary-dark truncate">
              {formatDateRangeLabel(startDate, endDate)}
            </span>
          </div>
        </div>
        {dateRangeError && (
          <p className="text-error text-xs font-medium">{dateRangeError}</p>
        )}
      </div>
    </>
  );
};

export default StatisticsFilters;
