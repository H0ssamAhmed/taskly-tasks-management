
import AddMemberIcon from '@/assets/svgs/AddMemberIcon'

import AddProjectForm from '../components/add/AddProjectForm'
import LambIcon from '@/assets/svgs/LambIcon'
import BreadCrumb from '@/shared/BreadCrumb'
import PageHeader from '@/shared/PageHeader'
import { Button } from '@/shared/UI/Button'
import PageBody from '@/shared/PageBody'

const BreadCrumbLinks = [{ link: "/project", text: "Project" }, { link: "", text: "Add NEW PROJECT", active: true }]
const AddProject = () => {
    return (
        <div className='py-2 px-2 md:px-4 lg:px-8'>
            <BreadCrumb className='hidden lg:flex' links={BreadCrumbLinks} />
            <PageHeader title='Add New Project' description='Define the scope and foundational details of your project.'>
                <Button className='flex items-center justify-center gap-4 group'>
                    <AddMemberIcon
                        className="text-gray-500 hover:text-blue-500 group-hover:scale-110 transition-all duration-200"

                    />
                    invite new member</Button>
            </PageHeader>
            <PageBody>
                <AddProjectForm />
            </PageBody>
            <div className='flex p-8 flex-col bg-background lg:flex-row gap-x-4 justify-center items-center'>
                <div className='flex items-center justify-start gap-2'>
                    <LambIcon className='hidden lg:block text-slate-mid' />
                    <p className='text-xs font-semibold text-slate-mid w-fit'>Pro Tip: {" "}</p>
                </div>
                <p className='text-xs'>You can invite project members and assign epics immediately after the initial creation process.</p>

            </div>
        </div>
    )
}

export default AddProject