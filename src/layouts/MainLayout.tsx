import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className=" mx-auto">
            <header className="flex px-6 py-6 items-center justify-start gap-2">

                <h1>will be nav bar</h1>
                <h1 className="text-2xl font-bold">Taskly</h1>
            </header>
            <div className="flex flex-col items-center justify-center">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout