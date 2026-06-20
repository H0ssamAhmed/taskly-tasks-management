import BreadCrumb from '@/shared/BreadCrumb'
import PageBody from '@/shared/PageBody'
import PageHeader from '@/shared/PageHeader'
import TasksList from '../components/task/TasksList'
const BreadCrumbLinks = [
    { link: "/project", text: "Project" },
    { link: "", text: "Project name" },
    { link: "", text: "Tasks" },
    { link: "", text: "New Task", active: true }
]
const ProjectTasks = () => {
    return <div className='py-2 px-2 md:px-4 lg:px-8'>
        <BreadCrumb className='hidden lg:flex' links={BreadCrumbLinks} />
        <PageHeader title='Create New Task' description='Initialize a new work item within the Architectural Workspace ecosystem.'>

        </PageHeader>


        <PageBody className='lg:w-full'>
            <TasksList />
        </PageBody>

    </div>
}

export default ProjectTasks