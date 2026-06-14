import Logo from './Logo';
import { useNavlist } from '@/utils/constants/useNavlist'
import SideLink from './SideLink';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import LogoutBtn from './Logout';


const SideNav = ({ isNavMobileOpen }: { isNavMobileOpen: boolean }) => {
    const [isCollapse, setIsCollapse] = useState(false)
    const NavLinks = useNavlist()
    const changeCollapse = () => setIsCollapse(!isCollapse)
    return (
        <nav className={cn('bg-surface-highest h-screen lg:sticky left-0 top-0 w-3xs p-2 transition-all z-30 -ml-64 lg:ml-0 ',
            isCollapse && "w-16",
            isNavMobileOpen && "ml-0 absolute"

        )}>
            <div className='flex flex-col h-full'>
                <Logo isCollapse={isCollapse} />
                <div className='flex flex-col gap-2'>
                    {NavLinks.map((link, idx) => <SideLink key={idx + link.path} {...link}
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