
import { Outlet } from 'react-router-dom'

const ProjectsLayout = () => {
    return (
        <div className="mx-auto flex relative">

            <div className="flex flex-col items-center justify-center w-full">
                <div className='w-full h-full '>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default ProjectsLayout