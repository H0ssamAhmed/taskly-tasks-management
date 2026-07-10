import { Link, useParams } from "react-router-dom"
import type { TaskStatusDisplayType } from "../../schema/types"
import PlusIcon from "@/assets/svgs/PlusIcon"



const AddNewTaskLink = ({ status }: { status: TaskStatusDisplayType }) => {
    const { id: project_id } = useParams()
    return <Link to={`/project/${project_id}/tasks/new?status=${status}`}>
        <div className="py-4 flex items-center justify-center gap-2 text-slate-light border-slate-light border-dashed border">
            <p className="border rounded-full border-slate-light w-fit p-0.5"><PlusIcon /></p>
            Add New Task
        </div>
    </Link>
}



export default AddNewTaskLink