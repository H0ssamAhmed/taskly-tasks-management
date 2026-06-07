import Logo from "../Shared/Logo"
import { Outlet } from "react-router-dom";


const AuthLayout = () => {
    return (
        <div className=" mx-auto">
            <header className="flex px-6 py-6 items-center justify-start gap-2">
                <Logo />
            </header>
            <div className="flex flex-col items-center justify-center">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout