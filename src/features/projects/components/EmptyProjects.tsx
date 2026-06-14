import NotebookIcon from '@/assets/svgs/NotebookIcon'
import PlusIcon from '@/assets/svgs/PlusIcon'
import { Button } from '@/shared_temp/UI/Button'

import { Link } from 'react-router-dom'

const EmptyProjects = () => {
    return (
        <div className='py-20 w-ful h-full flex flex-col items-center justify-center gap-4'>

            <NotebookIcon />
            <div className=' flex flex-col items-center justify-center gap-4'>
                <h1 className='headline-lg'>No Projects</h1>
                <p className='text-center w-sm text-slate-mid'>
                    You don’t have any projects yet. Start by defining
                    your first architectural workspace to begin tracking
                    tasks and epics.
                </p>

                <Button className='flex gap-4 justify-center items-center py-3 px-5'>
                    <PlusIcon />
                    <Link to={"add"}>Create New Project</Link>
                </Button>

            </div>
        </div>
    )
}

export default EmptyProjects