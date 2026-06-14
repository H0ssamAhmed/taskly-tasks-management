import ProjectCard from './ProjectCard'
import AddCard from './AddCard'
import type { ProjectType } from '../schema/types'

const ProjectsList = ({ projects }: { projects: ProjectType[] }) => {
    return (

        <div className="flex flex-wrap justify-center items-center gap-6">
            {projects.map((project: ProjectType) => <ProjectCard {...project} key={project.id} />)}
            <AddCard />
        </div>
    )
}

export default ProjectsList