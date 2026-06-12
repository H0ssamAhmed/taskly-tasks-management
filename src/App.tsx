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
import { authPaths, mainLayoutPaths } from './utils/constants/RoutesPath'


function App() {
  return (
    <Provider store={store}>
      <main className='min-h-screen bg-background'>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path={authPaths.sign_up} element={<SignUp />} />
            <Route path={authPaths.sign_in} element={<LogIn />} />
            <Route path={authPaths.forget_password} element={<ForgetPpassword />} />
            <Route path={authPaths.reset_password} element={<ResetPassword />} />
          </Route>

          <Route
            path={mainLayoutPaths.main}
            element={<MainLayout />}>

            <Route
              path={mainLayoutPaths.project}
              element={<ProjectsLayout />}
            >
              <Route path={mainLayoutPaths.project_home} element={<Projects />} />
              <Route path={mainLayoutPaths.add_project} element={<AddProject />} />
              <Route path=":id">
                <Route path={mainLayoutPaths.project_epics} element={<ProjectDetails />} />
                <Route path={mainLayoutPaths.project_tasks} element={<h1>Tasks</h1>} />
                <Route path={mainLayoutPaths.project_memebers} element={<h1>Members</h1>} />
                <Route path={mainLayoutPaths.project_details} element={<ProjectDetails />} />

              </Route>
            </Route>
            {/* 
            <Route path='/project-epic' element={<h1>project-epic</h1>} />
            <Route path='/project-tasks' element={<h1>project-tasks</h1>} />
            <Route path='/project-memebers' element={<h1>project-memebers</h1>} />
            <Route path='/project-details' element={<h1>project-details</h1>} /> */}
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
