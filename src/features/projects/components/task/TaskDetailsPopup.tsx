import { useAppDispatch, useAppSelector } from "@/store/store"
import { closeModel, fetchTaskDetails } from "../../slice/taskSlice"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import type { EpicTask } from "../../schema/types"
import { Button } from "@/shared/UI/Button"
import CopylinkIcon from "@/assets/svgs/CopylinkIcon"
import { statusBadgeStyle, taskStatus_underscore } from "@/utils/constants/TaskStatus"
import { cn } from "@/lib/utils"
import Avatar from "@/shared/UI/Avatar"
import { formatDate } from "@/lib/helpers"
import XmarkIcon from "@/assets/svgs/XmarkIcon"
import TaskDetailsSkeleton from "./TaskDetailsSkeleton"
import PageError from "@/shared/PageError"


const TaskDetailsPopup = () => {
    const { id } = useParams()
    const { selectedTaskId, loading, data, status } = useAppSelector(state => state.taskDetails);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!selectedTaskId) return;
        dispatch(fetchTaskDetails({
            taskId: selectedTaskId,
            projectId: id!
        }));
    }, [selectedTaskId]);


    const refetch = () => {
        if (selectedTaskId) {
            dispatch(fetchTaskDetails({
                taskId: selectedTaskId,
                projectId: id!
            }));
        }
    }

    const handleClosePop = () => {
        dispatch(closeModel())
    }


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                dispatch(closeModel());
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch]);


    return (
        <div className='fixed w-screen z-90 h-screen left-0 top-0 '>
            <div className="bg-black/50  w-screen h-screen "
                onClick={handleClosePop}
            />
            <div className="absolute bottom-0 left-0 lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:w-10/12 h-10/12 bg-white">
                {!loading && data && status == "success" && <Details details={data} onClose={handleClosePop} />}
                {loading && <TaskDetailsSkeleton />}
                {<PageError onClick={refetch} />}

            </div>
        </div>
    )
}

export default TaskDetailsPopup



const Details = ({ details, onClose }: { details: EpicTask, onClose: () => void }) => {
    return (
        <div className="h-full ">
            <div className="hidden rounded-sm lg:grid grid-cols-3 h-full overflow-hidden ">
                <div className="col-span-2 flex items-start flex-col  justify-between ">
                    <div className="flex flex-col items-start gap-4">
                        <div className="pt-6 ps-8 flex items-start flex-col gap-3">
                            <div className="flex items-center justify-start gap-3">
                                <p className="px-2 py-1 w-fit rounded-sm bg-primary-container/20 text-xs font-bold text-primary">{details.task_id}</p>
                                <p className="text-sm font-medium">{details?.epic?.epic_id + ` ( ${details?.epic?.title} )`}</p>
                            </div>
                            <p className="headline-lg">{details.title}</p>
                        </div>
                        <div className="pt-6 ps-8 py-4">
                            <p className="uppercase my-4 text-[10px] font-bold">description</p>
                            <p className="text-sm/snugs font-normal text-primary-dark ">{details.description || "No description"}</p>
                        </div>
                    </div>
                    <div className="bg-surface-low py-4 px-8 flex items-center justify-between  w-full">
                        <Button variant="ghost" className="hover:border-slate-light border-transparent border transition rounded-sm py-2 px-4 flex items-center justify-center gap-2">
                            <CopylinkIcon />
                            Copy link</Button>
                        <Button
                            onClick={onClose}
                            variant="primary" className=" rounded-sm py-2 px-4 bg-surface-highest text-primary-dark font-semibold text-sm hover:text-white">Close</Button>
                    </div>
                </div>
                <div className="py-6 px-8 bg-surface-low h-full">
                    <div className="flex flex-col items-start justify-start gap-4 my-4">
                        <p className="font-bold text-[10px] uppercase">status</p>
                        <p className={cn("w-full py-2 px-4 rounded-sm", statusBadgeStyle[details.status])}>{taskStatus_underscore[details.status]}</p>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-4 my-8">
                        <p className="font-bold text-[10px] uppercase">Assignee</p>
                        <div className={cn("w-full py-2 px-4 rounded-sm bg-white flex items-center justify-start gap-4")}>
                            <Avatar className="w-4 h-4 rounded-sm p-3 text-xs" name={details?.assignee?.name} />
                            <div className="">
                                <p className="font-semibold text-sm text-primary-dark">{details?.assignee?.name || "Unassigned"} </p>
                                <p className="font-normal text-xs">{details?.assignee?.department}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-4 my-8">
                        <p className="font-bold text-[10px] uppercase">reporter</p>
                        <div className={cn("w-full py-2 px-4 rounded-sm flex items-center justify-start gap-4")}>
                            <Avatar className="w-4 h-4 rounded-sm p-3 text-xs" name={details?.created_by?.name} />
                            <div className="">
                                <p className="font-semibold text-sm text-primary-dark">{details?.created_by?.name || "Unassigned"} </p>
                                <p className="font-normal text-xs">{details?.created_by?.department}</p>
                            </div>
                        </div>
                    </div>
                    <hr className="border-slate-light border" />
                    <div className="mt-4 flex flex-col gap-4">
                        <p className="flex items-center justify-between "><span className="text-muted">Due Date</span> {details.due_date && <span className="text-primary-dark font-medium">{formatDate(details?.due_date)}</span>}</p>
                        <p className="flex items-center justify-between "><span className="text-muted">Created at</span> {details.created_at && <span className="text-primary-dark font-medium">{formatDate(details.created_at)}</span>}</p>
                    </div>
                    <div></div>
                </div>

            </div>
            <div className="block lg:hidden absolute pt-6 px-6 w-full">
                <p className="text-xs text-slate-mid font-bold py-4 px-2 w-full flex items-center justify-between">
                    <span className="block">{details?.task_id}</span>
                    <span onClick={onClose} className="block cursor-pointer hover:bg-primary/50 p-2 rounded-sm hover:text-white transition-all"><XmarkIcon /></span>
                </p>
                <p className="headline-lg">{details.title}</p>
                <div className="my-4 flex items-center justify-start gap-4">
                    <p className={cn("w-fit rounded-4xl py-1 px-3", statusBadgeStyle[details.status])}>{taskStatus_underscore[details.status]}</p>
                    <p className="text-sm bg-surface-highest w-fit rounded-xl  py-1 px-3 font-medium">{details?.epic?.epic_id}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-surface-low p-4 rounded-sm">
                        <span className="block uppercase text-xs">assignee</span>
                        <p className="flex my-4  items-center justify-start gap-2">
                            <Avatar className="w-6 h-6 rounded-full text-xs"
                                name={details.assignee?.name} />{details.assignee?.name || "Unassigned"}
                        </p>
                    </div>
                    <div className="bg-surface-low p-4 rounded-sm">
                        <span className="block uppercase text-xs">due date</span>
                        <p className="flex my-4  items-center justify-start gap-2">
                            {details?.due_date ? formatDate(details?.due_date) : "No deadline"}
                        </p>
                    </div>
                    <div className="bg-surface-low p-4 rounded-sm">
                        <span className="block uppercase text-xs">created by</span>
                        <p className="flex my-4  items-center justify-start gap-2">
                            <Avatar className="w-6 h-6 rounded-full text-xs"
                                name={details.created_by?.name} />{details.created_by?.name || "Unassigned"}
                        </p>
                    </div>
                    <div className="bg-surface-low p-4 rounded-sm">
                        <span className="block uppercase text-xs">created at</span>
                        <p className="flex my-4  items-center justify-start gap-2">
                            {details.created_at && formatDate(details.created_at)}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

