import { CollapseArrow, Logout } from "@/assets/svg/index.ts"
import { cn } from "@/lib/utils"
import { getAccessToken, removeTokens } from "@/utils/cookies"
import { useNavigate } from "react-router-dom"
interface Props {
    isCollapse: boolean,
    onclick: () => void
}
function LogoutBtn({ isCollapse, onclick }: Props) {
    const navigator = useNavigate()
    const logOut = () => {
        removeTokens()
        const token = getAccessToken()
        console.log(token);

        if (!token) {

            navigator("/sign-in")
        }
    }
    return (
        <div className="w-full">
            <div className={cn('flex cursor-pointer items-center px-4 py-4 justify-start gap-4 rounded-sm hover:bg-surface-low transition-all',
            )}
                onClick={onclick}
            >
                <img src={CollapseArrow} alt="" className={cn("w-4 h-4 transition-all", isCollapse && "rotate-180")} />
                {!isCollapse && <p>Collapse</p>}
            </div>
            <div
                onClick={logOut}
                className={cn('flex cursor-pointer items-center text-red-700 px-4 py-4 justify-start gap-4 rounded-sm hover:bg-surface-low transition-all')}>
                <img src={Logout} alt="" className={cn("w-4 h-4 transition-all")} />
                {!isCollapse && <p>Logout</p>}
            </div>
        </div>
    )
}

export default LogoutBtn