import ResetPasswordForm from '../components/ResetPasswordForm'
import { useSearchParams } from 'react-router-dom';
import { ACCESS_TOKEN_KEY } from '@/utils/constants/CookieStrings';
import InvalidLink from '../components/InvalidLink';


const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get(ACCESS_TOKEN_KEY);
    const isValid = token !== null;

    if (!isValid) return <InvalidLink />;


    return <ResetPasswordForm />
}

export default ResetPassword