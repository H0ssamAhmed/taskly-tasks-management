
import { Button } from '@/shared/UI/Button'

const EmptyOnSearch = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className='w-full h-full py-40'>
            <div className='flex flex-col gap-4 items-center justify-center'>
                <h1 className='display-lg'>No Epics Found!</h1>
                <Button
                    className=' rounded-sm my-10'
                    onClick={onClick}>Reset Search </Button>
            </div>

        </div>
    )
}

export default EmptyOnSearch