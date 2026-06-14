import { cn } from '@/lib/utils'
import type { NavLink } from '@/utils/constants/useNavlist'
import { Link, useLocation } from 'react-router-dom'
interface Props extends NavLink {
    isCollapse?: boolean
}
const SideLink = (Props: Props) => {
    const { path, icon, isShow, text, isCollapse } = Props
    const { pathname } = useLocation()
    return (
        <Link to={path} >
            {isShow && <div className={cn('flex  items-center px-4 py-4 hover:bg-surface-low justify-start gap-4 rounded-sm',
                pathname == path && "bg-white"

            )}>
                <img src={icon} alt="" className='w-4 h-4' />
                {!isCollapse && <p>{text}</p>}
            </div>}
        </Link>
    )
}

export default SideLink