import PlusIcon from '@/assets/svgs/PlusIcon'

import { Link } from 'react-router-dom'

const AddCard = () => {
    return (
        <Link to="add" className='bg-white p-6 rounded-md w-76 h-55 flex items-center justify-center flex-col gap-4'>
            <div className='rounded-md p-4 bg-surface-highest w-fit'>
                <PlusIcon className='text-slate-dark ' />
            </div>
            <p className='font-bold text-sm ' >ADD PROJECT</p>

        </Link>
    )
}

export default AddCard