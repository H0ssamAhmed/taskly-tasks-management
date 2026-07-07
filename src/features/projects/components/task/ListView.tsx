import { useProjectTask } from "../../hooks/useProjectTask"
import type { EpicTask } from "../../schema/types"
import TableRow from "./TableRow"
import TableSkeleton from "./TableSkeleton"


function ListView() {
    const { loading, projectTasksListView } = useProjectTask("TO_DO")


    if (loading) {
        return <TableSkeleton />

    }
    return (
        <table className="w-full task-table">
            <thead className="bg-surface-low/50 py-6 px-6.5">
                <tr>
                    <td className="uppercase font-bold text-xs text-muted">task id</td>
                    <td className="uppercase font-bold text-xs text-muted">title</td>
                    <td className="uppercase font-bold text-xs text-muted">status</td>
                    <td className="uppercase font-bold text-xs text-muted">due date</td>
                    <td className="uppercase font-bold text-xs  text-muted">assignee</td>

                </tr>
            </thead>
            <tbody>
                {projectTasksListView.map((task: EpicTask) => {
                    return <TableRow task={task} />
                })}

            </tbody>
        </table>
    )
}

export default ListView