import BreadCrumb from '@/shared/BreadCrumb'
import PageBody from '@/shared/PageBody'
import PageHeader from '@/shared/PageHeader'
import NewEpicForm from '../components/epic/NewEpicForm'
const BreadCrumbLinks = [
    { link: "/project", text: "Project" },
    { link: "", text: "Project name" },
    { link: "", text: "Epics" },
    { link: "", text: "New Epics", active: true }
]

const NewProjectEpics = () => {
    return (
        <div className='py-2 px-2 md:px-4  lg:px-8'>
            <BreadCrumb className='hidden lg:flex' links={BreadCrumbLinks} />
            <PageHeader
                title='Project Members'
                description="Define a major project phase or high-level milestone to group related tasks and track architectural progress."
            >
            </PageHeader>


            <PageBody className='lg:w-4xl my-8 pt-0'>
                <NewEpicForm />
            </PageBody>

        </div>
    )
}

export default NewProjectEpics