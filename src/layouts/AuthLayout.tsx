import { RedirectIfLoggedIn } from "@/utils/AuthRouteRedirection";
import Logo from "../shared_temp/Logo"
import { Outlet } from "react-router-dom";


const AuthLayout = () => {
    return (
        <RedirectIfLoggedIn>
            <div className=" mx-auto">
                <Logo />
                <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center">
                    <Outlet />
                </div>
            </div>
        </RedirectIfLoggedIn>
    )
}

export default AuthLayout