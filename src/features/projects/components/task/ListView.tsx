import { useProjectTask } from "../../hooks/useProjectTask"


function ListView() {
    const { loading } = useProjectTask("TO_DO")


    if (loading) {
        return <h1 className="text-4xl text-center py-20 ">Loading</h1>

    }
    return (
        <div>ListView</div>
    )
}

export default ListView