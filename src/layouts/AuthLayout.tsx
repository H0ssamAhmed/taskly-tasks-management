import { RedirectIfLoggedIn } from "@/utils/AuthRouteRedirection";
import Logo from "../Shared/Logo"
import { Outlet } from "react-router-dom";


const AuthLayout = () => {
    return (
        <RedirectIfLoggedIn>
            <div className=" mx-auto">
                <Logo />
                <div className="flex flex-col items-center justify-center">
                    <Outlet />
                </div>
            </div>
        </RedirectIfLoggedIn>
    )
}

export default AuthLayout