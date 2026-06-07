import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import SignUp from './features/auth/pages/SignUp'
import MainLayout from './layouts/MainLayout'
import LogIn from './features/auth/pages/LogIn'
import ForgetPpassword from './features/auth/pages/ForgetPpassword'
import { Toaster } from 'react-hot-toast';
import ResetPassword from './features/auth/pages/ResetPassword'
import { ProtectedRoute } from './utils/ProtectedRoute'



function App() {


  return (
    <main className='min-h-screen bg-background'>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<LogIn />} />
          <Route path="/forget-password" element={<ForgetPpassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route
          path='/'
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
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
