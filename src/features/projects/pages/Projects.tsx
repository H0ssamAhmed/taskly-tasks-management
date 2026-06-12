import PlusIcon from '@/assets/svgs/PlusIcon'
import PageBody from '@/Shared/PageBody'
import PageHeader from '@/Shared/PageHeader'
import { Button } from '@/Shared/UI/Button'
import { Link } from 'react-router-dom'
import ProjectsList from '../components/ProjectsList'
import { useAppSelector } from '@/store/store'
import EmptyProjects from '../components/EmptyProjects'
import ProjectsSkeleton from '../components/ProjectSkeleton'
import ButtonSkeleton from '../components/ButtonSkeleton'
import ProjectsError from '../components/ProjectsError'
import ProjectsPagination from '../components/ProjectsPagination'

const Projects = () => {
    const { data, status, loading, IsError } = useAppSelector((state) => state.projects)



    return (
        <div className='py-2 px-2 md:px-4 lg:px-8 min-h-[calc(100vh-64px)]  relative  '>

            <Link className='bg-primary fixed p-6 lg:hidden rounded-lg bottom-24 right-6' to={"add"}><PlusIcon width={14} height={14} className='text-white' /></Link>

            {<PageHeader title='Projects' description='Manage and curate your projects'>
                {loading ? <ButtonSkeleton /> : <Button className='flex gap-4 justify-center items-center py-3 px-5'><PlusIcon /><Link to={"add"}>Create New Project</Link></Button>}
            </PageHeader>}

            {loading && <ProjectsSkeleton />}

            {!loading && IsError && <ProjectsError />}


            {!loading && status == "success" && data?.length == 0
                ? <EmptyProjects />
                : <PageBody className='lg:w-full flex flex-col justify-start items-center bg-surfacelow min-h-[40vh] bg-green-200s '>
                    <ProjectsList />

                </PageBody>
            }
            <div className='py-4 w-full px-4 bottom-4 left-0'>

                <ProjectsPagination />
            </div>
        </div>
    )
}

export default Projects