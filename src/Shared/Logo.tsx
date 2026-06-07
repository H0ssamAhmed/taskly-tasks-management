
import { Link } from 'react-router-dom'
import LogoImage from '../assets/svg/logo.svg'
const Logo = () => {
    return (
        <header className="px-6 py-6">
            <Link
                className='flex items-center justify-start gap-2'
                to={"/"}>
                <img src={LogoImage} alt="Logo" />
                <h1 className="text-2xl font-bold">Taskly</h1>
            </Link>
        </header>
    )
}

export default Logo