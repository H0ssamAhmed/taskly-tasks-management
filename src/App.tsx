import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import SignUp from './features/auth/pages/SignUp'
import MainLayout from './layouts/MainLayout'
import LogIn from './features/auth/pages/LogIn'
import ForgetPpassword from './features/auth/pages/ForgetPpassword'
import { Toaster } from 'react-hot-toast';
import ResetPassword from './features/auth/pages/ResetPassword'
import { Provider } from "react-redux";
import { store } from './store/store'
import AddProject from './features/addProject/pages/AddProject'
import Projects from './features/projects/pages/Projects'
import ProjectsLayout from './layouts/ProjectsLayout'
import ProjectDetails from './features/projects/pages/ProjectDetails'


function App() {
  return (
    <Provider store={store}>
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
            element={<MainLayout />}>

            <Route
              path='/project'
              element={<ProjectsLayout />}
            >
              <Route path='' element={<Projects />} />
              <Route path={`/project/:id/epics`} element={<ProjectDetails />} />
              <Route path='add' element={<AddProject />} />
            </Route>

            <Route path='/project-epic' element={<h1>project-epic</h1>} />
            <Route path='/project-tasks' element={<h1>project-tasks</h1>} />
            <Route path='/project-memebers' element={<h1>project-memebers</h1>} />
            <Route path='/project-details' element={<h1>project-details</h1>} />
          </Route>
        </Routes>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
      </main>
    </Provider>

  )
}

export default App
