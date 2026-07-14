import { useEpicTasks } from '../../hooks/useEpicTasks'
import ListIcon from '@/assets/svgs/ListIcon'
import { Button } from '@/shared/UI/Button'
import PlusIcon from '@/assets/svgs/PlusIcon'
import type { EpicTask } from '../../schema/types'
import Spinner from '@/shared/UI/Spinner'
import Avatar from '@/shared/UI/Avatar'
import Check from '@/assets/svgs/Check'
import { formatDate } from '@/lib/helpers'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '@/store/store'
import { openModel } from '../../slice/taskSlice'
import TasksError from '../task/TasksError'

interface EmptyTaskProps {
    epicId: string,
    projectId: string,
}
const EpicTasks = ({ epicId, projectId }: EmptyTaskProps) => {
    const { tasks, error, loading, fetchTasks } = useEpicTasks(epicId)
    if (loading) {
        return <div className='h-40 flex items-center justify-center'><Spinner className='w-20 h-20' /></div>
    }

    if (error) {
        return <TasksError onClick={fetchTasks} />
    }
    return (
        <div className='flex flex-col overflow-auto max-h-120'>
            {tasks.length
                ? tasks.map((task) => <TaskRow task={task} key={task.id} />)
                : <EmptyTask projectId={projectId} epicId={epicId} />}
        </div>
    )
}

export default EpicTasks


const TaskRow = ({ task }: { task: EpicTask }) => {
    const dispatch = useAppDispatch();

    const handleOpenModel = () => {
        dispatch(openModel({ id: task.id }))
    }

    return (<div className='p-4 w-full rounded-sm border-slate-mid/10 border'
        onClick={handleOpenModel}

    >
        <div className='flex items-center justify-between gap-8 '>
            <div className='flex items-center justify-center gap-4'>
                <Check />
                <div>
                    <h2 className='text-xl font-medium line-clamp-1'>{task.title}</h2>
                    {task.assignee?.id ? (

                        <div className='flex items-center justify-start gap-4'>
                            <Avatar className='w-5 h-5 rounded-full text-xs' name={task.assignee?.name ?? ""} />
                            <p>{task.assignee?.name ?? " "}</p>
                        </div>
                    )
                        : <p>unassigneed</p>}
                </div>
            </div>
            <div>
                <p className='label-sm text-slate-mid! uppercase'>Due data</p>
                <p className='label-sm text-slate-mid! uppercase'>{task.due_date ? formatDate(task.due_date) : "no deadline"}</p>
            </div>

        </div>
    </div>)
}

const EmptyTask = ({ projectId, epicId }: EmptyTaskProps) => {
    return <div className='flex items-center justify-center rounded-sm w-full  bg-surface-highest h-62 border-dashed border-2 border-muted' >
        <div className='flex flex-col items-center justify-center gap-4'>
            <p className='w-10 h-10 flex items-center justify-center p-2 rounded-sm bg-surface-highest'>
                <ListIcon />
            </p>
            <p className='my- '>No tasks have been added to this epic yet</p>
            <Button>

                <Link
                    className='flex items-center justify-center gap-2'
                    to={`/project/${projectId}/tasks/new?epic_id=${epicId}`}>
                    <PlusIcon />Add Task
                </Link>
            </Button>

        </div>
    </div>
}
