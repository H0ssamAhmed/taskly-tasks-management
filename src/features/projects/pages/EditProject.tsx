
import EditProjectForm from '../components/EditProjectForm'
import AddMemberIcon from '@/assets/svgs/AddMemberIcon'
import LambIcon from '@/assets/svgs/LambIcon'
import BreadCrumb from '@/shared_temp/BreadCrumb'
import PageBody from '@/shared_temp/PageBody'
import PageHeader from '@/shared_temp/PageHeader'
import { Button } from '@/shared_temp/UI/Button'
import { useAppSelector } from '@/store/store'

const EditProject = () => {
    const { data } = useAppSelector((state) => state.ProjectDetails)
    const BreadCrumbLinks = [{ link: "/project", text: "Project" }, { link: "", text: data?.name, active: true }, { link: "", text: "Edit", active: true }]

    return (
        <div className='py-2 px-2 md:px-4 lg:px-8'>
            <BreadCrumb className='hidden lg:flex' links={BreadCrumbLinks} />
            <PageHeader title='Edit Project' description='Define the scope and foundational details of your project.'>
                <Button className='flex items-center justify-center gap-4 group'>
                    <AddMemberIcon
                        className="text-gray-500 hover:text-blue-500 group-hover:scale-110 transition-all duration-200"

                    />
                    invite new member</Button>
            </PageHeader>
            <PageBody>
                <EditProjectForm />
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

export default EditProject