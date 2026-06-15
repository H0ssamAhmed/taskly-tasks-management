import EpicCard from './EpicCard'

const EpicsList = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 justify-between w-full'>
            {Array.from({ length: 8 }).map((_, index) => {
                return <EpicCard key={index} />
            })
            }
        </div>
    )
}

export default EpicsList