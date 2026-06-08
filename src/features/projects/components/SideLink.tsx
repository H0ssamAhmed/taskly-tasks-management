import { cn } from '@/lib/utils'
import type { NavLink } from '@/utils/constants/SideNav'
import { Link, useLocation } from 'react-router-dom'
interface Props extends NavLink {
    isCollapse: boolean
}
const SideLink = (Props: Props) => {
    const { path, icon, text, isCollapse } = Props
    const { pathname } = useLocation()
    return (
        <Link to={path}>
            <div className={cn('flex items-center px-4 py-4 justify-start gap-4 rounded-sm',
                pathname == path && "bg-white"

            )}>
                <img src={icon} alt="" />
                {!isCollapse && <p>{text}</p>}
            </div>
        </Link>
    )
}

export default SideLink