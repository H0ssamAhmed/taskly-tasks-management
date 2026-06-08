import SideNav from '@/features/projects/components/SideNav'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className="mx-auto flex ">
            <SideNav />
            <div className="flex flex-col items-center justify-center">
                <h1>header</h1>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout