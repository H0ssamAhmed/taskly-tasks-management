import Header from '@/Shared/Header'
import SideNav from '@/Shared/SideNav'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className="mx-auto flex ">
            <SideNav />
            <div className="flex flex-col items-center justify-center w-full">
                <Header />
                <div className='w-full h-full '>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout