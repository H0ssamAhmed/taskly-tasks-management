import Header from '@/Shared/Header'
import SideLinkMobile from '@/Shared/SideLinkMobile'
import SideNav from '@/Shared/SideNav'
import { NavLinksMobil } from '@/utils/constants/SideNav'
import { ProtectedRoute } from '@/utils/ProtectedRoute'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    const [isNavMobileOpen, setIsNavMobileOpen] = useState(false)
    const handleOpenNavMobile = () => {
        setIsNavMobileOpen(!isNavMobileOpen); console.log(isNavMobileOpen);
    }
    return (
        <ProtectedRoute>
            <div className="mx-auto flex relative">
                {isNavMobileOpen && <div onClick={handleOpenNavMobile} className='w-screen z-20 h-screen bg-black/50 absolute'></div>}
                <SideNav isNavMobileOpen={isNavMobileOpen} />
                <div className="flex flex-col items-center justify-center w-full">
                    <Header handleOpenNavMobile={handleOpenNavMobile} />
                    <div className='w-full h-full '>
                        <Outlet />
                    </div>
                </div>
                <div className='flex lg:hidden items-center justify-between p-2 fixed z-10 bottom-0 w-full  broder-1 border-t border-slate-light bg-background  gap-2'>
                    {NavLinksMobil.map((link, idx) => <SideLinkMobile key={idx + link.path} {...link}

                    />)}
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default MainLayout