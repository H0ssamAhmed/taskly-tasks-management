
import { formatDate } from '@/lib/helpers'
import type { EpicTask, TaskUser } from '../../schema/types'
import Avatar from '@/shared/UI/Avatar'
import StatusBadge from './StatusBadge'

const TableRow = ({ task }: { task: EpicTask }) => {
    const due_date = task.due_date ? formatDate(task.due_date) : "No deadline"
    return (
        <tr className='bg-whit'>
            <td className="text-primary uppercase text-xs">{task.task_id}</td>
            <td className='font-medium text-sm'>{task.title}</td>
            <td><StatusBadge status={task.status} /></td>
            <td>{due_date}</td>
            <td><AssigneeTD assignee={task.assignee} /></td>

            <td>...</td>
        </tr>
    )
}

export default TableRow


const AssigneeTD = ({ assignee }: { assignee: TaskUser | null }) => {
    if (!assignee?.name) {
        return <span className='flex items-center justify-start gap-2'>unassigned</span>
    }
    return (<div className='flex items-center justify-start gap-2'>
        <Avatar name={assignee?.name} className=' p-0 w-7 h-7 rounded-lg text-xs ' />
        <p>{assignee?.name}</p>
    </div>)
}


