const MAX_RANGE_DAYS = 7;

export const formatDateForAPI = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getStartOfWeek = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getEndOfWeek = (date: Date): Date => {
  const start = getStartOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const getCurrentWeekRange = (): { start: Date; end: Date } => {
  const now = new Date();
  return { start: getStartOfWeek(now), end: getEndOfWeek(now) };
};

export const getDaysInRange = (start: Date, end: Date): Date[] => {
  const days: Date[] = [];
  const current = new Date(start);
  current.setHours(0, 0, 0, 0);
  const endDate = new Date(end);
  endDate.setHours(0, 0, 0, 0);

  while (current <= endDate) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return days;
};

export const diffDays = (start: Date, end: Date): number => {
  const s = new Date(start);
  const e = new Date(end);
  s.setHours(0, 0, 0, 0);
  e.setHours(0, 0, 0, 0);
  return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
};

export const isDateRangeValid = (start: Date, end: Date): boolean => {
  return diffDays(start, end) <= MAX_RANGE_DAYS && start <= end;
};

export const formatDateRangeLabel = (start: Date, end: Date): string => {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const startStr = start.toLocaleDateString("en-US", opts);
  const endStr = end.toLocaleDateString("en-US", {
    ...opts,
    year: "numeric",
  });
  return `${startStr} - ${endStr}`;
};

export const formatDayHeader = (date: Date): { day: string; date: string } => {
  const day = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const dateStr = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
  return { day, date: dateStr };
};

export const isSameDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const isToday = (date: Date): boolean => isSameDay(date, new Date());

export const shiftWeek = (start: Date, direction: -1 | 1): { start: Date; end: Date } => {
  const newStart = new Date(start);
  newStart.setDate(newStart.getDate() + direction * 7);
  const newEnd = new Date(newStart);
  newEnd.setDate(newStart.getDate() + 6);
  return { start: newStart, end: newEnd };
};

export const MAX_RANGE_DAYS_LIMIT = MAX_RANGE_DAYS;
