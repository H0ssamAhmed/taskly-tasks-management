import Logo from "../Shared/Logo"
import { Outlet } from "react-router-dom";


const AuthLayout = () => {
    return (
        <div className=" mx-auto">
            <Logo />
            <div className="flex flex-col items-center justify-center">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout