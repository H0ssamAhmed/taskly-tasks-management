import Logo from '@/Shared/Logo';
import { NavLinkk } from '@/utils/constants/SideNav'
import SideLink from './SideLink';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Logout from './Logout';


const SideNav = () => {
    const [isCollapse, setIsCollapse] = useState(false)
    const changeCollapse = () => setIsCollapse(!isCollapse)
    return (
        <nav className={cn('bg-surface-highest h-screen w-3xs p-2 transition-all',
            isCollapse && "w-16"
        )}>
            <div className='flex flex-col h-full'>
                <Logo isCollapse={isCollapse} />
                <div className='flex flex-col gap-2'>
                    {NavLinkk.map((link) => <SideLink {...link}
                        isCollapse={isCollapse}
                    />)}
                </div>
                <div className="p-4 mt-auto border-t border-sidebar-border">
                    <Logout
                        isCollapse={isCollapse}
                        onclick={changeCollapse}
                    />
                </div>
            </div>

        </nav>
    )
}

export default SideNav