import { Burger } from "@/assets/svg"
import { useUsers } from "@/features/auth/hooks/useUser"
import { cn } from "@/lib/utils"
import type { SetStateAction } from "react"
import React from "react"
import { Link } from "react-router-dom"
interface Props {
    handleOpenNavMobile: React.Dispatch<SetStateAction<boolean>>
}

const Header = ({ handleOpenNavMobile }: Props) => {
    const { userData, loading, avatarLetters } = useUsers()
    return (
        <header className='w-full justify-between bg-background broder-1 border-b border-slate-light  p-4'>
            {loading ? <LoadingSkeleton className="w-48 h-12 ms-auto " /> :
                <div className=" flex items-center justify-between w-full">
                    <div
                        onClick={() => handleOpenNavMobile(false)}
                        className="lg:hidden flex items-center justify-start me-2 hover:bg-surface-highest  cursor-pointer p-2 rounded-sm"
                    >
                        <img src={Burger} className="w-4.5 h-3" />
                    </div>
                    <Link to={"/"} className="font-bold text-xl lg:hidden block">Taskly</Link>
                    <div className='flex items-center justify-end ms-auto  gap-4'>
                        <div className='text-center hidden lg:block'>
                            <h3 className='title-md'>{userData?.name}</h3>
                            <p className='text-primary font-bold'>{userData?.department}</p>
                        </div>
                        <div
                            className='bg-primary-container font-semibold w-10 h-10 rounded-sm text-2xl flex items-center justify-center'>
                            {avatarLetters}
                        </div>
                    </div>
                </div>
            }
        </header>
    )
}

export default Header

const LoadingSkeleton = ({ className }: { className?: string }) => {
    return (
        <div className={cn("animate-pulse bg-surface-highest w-full h-full", className)}></div>
    )
}