import Logo from '@/Shared/Logo';
import { NavLinkk } from '@/utils/constants/SideNav'
import SideLink from './SideLink';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import LogoutBtn from './Logout';


const SideNav = () => {
    const [isCollapse, setIsCollapse] = useState(false)
    const changeCollapse = () => setIsCollapse(!isCollapse)
    return (
        <nav className={cn('bg-surface-highest  h-screen w-3xs p-2 transition-all',
            isCollapse && "w-16"
        )}>
            <div className='flex flex-col h-full'>
                <Logo isCollapse={isCollapse} />
                <div className='flex flex-col gap-2'>
                    {NavLinkk.map((link, idx) => <SideLink key={idx + link.path} {...link}
                        isCollapse={isCollapse}
                    />)}
                </div>
                <div className="mt-auto broder-1 border-t border-slate-light">
                    <LogoutBtn
                        isCollapse={isCollapse}
                        onclick={changeCollapse}
                    />
                </div>
            </div>

        </nav>
    )
}

export default SideNav