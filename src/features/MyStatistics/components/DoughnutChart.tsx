import type { TaskStatusEnum } from "../schema/types";
import { taskStatus_underscore } from "@/utils/constants/TaskStatus";

interface DoughnutChartProps {
  totals: Partial<Record<TaskStatusEnum, number>>;
}

const statusColors: Record<TaskStatusEnum, string> = {
  TO_DO: "#4f5f7b", // Slate mid
  IN_PROGRESS: "#0052cc", // Primary container blue
  BLOCKED: "#d11c1c", // Error red
  IN_REVIEW: "#6366f1", // Indigo
  READY_FOR_QA: "#ffbb00", // Warning yellow/gold
  REOPENED: "#fb923c", // Orange
  READY_FOR_PRODUCTION: "#0d9488", // Teal
  DONE: "#36B37E", // Success green
};

const DoughnutChart = ({ totals }: DoughnutChartProps) => {
  // Extract statuses with values > 0
  const activeEntries = Object.entries(totals)
    .filter(([_, count]) => typeof count === "number" && count > 0)
    .map(([status, count]) => ({
      status: status as TaskStatusEnum,
      count: count as number,
      color: statusColors[status as TaskStatusEnum] || "#cbd5e1",
    }));

  const totalActive = activeEntries.reduce((sum, item) => sum + item.count, 0);

  // SVG parameters
  const radius = 50;
  const strokeWidth = 28;
  const viewBoxSize = 130;
  const center = viewBoxSize / 2;
  const circumference = 2 * Math.PI * radius; // ~314.16

  let accumulatedPercent = 0;

  return (
    <div className="bg-white rounded-md p-6 border border-slate-light/30 shadow-sm w-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-base font-bold text-primary-dark">Tasks by Status</h3>
        <p className="text-xs text-slate-mid mt-0.5">Distribution of current tasks</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 xl:gap-8 flex-1">
        {/* SVG Doughnut */}
        <div className="relative w-32.5 h-32.5 shrink-0">
          <svg
            width={viewBoxSize}
            height={viewBoxSize}
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            className="w-full h-full transform -scale-x-100" // Optional, standard alignment
          >
            {totalActive === 0 ? (
              // Empty state grey circle
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke="#e2e8f0"
                strokeWidth={strokeWidth}
              />
            ) : (
              activeEntries.map((entry) => {
                const percentage = entry.count / totalActive;
                const strokeDasharray = `${percentage * circumference} ${circumference}`;
                const rotation = accumulatedPercent * 360 - 90;
                accumulatedPercent += percentage;

                return (
                  <circle
                    key={entry.status}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke={entry.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeLinecap="butt"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transformOrigin: `${center}px ${center}px`,
                      transition: "stroke-dasharray 0.3s ease, transform 0.3s ease",
                    }}
                  />
                );
              })
            )}
          </svg>

          {/* Central Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-primary-dark">
              {totalActive}
            </span>
            <span className="text-[10px] font-bold text-slate-mid uppercase tracking-wider">
              {totalActive === 1 ? "Task" : "Tasks"}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 flex flex-col gap-2.5 w-full">
          {totalActive === 0 ? (
            <p className="text-sm text-slate-mid/60 text-center py-6">
              No tasks in this period
            </p>
          ) : (
            activeEntries.map((entry) => {
              const statusName =
                taskStatus_underscore[entry.status] ||
                entry.status.replace(/_/g, " ");
              const percentage = Math.round((entry.count / totalActive) * 100);

              return (
                <div
                  key={entry.status}
                  className="flex items-center justify-between text-xs py-0.5 border-b border-slate-light/10 last:border-b-0 hover:bg-slate-50 rounded-sm px-1 transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="font-semibold text-primary-dark truncate">
                      {statusName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-mid font-medium shrink-0">
                    <span>{entry.count}</span>
                    <span className="text-slate-mid/40">|</span>
                    <span className="w-8 text-right font-bold text-primary-dark/80">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
