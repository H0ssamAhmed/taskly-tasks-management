import type { DailyStats } from "../schema/types";
import {
  getDaysInRange,
  formatDayHeader,
  formatDateForAPI,
} from "../utils/dateUtils";
import { taskStatus_underscore, statusBadgeStyle } from "@/utils/constants/TaskStatus";
import { cn } from "@/lib/utils";

interface WeeklyCalendarViewProps {
  startDate: Date;
  endDate: Date;
  dailyStats: DailyStats[];
}

const WeeklyCalendarView = ({
  startDate,
  endDate,
  dailyStats,
}: WeeklyCalendarViewProps) => {
  const days = getDaysInRange(startDate, endDate);

  return (
    <div className="bg-white rounded-md p-6 border min-h-28 border-slate-light/30 shadow-sm w-full">
      <div className="mb-4">
        <h3 className="text-base font-bold text-primary-dark">Weekly Calendar</h3>
        <p className="text-xs text-slate-mid mt-0.5">Tasks stats broken down by day</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-3 w-full">
        {days.map((dayDate) => {
          const apiDateStr = formatDateForAPI(dayDate);
          const { day: weekday, date: dateLabel } = formatDayHeader(dayDate);

          const dayData = dailyStats.find((d) => d.day === apiDateStr);
          const statuses = dayData?.statuses || {};

          // Filter statuses to find ones with tasks count > 0
          const activeStatuses = Object.entries(statuses).filter(
            ([_, count]) => typeof count === "number" && count > 0
          );

          const hasTasks = activeStatuses.length > 0;

          return (
            <div
              key={apiDateStr}
              className={cn(
                "flex flex-col border border-slate-light/20 bg-orange-400 rounded-md p-3 bg-slate-509 transition-all hover:shadow-md",
                hasTasks ? "bg-white border-primary-container/10" : "bg-surface-low/30"
              )}
            >
              {/* Day header */}
              <div className="flex flex-col border-b border-slate-light/10 pb-2 mb-2">
                <span className="text-[10px] font-bold text-primary-dark/60 tracking-wider">
                  {weekday}
                </span>
                <span className="text-sm font-semibold text-primary-dark">
                  {dateLabel}
                </span>
              </div>

              {/* Status counts or empty state */}
              <div className="flex-1 flex flex-col gap-1.5 justify-center">
                {hasTasks ? (
                  activeStatuses.map(([statusKey, count]) => {
                    const statusName =
                      taskStatus_underscore[statusKey as keyof typeof taskStatus_underscore] ||
                      statusKey.replace(/_/g, " ");
                    const badgeClass =
                      statusBadgeStyle[statusKey as keyof typeof statusBadgeStyle] ||
                      "bg-slate-mid/10 text-slate-mid";

                    return (
                      <div
                        key={statusKey}
                        className={cn(
                          "flex items-center justify-between text-xs px-2 py-1.5 rounded-sm",
                          badgeClass
                        )}
                      >
                        <span className="font-medium truncate mr-1">{statusName}</span>
                        <span className="font-bold shrink-0">{count}</span>
                      </div>
                    );
                  })
                ) : (
                  <span className="text-center text-xs text-slate-mid/50 italic py-4">
                    No Tasks
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyCalendarView;
