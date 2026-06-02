import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import SignUp from './features/auth/pages/SignUp'


function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
