import { taskStatusDisaply } from "@/utils/constants/TaskStatus";
import Column from "./Column";
import { DndContext, DragOverlay, type DragEndEvent, type DragMoveEvent, type DragStartEvent } from "@dnd-kit/core"
import { useState } from "react";
import type { EpicTask } from "../../schema/types";
import { updatedTaskStatus } from "../../services/TasksApi";
const BoardView = () => {
    const [activeTask, setActiveTask] = useState<EpicTask | null>(null);
    const startDrag = (event: DragStartEvent) => {
        const { active: { data: { current: currentTask } } } = event;
        if (currentTask) {
            setActiveTask(currentTask as EpicTask)
        }
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
            await Promise.all([newRefetch(newStatus), currentRefetch(currentStatus)])
        }

        setActiveTask(null);
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

            <DragOverlay>

                {
                    activeTask &&
                    <div className="
            bg-orange-400
            shadow-lg
            rounded-md
            p-4
            w-72
          ">
                        {activeTask.title}
                    </div>
                }

            </DragOverlay>
        </DndContext>
    )
}

export default BoardView






