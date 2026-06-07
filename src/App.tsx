import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import SignUp from './features/auth/pages/SignUp'
import MainLayout from './layouts/MainLayout'
import LogIn from './features/auth/pages/LogIn'
import ForgetPpassword from './features/auth/pages/ForgetPpassword'
import { Toaster } from 'react-hot-toast';
import ResetPassword from './features/auth/pages/ResetPassword'
import { useEffect } from 'react'
import { getAccessToken } from './utils/cookies'
import { ACCESS_TOKEN_KEY } from './utils/constants/CookieStrings'

function App() {
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

    const token = getAccessToken();
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <main className='min-h-screen bg-background'>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<LogIn />} />
          <Route path="/forget-password" element={<ForgetPpassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path='/project' element={<h1>project page Coming sonn</h1>} />
        </Route>
      </Routes>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </main>
  )
}

export default App
