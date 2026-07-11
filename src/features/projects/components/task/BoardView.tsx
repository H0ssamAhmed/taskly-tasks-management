import { taskStatusDisaply } from "@/utils/constants/TaskStatus";
import Column from "./Column";

const BoardView = () => {




    return (
        <div className="overflow-x-auto w-full py-4">
            <div className="flex gap-4 min-w-max flex-wrap">
                {taskStatusDisaply.map((status) => (
                    <Column key={status} status={status} />
                ))}
            </div>


        </div>
    )
}

export default BoardView






