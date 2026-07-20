import ColumnHeader from './ColumnHeader'
import AddNewTaskLink from './AddNewTaskLink'
import BoardColumnSkeleton from './BoardColumnSkeleton'
import { useProjectTask } from '../../hooks/useProjectTask'
import { taskStatus_spaced, type TaskStatusKey } from '@/utils/constants/TaskStatus'
import type { EpicTask, TaskStatusType } from '../../schema/types'
import TaskDetails from './TaskDetails'
import ColumnError from './ColumnError'
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
const Column = ({ status }: { status: TaskStatusKey }) => {
    const taskStatusValue: TaskStatusType = taskStatus_spaced[status]
    const { projectTasksBoardView, loading, error, fetchBoardTasks } = useProjectTask(taskStatusValue)
    const {
        setNodeRef,
        isOver
    } = useDroppable({
        id: status,
        data: {
            status: taskStatusValue,
            refetch: fetchBoardTasks
        }
    });
    return (
        <div
            ref={setNodeRef}
            id={status}
            className={cn("flex flex-col  gap-4 w-72 p-4 border-2 border-transparent transition-all rounded-xl",
                isOver && "bg-primary/5 border-primary/5")}>
            <ColumnHeader name={status} length={projectTasksBoardView.length ?? 0} />
            <AddNewTaskLink status={status} />
            {loading ? <BoardColumnSkeleton /> :
                projectTasksBoardView.map((task: EpicTask) =>
                    <TaskDetails
                        refetch={fetchBoardTasks}
                        task={task} key={task.id} />)}
            {error && <ColumnError onClick={() => fetchBoardTasks(taskStatusValue)} />}
        </div>)
}


export default Column




