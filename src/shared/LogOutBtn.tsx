import { cn } from '@/lib/utils'
import { removeTokens } from '@/utils/cookies'
import { Logout } from "@/assets/svg/index.ts"
import { useNavigate } from 'react-router-dom'
import { loginOut } from '@/features/auth/services/logout'
import { ToastError } from '@/utils/Toast'
import { useState } from 'react'
interface Props {
    isCollapse?: boolean,
    className?: string
}
const LogOutBtn = ({ isCollapse = false, className }: Props) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const logOut = async () => {
        setLoading(true)
        try {
            const res = await loginOut();
            removeTokens();
            if (!res.ok) {
                ToastError("Logout failed, please try again.")
            }
            if (res.ok) {
                navigate("/sign-in", { replace: true });
            }
        } catch (err) {
            ToastError("Logout failed, please try again.")

            console.error(err);
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div
            onClick={logOut}
            className={cn('flex cursor-pointer items-center text-red-700 px-4 py-4 justify-start gap-4 rounded-sm hover:bg-surface-low transition-all', className)}>
            <img src={Logout} alt="" className={cn("w-4 h-4 transition-all")} />
            {!isCollapse && <p>{loading ? "loading" : "Logout"}</p>}
        </div>
    )
}

export default LogOutBtn