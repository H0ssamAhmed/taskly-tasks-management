import { Burger } from "@/assets/svg"
import { getCurrentUser } from "@/features/user/services/userApi"
import type { SetStateAction } from "react"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
interface Props {
    handleOpenNavMobile: React.Dispatch<SetStateAction<boolean>>
}
interface User {
    department: string,
    email: string,
    email_verified: boolean,
    name: string,
    phone_verified: boolean
    sub: string
}

const Header = ({ handleOpenNavMobile }: Props) => {
    const [avatarLetters, setAvatarLetters] = useState("")
    const [userMetaData, setUserMetaData] = useState<User | null>()
    const userData = async () => {
        const user = await getCurrentUser()
        if (user) {
            setUserMetaData(user.user_metadata)
            const { name }: User = user.user_metadata
            const first = name.split(" ")[0][0]
            const second = name.split(" ").length == 2 ? name.split(" ")[1][0] : name.split(" ")[0][1]
            setAvatarLetters(first + second)
        }

    }
    useEffect(() => {
        userData()
    }, [])

    return (
        <header className='w-full justify-between bg-background broder-1 border-b border-slate-light  p-4'>
            <div className=" flex items-center justify-between w-full">
                <div
                    onClick={() => handleOpenNavMobile(false)}
                    className="flex items-center justify-start me-2 hover:bg-surface-highest  cursor-pointer p-2 rounded-sm"
                >
                    <img src={Burger} className="w-4.5 h-3" />
                </div>
                <Link to={"/"} className="font-bold text-xl lg:hidden block">Taskly</Link>
                <div className='flex items-center justify-end ms-auto  gap-4'>
                    <div className='text-center hidden lg:block'>
                        <h3 className='title-md'>{userMetaData?.name}</h3>
                        <p className='text-primary font-bold'>{userMetaData?.department}</p>
                    </div>
                    <div className='bg-primary-container font-semibold w-10 h-10 rounded-sm text-2xl flex items-center justify-center'>
                        {avatarLetters}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header