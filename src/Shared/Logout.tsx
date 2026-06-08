import { CollapseArrow } from "@/assets/svg/index.ts"
import { cn } from "@/lib/utils"
import LogOutBtn from "./LogOutBtn"
interface Props {
    isCollapse: boolean,
    onclick: () => void
}
function LogoutBtn({ isCollapse, onclick }: Props) {

    return (
        <div className="w-full">
            <div className={cn('hidden lg:flex cursor-pointer items-center px-4 py-4 justify-start gap-4 rounded-sm hover:bg-surface-low transition-all',
            )}
                onClick={onclick}
            >
                <img src={CollapseArrow} alt="" className={cn("w-4 h-4 transition-all", isCollapse && "rotate-180")} />
                {!isCollapse && <p>Collapse</p>}
            </div>
            <LogOutBtn isCollapse={isCollapse} />
        </div>
    )
}

export default LogoutBtn