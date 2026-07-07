import { taskStatus_spaced, taskStatusDisaply, type TaskStatusKey } from "@/utils/constants/TaskStatus";
import { useProjectTask } from "../../hooks/useProjectTask";
import type { EpicTask, TaskStatusDisplayType, TaskStatusType } from "../../schema/types";
import { Link, useParams } from "react-router-dom";
import PlusIcon from "@/assets/svgs/PlusIcon";
import { checkTaskDate } from "@/lib/helpers";
import Avatar from "@/shared/UI/Avatar";
import { cn } from "@/lib/utils";
import CalenderIcon from "@/assets/svgs/CalenderIcon";
import BoardColumnSkeleton from "./BoardColumnSkeleton";


const BoardView = () => {
    return (
        <div className="overflow-x-auto w-full py-4">
            <div className="flex gap-4 min-w-max flex-wrap">
                {taskStatusDisaply.map((status) => (
                    <Column key={status} status={status} />
                ))}
            </div>
        </div>
    )
}

export default BoardView




const Column = ({ status }: { status: TaskStatusKey }) => {
    const taskStatusValue: TaskStatusType = taskStatus_spaced[status]
    const { projectTasksBoardView, loading } = useProjectTask(taskStatusValue)
    return (<div className=" flex flex-col  gap-4 w-72">
        <ColumnHeader name={status} length={projectTasksBoardView.length ?? 0} />
        <AddNewTaskLink status={status} />
        {loading ? <BoardColumnSkeleton /> : projectTasksBoardView.map((task: EpicTask) => <TaskDetails task={task} key={task.id} />)}
    </div>)

}



const ColumnHeader = ({ name, length }: { name: string, length: number }) => {
    return (
        <div className="flex items-center justify-between gap-2 px-1 rounded-sm text-xs">
            <p className="flex items-center justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span>{name}</span>
                <span className="bg-surface-highest px-1">{length}</span>
            </p>
            <p><PlusIcon /></p>
        </div>
    )

}

const AddNewTaskLink = ({ status }: { status: TaskStatusDisplayType }) => {
    const { id: project_id } = useParams()
    return <Link to={`/project/${project_id}/tasks/new?status=${status}`}>
        <div className="py-4 flex items-center justify-center gap-2 text-slate-light border-slate-light border-dashed border">
            <p className="border rounded-full border-slate-light w-fit p-0.5"><PlusIcon /></p>
            Add New Task
        </div>
    </Link>
}


const TaskDetails = ({ task }: { task: EpicTask }) => {
    const taskDueDate = checkTaskDate(task?.due_date)

    return <div className={cn("bg-slate-light/10 p-4 rounded-md",
        taskDueDate == "Delayed" && 'bg-error/10',
        taskDueDate == "Today" && 'border-l-4 border-l-blue-500 ',

    )}>
        <p className="my-4 line-clamp-2 py-2">{task.title}</p>
        <div className="flex items-center justify-between ">
            <div className="flex items-center justify-start gap-2">
                <CalenderIcon className="w-4 h-4 " />
                <span className="text-xs">{taskDueDate}</span>
            </div>
            <Avatar className="w-6 h-6 text-xs rounded-full" name={task?.assignee?.name ?? ""} />
        </div>
    </div>
}