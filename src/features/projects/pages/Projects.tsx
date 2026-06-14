import PlusIcon from '@/assets/svgs/PlusIcon'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import ProjectsList from '../components/ProjectsList'
import EmptyProjects from '../components/EmptyProjects'
import ProjectsSkeleton from '../components/ProjectSkeleton'
// import ProjectsError from '../components/ProjectsError'
import ProjectsPagination from '../components/ProjectsPagination'
import { useEffect, useState } from 'react'
import PageHeader from '@/shared/PageHeader'
import { Button } from '@/shared/UI/Button'
import PageBody from '@/shared/PageBody'
import { getProjects } from '../services/ProjectsApi'
import ProjectsError from '../components/ProjectsError'

const Projects = () => {
    const loaction = useLocation()
    const [searchParams] = useSearchParams()
    const [error, setError] = useState(false)
    const page = searchParams.get("page") || 1
    const [isLoading, setIsLoading] = useState(true)
    const [pagination, setPaginantion] = useState<string>("")
    const [projects, setProjects] = useState([])

    const fetchProject = async () => {
        try {
            const response = await getProjects({ page: Number(page) })
            setProjects(response.data)
            setPaginantion(response.pagination)

        } catch (error) {
            setError(true)
            console.error(error);
        } finally {
            setIsLoading(false)
        }

    }
    useEffect(() => {
        fetchProject()

    }, [loaction])
    if (isLoading) {
        return <ProjectsSkeleton />
    }

    if (error) {
        return (<div className='py-2 px-2 md:px-4 lg:px-8 min-h-[calc(100vh-64px)]  relative  '>

            <Link className='bg-primary fixed p-6 lg:hidden rounded-lg bottom-24 right-6' to={"add"}><PlusIcon width={14} height={14} className='text-white' /></Link>

            <PageHeader title='Projects' description='Manage and curate your projects'>
                <Button className='flex gap-4 justify-center items-center py-3 px-5'><PlusIcon /><Link to={"add"}>Create New Project</Link></Button>
            </PageHeader>

            <ProjectsError />


        </div>
        )
    }


    return (
        <div className='py-2 px-2 md:px-4 lg:px-8 min-h-[calc(100vh-64px)]  relative  '>

            <Link className='bg-primary fixed p-6 lg:hidden z-10 rounded-lg bottom-24 right-6' to={"add"}><PlusIcon width={14} height={14} className='text-white' /></Link>

            <PageHeader title='Projects' description='Manage and curate your projects'>
                <Button className='flex gap-4 justify-center items-center py-3 px-5'><PlusIcon /><Link to={"add"}>Create New Project</Link></Button>
            </PageHeader>

            {!isLoading && projects?.length == 0
                ? <EmptyProjects />
                : <PageBody className='lg:w-full flex flex-col justify-start items-center bg-surfacelow min-h-[40vh] bg-green-200s '>
                    <ProjectsList projects={projects} />
                </PageBody>
            }
            <div className='py-4 w-full px-4 bottom-4 left-0'>

                <ProjectsPagination page={pagination} />
            </div>
        </div>
    )
}

export default Projects