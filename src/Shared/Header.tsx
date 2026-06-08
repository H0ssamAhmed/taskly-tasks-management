import { Burger } from "@/assets/svg"
import type { UserType } from "@/features/auth/schema/types"
import { fetchCuurentUser } from "@/features/auth/slice/authSlice"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store"
import type { SetStateAction } from "react"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
interface Props {
    handleOpenNavMobile: React.Dispatch<SetStateAction<boolean>>
}

const Header = ({ handleOpenNavMobile }: Props) => {
    const [avatarLetters, setAvatarLetters] = useState("")
    const [userMetaData, setUserMetaData] = useState<UserType | null>()
    const { data, loading } = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    const userData = async () => {
        const { payload } = await dispatch(fetchCuurentUser());
        if (payload) {
            const { user_metadata }: { user_metadata: UserType } = { ...payload }
            setUserMetaData(user_metadata)
            const { name }: UserType = user_metadata
            const first = name.split(" ")[0][0]
            const second = name.split(" ").length == 2 ? name.split(" ")[1][0] : name.split(" ")[0][1]
            setAvatarLetters(first + second)
        }
    }

    useEffect(() => {
        if (!data) {
            userData()
        }
    }, [])
    return (
        <header className='w-full justify-between bg-background broder-1 border-b border-slate-light  p-4'>
            <div className=" flex items-center justify-between w-full">
                <div
                    onClick={() => handleOpenNavMobile(false)}
                    className="lg:hidden flex items-center justify-start me-2 hover:bg-surface-highest  cursor-pointer p-2 rounded-sm"
                >
                    <img src={Burger} className="w-4.5 h-3" />
                </div>
                <Link to={"/"} className="font-bold text-xl lg:hidden block">Taskly</Link>
                {loading ? <LoadingSkeleton className="w-48 h-12 " /> : <div className='flex items-center justify-end ms-auto  gap-4'>
                    <div className='text-center hidden lg:block'>
                        <h3 className='title-md'>{userMetaData?.name}</h3>
                        <p className='text-primary font-bold'>{userMetaData?.department}</p>
                    </div>
                    <div
                        onClick={userData}
                        className='bg-primary-container font-semibold w-10 h-10 rounded-sm text-2xl flex items-center justify-center'>
                        {avatarLetters}
                    </div>
                </div>}
            </div>
        </header>
    )
}

export default Header

const LoadingSkeleton = ({ className }: { className?: string }) => {
    return (
        <div className={cn("animate-pulse bg-surface-highest w-full h-full", className)}></div>
    )
}