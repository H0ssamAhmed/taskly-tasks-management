import ProjectCard from './ProjectCard'
import AddCard from './AddCard'
import type { ProjectType } from '../schema/types'

const ProjectsList = ({ projects }: { projects: ProjectType[] }) => {
    return (

        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 justify-center items-center gap-6">
            {projects.map((project: ProjectType) => <ProjectCard {...project} key={project.id} />)}
            <AddCard />
        </div>
    )
}

export default ProjectsList