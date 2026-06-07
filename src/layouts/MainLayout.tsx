import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ACCESS_TOKEN_KEY } from '@/utils/constants/CookieStrings';

const MainLayout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const type = params.get('type');
        const access_token = params.get(ACCESS_TOKEN_KEY);

        if (type === 'recovery' && access_token) {
            navigate(`/reset-password?access_token=${access_token}`, {
                replace: true,
            });
            return;
        }

        if (!access_token) {
            navigate('/sign-in');
        }
    }, [navigate]);
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