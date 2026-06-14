import PlusIcon from '@/assets/svgs/PlusIcon'
import BreadCrumb from '@/shared/BreadCrumb'
import PageBody from '@/shared/PageBody'
import PageHeader from '@/shared/PageHeader'
import { Button } from '@/shared/UI/Button'
import { Link } from 'react-router-dom'
const BreadCrumbLinks = [
    { link: "/project", text: "Project" },
    { link: "", text: "Project name" },
    { link: "", text: "Epics", active: true }
]

const ProjectEpics = () => {
    return (<div className='py-2 px-2 md:px-4 lg:px-8'>
        <BreadCrumb className='hidden lg:flex' links={BreadCrumbLinks} />
        <PageHeader
            title='Project Members'
            description="Define a major project phase or high-level milestone to group related tasks and track architectural progress."
        >
            <Button className='flex gap-4 justify-center items-center py-3 px-5'><PlusIcon /><Link to={"new"}>Create New Epics</Link></Button>
        </PageHeader>


        <PageBody>
            <h1>List Epics</h1>
        </PageBody>
    </div>

    )
}

export default ProjectEpics