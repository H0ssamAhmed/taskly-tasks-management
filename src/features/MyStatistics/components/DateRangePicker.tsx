import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/UI/Button";
import {
  diffDays,
  formatDateForAPI,
  formatDateRangeLabel,
  isDateRangeValid,
  MAX_RANGE_DAYS_LIMIT,
  shiftWeek,
} from "../utils/dateUtils";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (start: Date, end: Date) => void;
  error?: string | null;
  className?: string;
}

const DateRangePicker = ({
  startDate,
  endDate,
  onChange,
  error,
  className,
}: DateRangePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewMonth, setViewMonth] = useState(new Date(startDate));
  const [tempStart, setTempStart] = useState<Date | null>(null);
  const [tempEnd, setTempEnd] = useState<Date | null>(null);

  const handlePrevWeek = () => {
    const { start, end } = shiftWeek(startDate, -1);
    onChange(start, end);
  };

  const handleNextWeek = () => {
    const { start, end } = shiftWeek(startDate, 1);
    onChange(start, end);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  };

  const handleDayClick = (day: Date) => {
    if (!tempStart || (tempStart && tempEnd)) {
      setTempStart(day);
      setTempEnd(null);
    } else {
      const start = day < tempStart ? day : tempStart;
      const end = day < tempStart ? tempStart : day;
      setTempStart(start);
      setTempEnd(end);
    }
  };

  const handleApply = () => {
    if (tempStart && tempEnd && isDateRangeValid(tempStart, tempEnd)) {
      onChange(tempStart, tempEnd);
      setShowCalendar(false);
      setTempStart(null);
      setTempEnd(null);
    }
  };

  const handleCancel = () => {
    setShowCalendar(false);
    setTempStart(null);
    setTempEnd(null);
  };

  const isInRange = (day: Date) => {
    const start = tempStart ?? startDate;
    const end = tempEnd ?? endDate;
    return day >= start && day <= end;
  };

  const isRangeStart = (day: Date) => {
    const start = tempStart ?? startDate;
    return formatDateForAPI(day) === formatDateForAPI(start);
  };

  const isRangeEnd = (day: Date) => {
    const end = tempEnd ?? endDate;
    return formatDateForAPI(day) === formatDateForAPI(end);
  };

  const days = getDaysInMonth(viewMonth);
  const monthLabel = viewMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handlePrevWeek}
          className="p-1.5 rounded-sm hover:bg-white/60 transition-colors"
          aria-label="Previous week"
        >
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M7 1L2 6L7 11" stroke="#041B3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
          className="text-sm font-bold text-primary-dark hover:underline"
        >
          {formatDateRangeLabel(startDate, endDate)}
        </button>
        <button
          type="button"
          onClick={handleNextWeek}
          className="p-1.5 rounded-sm hover:bg-white/60 transition-colors"
          aria-label="Next week"
        >
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M1 1L6 6L1 11" stroke="#041B3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {error && (
        <p className="text-error text-xs mt-1 font-medium">{error}</p>
      )}

      {showCalendar && (
        <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md p-4 z-30 w-[320px]">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() =>
                setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1))
              }
              className="p-1 hover:bg-surface-low rounded-sm"
            >
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                <path d="M7 1L2 6L7 11" stroke="#041B3C" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <span className="text-sm font-bold text-primary-dark">{monthLabel}</span>
            <button
              type="button"
              onClick={() =>
                setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1))
              }
              className="p-1 hover:bg-surface-low rounded-sm"
            >
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                <path d="M1 1L6 6L1 11" stroke="#041B3C" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="text-center text-xs text-slate-mid font-medium py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) =>
              day ? (
                <button
                  key={formatDateForAPI(day)}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  className={cn(
                    "h-9 w-9 text-sm rounded-sm transition-colors",
                    isInRange(day) && "bg-primary-container/20",
                    (isRangeStart(day) || isRangeEnd(day)) &&
                      "bg-primary-container text-white font-bold",
                    !isInRange(day) && "hover:bg-surface-low",
                  )}
                >
                  {day.getDate()}
                </button>
              ) : (
                <div key={`empty-${i}`} />
              ),
            )}
          </div>

          {tempStart && tempEnd && (
            <p className="text-xs text-slate-mid mt-2">
              {diffDays(tempStart, tempEnd)} of {MAX_RANGE_DAYS_LIMIT} days selected
            </p>
          )}

          <div className="flex gap-2 mt-4">
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="flex-1 py-2 text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={!tempStart || !tempEnd || !isDateRangeValid(tempStart, tempEnd)}
              className="flex-1 py-2 text-sm bg-primary-container text-white"
            >
              Apply Range
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
