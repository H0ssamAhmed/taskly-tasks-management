import PlusIcon from '@/assets/svgs/PlusIcon'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

const AddButton = ({ path, className }: { path: string, className?: string }) => {
    return (
        <Link className={cn('bg-primary fixed p-6 lg:hidden z-10 rounded-lg bottom-28 right-6', className)} to={path}><PlusIcon width={14} height={14} className='text-white' /></Link>
    )
}

export default AddButton