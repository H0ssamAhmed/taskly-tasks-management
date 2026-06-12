import { formatDate } from '@/lib/helpers'
import type { ProjectType } from '@/lib/types'
import { Link } from 'react-router-dom'

const ProjectCard = ({ id, name, description, created_at }: ProjectType) => {
    const date = formatDate(created_at)
    return (
        <Link to={`/project/${id}/epics`}>
            <div className='bg-white p-6 rounded-md w-full md:w-76 h-55'>
                <h2 className='text-lg font-semibold h-lh text-slate-dark'>{name}</h2>
                <p className='py-2 text-sm text-muted line-clamp-3'>{description}</p>
                <div className='text-xs text-muted flex items-center justify-between mt-10'>
                    <span className=''>CREATED AT</span>
                    <span className=''>{date}</span>
                </div>
            </div>
        </Link>

    )
}

export default ProjectCard