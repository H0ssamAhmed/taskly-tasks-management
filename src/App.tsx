import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import SignUp from './features/auth/pages/SignUp'


function App() {
  return (
    <main className='min-h-screen bg-background'>
      <Routes>


        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          {/* <Route path="/sign-in" element={<SignIn />} /> */}
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Route>








      </Routes>

    </main>
  )
}

export default App
