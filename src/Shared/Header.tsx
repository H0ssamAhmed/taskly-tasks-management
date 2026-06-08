import { Burger } from "@/assets/svg"
import type { SetStateAction } from "react"
import React from "react"
import { Link } from "react-router-dom"
interface Props {
    handleOpenNavMobile: React.Dispatch<SetStateAction<boolean>>
}
const Header = ({ handleOpenNavMobile }: Props) => {

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
                        <h3 className='title-md'>Hossam Ahmed</h3>
                        <p className='text-primary font-bold'>Front end developer</p>
                    </div>
                    <div className='bg-primary-container font-semibold w-10 h-10 rounded-sm text-2xl flex items-center justify-center'>
                        HA
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header