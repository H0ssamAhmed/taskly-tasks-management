import PlusIcon from '@/assets/svgs/PlusIcon'
import BreadCrumb from '@/shared/BreadCrumb'
import PageBody from '@/shared/PageBody'
import PageHeader from '@/shared/PageHeader'
import { Button } from '@/shared/UI/Button'
import Input from '@/shared/UI/Input'
import { Link } from 'react-router-dom'
const BreadCrumbLinks = [
    { link: "/project", text: "Project" },
    { link: "", text: "Project name" },
    { link: "", text: "Epics", active: true }
]

const ProjectEpics = () => {
    return (<div className='py-2 px-2 md:px-4 lg:px-8 relative'>
        <Link className='bg-primary fixed p-6 lg:hidden z-10 rounded-lg bottom-28 right-6' to={"new"}><PlusIcon width={14} height={14} className='text-white' /></Link>

        <BreadCrumb className='hidden lg:flex' links={BreadCrumbLinks} />
        <PageHeader
            title='Project Epics'
        >
            <div className='flex items-center justify-end gap-4 w-full'>
                <Input placeholder='Seare Epics' className='w-1/2 py-3 rounded-sm' />
                <Button className='flex gap-4 justify-center items-center py-3 px-5 rounded-sm'><PlusIcon /><Link to={"new"}>Create New Epics</Link></Button>
            </div>
        </PageHeader>


        <PageBody className='w-full p-0 m-0'>
            <h1>List Epics</h1>
        </PageBody>
    </div>

    )
}

export default ProjectEpics