import AddMemberIcon from '@/assets/svgs/AddMemberIcon'
import BreadCrumb from '@/shared/BreadCrumb'
import PageBody from '@/shared/PageBody'
import PageHeader from '@/shared/PageHeader'
import { Button } from '@/shared/UI/Button'
import MembersTableSkeleton from '../components/memebers/MembersTableSkeleton'
import MembersTable from '../components/memebers/MembersTable'
import PageError from '../../../shared/PageError'
import { useMembers } from '../hooks/useMember'


const ProjectMember = () => {
    const { members, loading, error, fetchMemebers } = useMembers()
    const BreadCrumbLinks = [{ link: "/project", text: "Project" }, { link: "", text: "Memebers", active: true }]
    if (loading) {
        return <MembersTableSkeleton />
    }
    if (error) {
        return (<div className='py-2 px-2 md:px-4 lg:px-8'>
            <BreadCrumb className='hidden lg:flex' links={BreadCrumbLinks} />
            <PageHeader title='Project Members' >
                <Button className='flex items-center justify-center gap-4 group'>
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
            <BreadCrumb className='hidden lg:flex' links={BreadCrumbLinks} />
            <PageHeader title='Project Members' >
                <Button className='flex items-center justify-center gap-4 group'>
                    <AddMemberIcon
                        className="text-gray-500 hover:text-blue-500 group-hover:scale-110 transition-all duration-200"

                    />
                    invite member</Button>
            </PageHeader>


            <PageBody>
                <MembersTable memebers={members} />
            </PageBody>

        </div>
    )
}

export default ProjectMember