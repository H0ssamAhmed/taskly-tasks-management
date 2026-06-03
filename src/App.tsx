import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import SignUp from './features/auth/pages/SignUp'
import MainLayout from './layouts/MainLayout'
import LogIn from './features/auth/pages/LogIn'


function App() {
  return (
    <main className='min-h-screen bg-background'>
      <Routes>


        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<LogIn />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Route>

        <Route element={<MainLayout />}>
          <Route path='/project' element={<h1>project page Coming sonn</h1>} />
        </Route>








      </Routes>

    </main>
  )
}

export default App
