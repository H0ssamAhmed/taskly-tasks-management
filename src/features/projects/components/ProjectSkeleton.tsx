
export const ProjectSkeleton = () => {
    return (
        <div className='bg-white p-6 rounded-md w-76 h-55 flex items-center justify-center flex-col gap-4'>
            <span className='w-63.5 h-32 animate-pulse bg-surface-highest'></span>
            <span className='w-48 h-6 animate-pulse bg-surface-highest'></span>
            <span className='w-32 h-4 animate-pulse bg-surface-highest'></span>
        </div>
    )
}

const ProjectsSkeleton = () => {
    return (
        <div className='flex items-center justify-center flex-wrap gap-6'>
            {Array.from({ length: 12 }).map((_, idx) => <ProjectSkeleton key={idx} />)}
        </div>
    )
}
export default ProjectsSkeleton