import { Burger } from "@/assets/svg"
import { useUsers } from "@/features/auth/hooks/useUser"
import { cn } from "@/lib/utils"
import { useAppSelector } from "@/store/store"
import type { SetStateAction } from "react"
import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import LogOutBtn from "./LogOutBtn"
import Avatar from "./UI/Avatar"
interface Props {
    handleOpenNavMobile: React.Dispatch<SetStateAction<boolean>>
}

const Header = ({ handleOpenNavMobile }: Props) => {
    const { userData, loading, avatarLetters } = useUsers()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);

    const hadleOpenDropdown = () => { setIsDropdownOpen(!isDropdownOpen) }


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                            ref={dropdownRef}
                            className='relative bg-primary-container rounded-sm cursor-pointer'>
                            <div
                                onClick={hadleOpenDropdown}
                            >

                                <Avatar name={avatarLetters} />
                            </div>

                            {isDropdownOpen && <Dropdown />}
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

const Dropdown = () => {
    const { data } = useAppSelector((state) => state.user);
    return (
        <div className="p-4 absolute bg-surface-highest -left-48 top-16 rounded-sm z-1">
            <div className="flex flex-col items-start justify-between ">
                <p className="body-md" > {data?.name}</p>
                <p className="body-md"> {data?.email}</p>
                <p className="body-md"> {data?.department}</p>
                <LogOutBtn className="w-full px-2 py-2" />

            </div>
        </div>
    )
}