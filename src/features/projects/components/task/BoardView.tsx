import { taskStatusDisaply } from "@/utils/constants/TaskStatus";
import Column from "./Column";
import { DndContext, type DragEndEvent, type DragMoveEvent, type DragStartEvent } from "@dnd-kit/core"
import { updatedTaskStatus } from "../../services/TasksApi";
import { ToastSuccess } from "@/utils/Toast"; const BoardView = () => {
    const startDrag = (event: DragStartEvent) => {
        // const { active: { data: { current: currentTask } } } = event;
        return event

    };

    const moveDrag = (event: DragMoveEvent) => {
        // const { active, over } = event;
        return event

    };


    const endDrag = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;
        const newStatus = over.data.current?.status;
        const newRefetch = over.data.current?.refetch;
        const currentStatus = active.data.current?.status;
        const currentRefetch = active.data.current?.refetch;

        const response = await updatedTaskStatus({
            taskId: active.id,
            newStatus: newStatus,
        });
        if (response.ok) {
            const [newStatusRes, oldStatusRes] = await Promise.all([newRefetch(newStatus), currentRefetch(currentStatus)])
            if (newStatusRes && oldStatusRes) {
                ToastSuccess("stateus updarted", { position: "top-center" })
            }

        }
    };

    return (
        <DndContext
            onDragStart={startDrag}
            onDragMove={moveDrag}
            onDragEnd={endDrag}
        >
            <div className="overflow-x-auto w-full py-4 select-none!">
                <div className="flex gap-4 min-w-max flex-wrap">
                    {taskStatusDisaply.map((status) => (
                        <Column key={status} status={status} />
                    ))}
                </div>
            </div>
        </DndContext>
    )
}

export default BoardView






