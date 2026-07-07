import { cn } from '@/lib/utils'
import type { TaskStatusType } from '../../schema/types'
import { statusBadgeStyle, taskStatus_underscore } from '@/utils/constants/TaskStatus'

const StatusBadge = ({ status, className }: { status: TaskStatusType, className?: string }) => {

    return (<p className={cn('py-1 rounded-xs text-xs px-2 w-fit', className, statusBadgeStyle[status])}>{taskStatus_underscore[status]}</p>)

}
export default StatusBadge