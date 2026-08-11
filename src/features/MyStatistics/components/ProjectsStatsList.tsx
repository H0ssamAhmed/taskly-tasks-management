import type { ProjectCountItem } from "../schema/types";

interface ProjectsStatsListProps {
  projectCounts: ProjectCountItem[];
}

const FolderIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
    className="text-primary-container shrink-0"
  >
    <path
      d="M18 14V4C18 2.89543 17.1046 2 16 2H9.17157C8.64101 2 8.13214 1.78929 7.75736 1.41421L6.58579 0.242641C6.211 0.0886561 5.70214 0 5.17157 0H2C0.895431 0 0 0.89543 0 2V14C0 15.1046 0.895431 16 2 16H16C17.1046 16 18 15.1046 18 14Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProjectsStatsList = ({ projectCounts }: ProjectsStatsListProps) => {
  return (
    <div className="bg-white rounded-md p-6 border border-slate-light/30 shadow-sm w-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-base font-bold text-primary-dark">Tasks Per Project</h3>
        <p className="text-xs text-slate-mid mt-0.5">Tasks count categorized by project</p>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[220px] pr-1.5 flex flex-col gap-2">
        {projectCounts.length === 0 ? (
          <p className="text-xs text-slate-mid/60 text-center py-8 italic">
            No projects with tasks in this period
          </p>
        ) : (
          projectCounts.map((project) => (
            <div
              key={project.project_id}
              className="flex items-center justify-between border border-slate-light/10 bg-slate-50 hover:bg-white hover:border-primary-container/20 hover:shadow-sm px-4 py-3 rounded-md transition-all duration-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FolderIcon />
                <span className="text-sm font-semibold text-primary-dark truncate">
                  {project.project_name}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-3">
                <span className="text-sm font-bold text-primary-dark">
                  {project.tasks_count}
                </span>
                <span className="text-[10px] text-slate-mid font-medium">
                  {project.tasks_count === 1 ? "task" : "tasks"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsStatsList;
