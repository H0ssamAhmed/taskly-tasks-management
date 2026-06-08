import { CollapseArrow } from "@/assets/svg/index.ts"
import { cn } from "@/lib/utils"
interface Props {
    isCollapse: boolean,
    onclick: () => void
}
function Logout({ isCollapse, onclick }: Props) {
    return (
        <div className=" px-4 py-4 w-full">
            <div className={cn('flex items-center px-4 py-4 justify-start gap-4 rounded-sm',
            )}
                onClick={onclick}
            >
                <img src={CollapseArrow} alt="" className="w-4 h-4" />

                {!isCollapse && <p>Collapse</p>}dsd
            </div>
        </div>
    )
}

export default Logout