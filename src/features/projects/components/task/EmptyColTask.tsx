import { Link, useParams } from 'react-router-dom'
import type { TaskStatusDisplayType } from '../../schema/types'
import { Button } from '@/shared/UI/Button'

const EmptyColTask = ({ status }: { status: TaskStatusDisplayType }) => {
    const { id } = useParams()
    return (
        <div className='flex items-center justify-center flex-col gap-4 my-4'>
            <p>Not task</p>
            <Link to={`/project/${id}/tasks/new?status=${status}`}>
                <Button variant='primary' size="sm" className='px-2 py-1 rounded-sm'>add new task</Button>

            </Link>
        </div>
    )
}

export default EmptyColTask