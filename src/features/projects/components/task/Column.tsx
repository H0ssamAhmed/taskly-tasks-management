import ColumnHeader from './ColumnHeader'
import AddNewTaskLink from './AddNewTaskLink'
import BoardColumnSkeleton from './BoardColumnSkeleton'
import { useProjectTask } from '../../hooks/useProjectTask'
import { taskStatus_spaced, type TaskStatusKey } from '@/utils/constants/TaskStatus'
import type { EpicTask, TaskStatusType } from '../../schema/types'
import TaskDetails from './TaskDetails'

const Column = ({ status }: { status: TaskStatusKey }) => {
    const taskStatusValue: TaskStatusType = taskStatus_spaced[status]
    const { projectTasksBoardView, loading } = useProjectTask(taskStatusValue)
    return (<div className=" flex flex-col  gap-4 w-72">
        <ColumnHeader name={status} length={projectTasksBoardView.length ?? 0} />
        <AddNewTaskLink status={status} />
        {loading ? <BoardColumnSkeleton /> : projectTasksBoardView.map((task: EpicTask) => <TaskDetails task={task} key={task.id} />)}
    </div>)
}


export default Column