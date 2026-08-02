import AddMemberIcon from '@/assets/svgs/AddMemberIcon'
import BreadCrumb from '@/shared/BreadCrumb'
import PageBody from '@/shared/PageBody'
import PageHeader from '@/shared/PageHeader'
import { Button } from '@/shared/UI/Button'
import MembersTableSkeleton from '../components/memebers/MembersTableSkeleton'
import MembersTable from '../components/memebers/MembersTable'
import PageError from '../../../shared/PageError'
import { useMembers } from '../hooks/useMember'
import InvitaionModel from '../components/memebers/InvitaionModel'
import { useState } from 'react'
import PlusIcon from '@/assets/svgs/PlusIcon'
import { cn } from '@/lib/utils'
import { createPortal } from 'react-dom'


const ProjectMember = () => {
    const { members, loading, error, fetchMemebers } = useMembers()
    const BreadCrumbLinks = [{ link: "/project", text: "Project" }, { link: "", text: "Memebers", active: true }];
    const [isInvitaionOpen, setIsInvitationOpen] = useState<boolean>(false)

    const handleOpenInvitaionModel = () => {
        setIsInvitationOpen(true)
    }
    const handlecloseInvitaionModel = () => {
        setIsInvitationOpen(!isInvitaionOpen)
    }
    if (loading) {
        return <MembersTableSkeleton />
    }
    if (error) {
        return (<div className='py-2 px-2 md:px-4 lg:px-8'>
            <BreadCrumb className='hidden lg:flex' links={BreadCrumbLinks} />
            <PageHeader title='Project Members' >
                <Button
                    disabled={error}
                    onClick={handleOpenInvitaionModel}
                    className='flex items-center justify-center gap-4 group'>
                    <AddMemberIcon
                        className="text-gray-500 hover:text-blue-500 group-hover:scale-110 transition-all duration-200"

                    />
                    invite member</Button>
            </PageHeader>

            <PageError onClick={fetchMemebers} />
        </div>)
    }

    return (
        <div className='py-2 px-2 md:px-4 lg:px-8'>
            <Button
                onClick={handleOpenInvitaionModel}
                className={cn('bg-primary fixed p-6 block lg:hidden z-10 rounded-lg bottom-28 right-6')} ><PlusIcon width={14} height={14} className='text-white' /></Button>

            <BreadCrumb className='hidden lg:flex' links={BreadCrumbLinks} />
            <PageHeader title='Project Members' >
                <Button
                    onClick={handleOpenInvitaionModel}


                    className='flex items-center justify-center gap-4 group'>
                    <AddMemberIcon
                        className="text-gray-500 hover:text-blue-500 group-hover:scale-110 transition-all duration-200"

                    />
                    invite member</Button>
            </PageHeader>


            <PageBody>
                <MembersTable memebers={members} />
            </PageBody>
            {isInvitaionOpen && createPortal(<InvitaionModel onCloseModel={handlecloseInvitaionModel} />, document.body)}

        </div>
    )
}

export default ProjectMember