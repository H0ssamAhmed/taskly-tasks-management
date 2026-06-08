import { cn } from '@/lib/utils'
import { getAccessToken, removeTokens } from '@/utils/cookies'
import { Logout } from "@/assets/svg/index.ts"

import { useNavigate } from 'react-router-dom'
interface Props {
    isCollapse?: boolean,
    className?: string
}
const LogOutBtn = ({ isCollapse = false, className }: Props) => {
    const navigator = useNavigate()

    const logOut = () => {
        removeTokens()
        const token = getAccessToken()

        if (!token) {

            navigator("/sign-in")
        }
    }
    return (
        <div
            onClick={logOut}
            className={cn('flex cursor-pointer items-center text-red-700 px-4 py-4 justify-start gap-4 rounded-sm hover:bg-surface-low transition-all', className)}>
            <img src={Logout} alt="" className={cn("w-4 h-4 transition-all")} />
            {!isCollapse && <p>Logout</p>}
        </div>
    )
}

export default LogOutBtn