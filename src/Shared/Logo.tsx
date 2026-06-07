
import LogoImage from '../assets/svg/logo.svg'
const Logo = () => {
    return (
        <div>
            <img src={LogoImage} alt="Logo" />
            <h1 className="text-2xl font-bold">Taskly</h1>
        </div>
    )
}

export default Logo