import { useEffect } from 'react'
import ProjectCard from './ProjectCard'
import AddCard from './AddCard'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { fetchALlProjects } from '../slice/projectSlice'
import type { ProjectType } from '@/lib/types'

const ProjectsList = () => {
    const { data, loading, status } = useAppSelector((state) => state.projects)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (status == "idle") {
            dispatch(fetchALlProjects())
        }
    }, [])

    return (
        <div className="flex flex-wrap justify-center items-center gap-6">
            {data.map((project: ProjectType) => <ProjectCard {...project} key={project.id} />)}
            {!loading && status == "success" && <AddCard />}
        </div>
    )
}

export default ProjectsList