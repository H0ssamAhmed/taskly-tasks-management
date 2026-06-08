import { cn } from '@/lib/utils'
import type { NavLink } from '@/utils/constants/SideNav'
import { Link, useLocation } from 'react-router-dom'
interface Props extends NavLink {
    isCollapse?: boolean
}
const SideLinkMobile = (Props: Props) => {
    const { path, icon, text, isCollapse } = Props
    const { pathname } = useLocation()
    return (
        <Link to={path}>
            <div className={cn('flex  items-center justify-center flex-col px-2 py-2 hover:bg-surface-low gap-1 rounded-sm',
                pathname == path && "bg-white"

            )}>
                <img src={icon} alt="" className='w-4 h-4' />
                {!isCollapse && <p>{text}</p>}
            </div>
        </Link>
    )
}

export default SideLinkMobile