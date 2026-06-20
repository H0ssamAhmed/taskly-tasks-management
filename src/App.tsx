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
import AddProject from './features/projects/pages/AddProject'
import Projects from './features/projects/pages/Projects'
import ProjectsLayout from './layouts/ProjectsLayout'
import { authPaths, mainLayoutPaths } from './utils/constants/RoutesPath'
import EditProject from './features/projects/pages/EditProject'
import ProjectMember from './features/projects/pages/ProjectMember'
import ProjectEpics from './features/projects/pages/ProjectEpics'
import NewProjectEpics from './features/projects/pages/NewProjectEpics'
import ProjectTasks from './features/projects/pages/ProjectTasks'



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
                <Route path={mainLayoutPaths.project_epics} element={<ProjectEpics />} />
                <Route path={mainLayoutPaths.project_epics + "/new"} element={<NewProjectEpics />} />
                <Route path={mainLayoutPaths.project_tasks} element={<ProjectTasks />} />
                <Route path={mainLayoutPaths.project_memebers} element={<ProjectMember />} />
                <Route path={mainLayoutPaths.project_details} element={<EditProject />} />

              </Route>
            </Route>
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
