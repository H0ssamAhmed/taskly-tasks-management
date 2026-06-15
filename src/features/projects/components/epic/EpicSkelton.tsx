
export const EpicSkelton = () => {
    return (
        <div className='p-4 w-full rounded-md flex flex-col gap-4 bg-white'>
            <div className='flex items-center justify-between'>
                <p className='bg-surface-highest animate-pulse opacity-50 w-20 h-8 rounded-sm'></p>
                <p className='bg-surface-highest animate-pulse w-8 h-8 rounded-md'></p>
            </div>
            <p className='bg-surface-highest animate-pulse w-full h-8 rounded-sm'></p>
            <div className='flex items-center justify-start gap-4'>
                <p className='bg-surface-highest animate-pulse w-8 h-8 rounded-md'></p>
                <p className='bg-surface-highest animate-pulse w-32 h-4'></p>
            </div>
            <p className='bg-surface-highest animate-pulse w-full h-1.5'></p>
            <div className='flex items-center justify-between gap-4'>
                <p className='bg-surface-highest animate-pulse w-8 h-8 rounded-md'></p>
                <p className='bg-surface-highest animate-pulse w-32 h-4 rounded-sm'></p>
            </div>
        </div>
    )
}



const EpicsFullPageSkelton = () => {
    return (
        <div className="w-full container mx-auto my-4">

            <div className="flex items-center justify-start gap-4 mb-8">
                <span className="bg-surface-highest animate-pulse w-24 h-4"></span>
                <span className="opacity-30">{">"}</span>
                <span className="bg-surface-highest animate-pulse w-24 h-4"></span>

            </div>
            <div className="flex items-center justify-between gap-4 mb-8">
                <p className="bg-surface-highest animate-pulse w-64 h-10"></p>
                <p className="flex items-center justify-end gap-4">
                    <span className="bg-surface-highest animate-pulse w-32 h-10"></span>
                    <span className="bg-surface-highest animate-pulse w-40 h-10"></span>

                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8 w-full flex-wrap">
                {Array.from({ length: 10 }).map(() => {
                    return (<EpicSkelton />)
                })}
            </div>
        </div>
    )
}

export default EpicsFullPageSkelton