import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  valueClassName?: string;
}

const KPICard = ({ title, value, icon, iconBg, valueClassName }: KPICardProps) => (
  <div className="bg-white rounded-md p-6 flex items-center justify-between min-w-[200px] shrink-0 lg:shrink lg:min-w-0">
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold text-primary-dark/60 uppercase tracking-wider">
        {title}
      </span>
      <span className={cn("text-3xl font-bold text-primary-dark", valueClassName)}>
        {value}
      </span>
    </div>
    <div className={cn("w-12 h-12 rounded-sm flex items-center justify-center", iconBg)}>
      {icon}
    </div>
  </div>
);

const ClipboardIcon = () => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
    <path
      d="M12 2H6C4.89543 2 4 2.89543 4 4V5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H15C16.1046 19 17 18.1046 17 17V7C17 5.89543 16.1046 5 15 5H14V4C14 2.89543 13.1046 2 12 2Z"
      stroke="#0052CC"
      strokeWidth="1.5"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
      stroke="#36B37E"
      strokeWidth="1.5"
    />
    <path d="M6.5 10L9 12.5L14 7.5" stroke="#36B37E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
    <path
      d="M10 1L19 17H1L10 1Z"
      stroke="#D11C1C"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M10 7V11" stroke="#D11C1C" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="14" r="0.75" fill="#D11C1C" />
  </svg>
);

interface KPICardsProps {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
}

const KPICards = ({ totalTasks, completedTasks, overdueTasks }: KPICardsProps) => {
  return (
    <>
      {/* Desktop: grid */}
      <div className="hidden lg:grid grid-cols-3 gap-6 w-full">
        <KPICard
          title="Total Tasks"
          value={totalTasks}
          icon={<ClipboardIcon />}
          iconBg="bg-primary-container/10"
        />
        <KPICard
          title="Completed Tasks"
          value={completedTasks}
          icon={<CheckCircleIcon />}
          iconBg="bg-success/30"
        />
        <KPICard
          title="Overdue Tasks"
          value={overdueTasks}
          icon={<WarningIcon />}
          iconBg="bg-error/10"
          valueClassName="text-error"
        />
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="lg:hidden w-full">
        <p className="text-xs font-bold text-slate-mid uppercase tracking-wider mb-3">
          Quick Overview
        </p>
        <div className="flex flex-col gap-3 overflow-x-auto pb-2 -mx-2 px-2">
          <KPICard
            title="Total Tasks"
            value={totalTasks}
            icon={<ClipboardIcon />}
            iconBg="bg-primary-container/10"
          />
          <KPICard
            title="Completed"
            value={completedTasks}
            icon={<CheckCircleIcon />}
            iconBg="bg-success/30"
          />
          <KPICard
            title="Overdue"
            value={overdueTasks}
            icon={<WarningIcon />}
            iconBg="bg-error/10"
            valueClassName="text-error"
          />
        </div>
      </div>
    </>
  );
};

export default KPICards;
