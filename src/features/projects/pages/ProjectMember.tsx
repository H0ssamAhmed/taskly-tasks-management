import AddMemberIcon from '@/assets/svgs/AddMemberIcon'
import BreadCrumb from '@/shared/BreadCrumb'
import PageBody from '@/shared/PageBody'
import PageHeader from '@/shared/PageHeader'
import { Button } from '@/shared/UI/Button'
import { getProjectMemeber } from '../services/ProjectsApi'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { ProjectMemberType } from '../schema/types'
import MembersTableSkeleton from '../components/MembersTableSkeleton'
import MembersTable from '../components/MembersTable'


const ProjectMember = () => {
    const { id } = useParams()
    const [memebers, setMemebers] = useState<ProjectMemberType[]>([])
    const [loading, setLoading] = useState(true)
    const BreadCrumbLinks = [{ link: "/project", text: "Project" }, { link: "", text: "Memebers", active: true }]
    const fetchMemebers = async () => {
        const memebers = await getProjectMemeber(id!)
        setMemebers(memebers);
        setLoading(false)
    }
    useEffect(() => {
        fetchMemebers()

    }, [])
    if (loading) {
        return <MembersTableSkeleton />
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
                <MembersTable memebers={memebers} />

            </PageBody>

        </div>
    )
}

export default ProjectMember