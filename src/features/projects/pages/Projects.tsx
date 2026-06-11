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

const Projects = () => {
    const { data, status, loading } = useAppSelector((state) => state.projects)

    return (
        <div className='py-2 px-2 md:px-4 lg:px-8 '>

            <Link className='bg-primary absolute p-6 lg:hidden rounded-lg bottom-24 right-6' to={"add"}><PlusIcon width={14} height={14} className='text-white' /></Link>

            {<PageHeader title='Projects' description='Manage and curate your projects'>
                {loading ? <ButtonSkeleton /> : <Button className='flex gap-4 justify-center items-center py-3 px-5'><PlusIcon /><Link to={"add"}>Create New Project</Link></Button>}
            </PageHeader>}

            {loading && <ProjectsSkeleton />}

            {!loading && status == "error" && <h1>will display error component</h1>}


            {!loading && status == "success" && data?.length == 0
                ? <EmptyProjects />
                : <PageBody className='lg:w-full bg-surfacelow 40vh] '>
                    <ProjectsList />

                </PageBody>
            }

        </div>
    )
}

export default Projects