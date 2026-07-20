import CalenderIcon from '@/assets/svgs/CalenderIcon'
import { checkTaskDate } from '@/lib/helpers'
import Avatar from '@/shared/UI/Avatar'
import type { EpicTask, TaskStatusType } from '../../schema/types'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/store/store'
import { openModel } from '../../slice/taskSlice'
import { useDraggable } from '@dnd-kit/core'


const TaskDetails = ({ task, refetch }: { task: EpicTask, refetch: (ColStatus: TaskStatusType) => Promise<void> }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform
    } = useDraggable({
        id: task.id,
        data: { ...task, refetch },
    });

    const style = transform
        ? {
            transform: `translate(${transform.x}px, ${transform.y}px)`
        }
        : undefined;

    const taskDueDate = checkTaskDate(task?.due_date)
    const dispatch = useAppDispatch();

    const handleOpenModel = () => {
        dispatch(openModel({ id: task.id }))
    }


    return <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}

        onClick={handleOpenModel}
        className={cn("bg-slate-light/10 p-4 rounded-md",
            taskDueDate == "Delayed" && 'bg-error/10',
            taskDueDate == "Today" && 'border-l-4 border-l-blue-500 ')}>
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
export default TaskDetails