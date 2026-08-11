import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/UI/Button";

interface DropdownOption {
  label: string;
  value: string | null;
}

interface StatisticsDropdownProps {
  label: string;
  options: DropdownOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  className?: string;
}

const StatisticsDropdown = ({
  label,
  options,
  value,
  onChange,
  className,
}: StatisticsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? label;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white shadow-sm flex items-center justify-between gap-2 px-4 py-2 h-10 w-full lg:w-auto min-w-[140px] rounded-sm text-sm font-medium text-primary-dark"
      >
        <span className="truncate">{selectedLabel}</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="shrink-0">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-md rounded-sm z-20 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-3 text-sm hover:bg-surface-low transition-colors",
                value === option.value && "bg-surface-low font-medium",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatisticsDropdown;
