import { useAppDispatch, useAppSelector } from "@/store/store"
import { closeModel, fetchTaskDetails } from "../../slice/taskSlice"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { EpicTask, TaskStatusType } from "../../schema/types"
import { Button } from "@/shared/UI/Button"
import CopylinkIcon from "@/assets/svgs/CopylinkIcon"
import { statusBadgeStyle, taskStatus, taskStatus_underscore, taskStatusDisaply, type TaskStatusKey } from "@/utils/constants/TaskStatus"
import { cn } from "@/lib/utils"
import Avatar from "@/shared/UI/Avatar"
import { formatDate } from "@/lib/helpers"
import XmarkIcon from "@/assets/svgs/XmarkIcon"
import TaskDetailsSkeleton from "./TaskDetailsSkeleton"
import PageError from "@/shared/PageError"
import Input from "@/shared/UI/Input"
import { useUpdateTask } from "../../hooks/useUpdateTask"
import { useMembers } from "../../hooks/useMember"
import { useEpics } from "../../hooks/useEpics"
import CalenderIcon from "@/assets/svgs/CalenderIcon"


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


interface ActiveFieldEdit {
    name: string
    value: string
}

const toDatetimeLocal = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
};

const Details = ({ details, onClose }: { details: EpicTask, onClose: () => void }) => {
    const { localTask, isSaving, updateField } = useUpdateTask(details)
    const { members } = useMembers()
    const { epics } = useEpics()
    const [currentTypeEdit, setCurrentTypeEdit] = useState<ActiveFieldEdit | null>(null)
    const [titleDraft, setTitleDraft] = useState(localTask.title)
    const [descriptionDraft, setDescriptionDraft] = useState(localTask.description ?? "")
    const [dueDateDraft, setDueDateDraft] = useState(toDatetimeLocal(localTask.due_date))

    const setActiveField = ({ name, value }: ActiveFieldEdit) => {
        if (name === "title") setTitleDraft(localTask.title)
        if (name === "description") setDescriptionDraft(localTask.description ?? "")
        if (name === "due_date") setDueDateDraft(toDatetimeLocal(localTask.due_date))
        setCurrentTypeEdit({ name, value })
    }

    const handleTitleBlur = async () => {
        if (titleDraft === localTask.title) {
            setCurrentTypeEdit(null)
            return
        }
        await updateField("title", titleDraft)
        setCurrentTypeEdit(null)
    }

    const handleDescriptionBlur = async () => {
        if (descriptionDraft === (localTask.description ?? "")) {
            setCurrentTypeEdit(null)
            return
        }
        await updateField("description", descriptionDraft || null)
        setCurrentTypeEdit(null)
    }

    const handleDueDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setDueDateDraft(value)

        const currentValue = toDatetimeLocal(localTask.due_date)
        if (value === currentValue) {
            setCurrentTypeEdit(null)
            return
        }

        await updateField("due_date", value || null)
        setCurrentTypeEdit(null)
    }

    const handleDueDateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setDueDateDraft(e.target.value)
    }

    const handleAssignee = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value || null
        const currentAssigneeId = localTask.assignee?.id ?? null

        if (selectedId === currentAssigneeId) {
            setCurrentTypeEdit(null)
            return
        }

        if (selectedId === null) {
            await updateField("assignee_id", null, { assignee: null })
            setCurrentTypeEdit(null)
            return
        }

        const member = members.find(m => m.user_id === selectedId)
        if (!member) return

        await updateField("assignee_id", selectedId, {
            assignee: {
                id: member.user_id,
                name: member.metadata.name,
                email: member.metadata.email,
                department: member.metadata.department,
            },
        })
        setCurrentTypeEdit(null)
    }

    const handleEpic = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value || null
        const currentEpicId = localTask.epic_id ?? localTask.epic?.id ?? null

        if (selectedId === currentEpicId) {
            setCurrentTypeEdit(null)
            return
        }

        if (selectedId === null) {
            await updateField("epic_id", null, { epic: null })
            setCurrentTypeEdit(null)
            return
        }

        const epic = epics.find(e => e.id === selectedId)
        if (!epic) return

        await updateField("epic_id", selectedId, {
            epic: {
                id: epic.id,
                title: epic.title,
                epic_id: epic.epic_id,
            },
        })
        setCurrentTypeEdit(null)
    }

    const handleStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as TaskStatusType
        if (newStatus === localTask.status) {
            setCurrentTypeEdit(null)
            return
        }
        await updateField("status", newStatus)
        setCurrentTypeEdit(null)
    }


    return (
        <div className="h-full ">
            <div className="hidden rounded-sm lg:grid grid-cols-3 h-full overflow-hidden ">
                <div className="col-span-2 flex items-start flex-col  justify-between ">
                    <div className="flex flex-col w-full items-start gap-4">
                        <div className="pt-6 px-8 w-full flex items-start flex-col gap-3">
                            <div className="flex items-center justify-start gap-3">
                                <p className="px-2 py-1 w-fit rounded-sm bg-primary-container/20 text-xs font-bold text-primary">{localTask.task_id}</p>
                                {currentTypeEdit?.name === "epic" ? (
                                    <select
                                        className="py-2 px-3 rounded-sm text-sm"
                                        disabled={isSaving}
                                        value={localTask.epic_id ?? localTask.epic?.id ?? ""}
                                        onChange={handleEpic}
                                        autoFocus
                                    >
                                        <option value="">No Epic</option>
                                        {epics.map(epic => (
                                            <option key={epic.id} value={epic.id}>
                                                {epic.epic_id} ({epic.title})
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p
                                        className="text-sm font-medium cursor-pointer hover:text-primary"
                                        onClick={() => setActiveField({ name: "epic", value: localTask.epic_id ?? "" })}
                                    >
                                        {(localTask.epic?.id && localTask.epic?.title)
                                            ? `${localTask.epic.epic_id} ( ${localTask.epic.title} )`
                                            : "No Epic"}
                                    </p>
                                )}
                            </div>
                            {currentTypeEdit?.name === "title" ? (
                                <Input
                                    disabled={isSaving}
                                    value={titleDraft}
                                    className={cn("w-full", isSaving && "opacity-50")}
                                    onChange={(e) => setTitleDraft(e.target.value)}
                                    onBlur={handleTitleBlur}
                                    autoFocus
                                />
                            ) : (
                                <p
                                    className="headline-lg w-full cursor-pointer hover:text-primary"
                                    onClick={() => setActiveField({ name: "title", value: localTask.title })}
                                >
                                    {localTask.title}
                                </p>
                            )}
                        </div>
                        <div className="pt-6 w-full px-8 py-4 w-fulL">
                            <p className="uppercase my-4 text-[10px] font-bold">description</p>
                            {currentTypeEdit?.name === "description" ? (
                                <textarea
                                    disabled={isSaving}
                                    value={descriptionDraft}
                                    className={cn("text-sm/snug font-normal text-primary-dark py-2 ps-4 pe-9 bg-surface-highest w-full h-32 rounded-sm", isSaving && "opacity-50")}
                                    onChange={(e) => setDescriptionDraft(e.target.value)}
                                    onBlur={handleDescriptionBlur}
                                    autoFocus
                                />
                            ) : (
                                <p
                                    className="text-sm/snug font-normal text-primary-dark cursor-pointer hover:text-primary"
                                    onClick={() => setActiveField({ name: "description", value: localTask.description ?? "" })}
                                >
                                    {localTask.description || "No description"}
                                </p>
                            )}
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
                        {currentTypeEdit?.name === "status" ? (
                            <select
                                className="w-full py-2 px-4 rounded-sm"
                                disabled={isSaving}
                                value={localTask.status}
                                autoFocus
                                onChange={handleStatus}
                            >
                                {taskStatusDisaply.map((status) => (
                                    <option key={status} value={taskStatus[status]}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p
                                className={cn("w-full py-2 px-4 rounded-sm cursor-pointer", statusBadgeStyle[localTask.status])}
                                onClick={() => setActiveField({ name: "status", value: localTask.status })}
                            >
                                {taskStatus_underscore[localTask.status]}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col items-start justify-start gap-4 my-8">
                        <p className="font-bold text-[10px] uppercase">Assignee</p>
                        {currentTypeEdit?.name === "assignee" ? (
                            <select
                                className="w-full py-2 px-4 rounded-sm"
                                disabled={isSaving}
                                value={localTask.assignee?.id ?? ""}
                                autoFocus
                                onChange={handleAssignee}
                            >
                                <option value="">Unassigned</option>
                                {members.map(member => (
                                    <option key={member.user_id} value={member.user_id}>
                                        {member.metadata.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div
                                className={cn("w-full py-2 px-4 rounded-sm bg-white flex items-center justify-start gap-4 cursor-pointer hover:bg-surface-highest")}
                                onClick={() => setActiveField({ name: "assignee", value: localTask.assignee?.id ?? "" })}
                            >
                                <Avatar className="w-4 h-4 rounded-sm p-3 text-xs" name={localTask?.assignee?.name} />
                                <div className="">
                                    <p className="font-semibold text-sm text-primary-dark">{localTask?.assignee?.name || "Unassigned"} </p>
                                    <p className="font-normal text-xs">{localTask?.assignee?.department}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-start justify-start gap-4 my-8">
                        <p className="font-bold text-[10px] uppercase">reporter</p>
                        <div className={cn("w-full py-2 px-4 rounded-sm flex items-center justify-start gap-4")}>
                            <Avatar className="w-4 h-4 rounded-sm p-3 text-xs" name={localTask?.created_by?.name} />
                            <div className="">
                                <p className="font-semibold text-sm text-primary-dark">{localTask?.created_by?.name || "Unassigned"} </p>
                                <p className="font-normal text-xs">{localTask?.created_by?.department}</p>
                            </div>
                        </div>
                    </div>
                    <hr className="border-slate-light border" />
                    <div className="mt-4 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-muted">Due Date</span>
                            {currentTypeEdit?.name === "due_date" ? (
                                <Input
                                    type="datetime-local"
                                    disabled={isSaving}
                                    value={dueDateDraft}
                                    autoFocus
                                    className={cn("py-1 text-sm", isSaving && "opacity-50")}
                                    onChange={handleDueDateChange}
                                    onBlur={handleDueDateBlur}
                                />
                            ) : (
                                <span
                                    className="text-primary-dark font-medium cursor-pointer hover:text-primary flex items-center gap-2"
                                    onClick={() => setActiveField({ name: "due_date", value: dueDateDraft })}
                                >
                                    <CalenderIcon className="w-4 h-4" />
                                    {localTask.due_date ? formatDate(localTask.due_date) : "No deadline"}
                                </span>
                            )}
                        </div>
                        <p className="flex items-center justify-between "><span className="text-muted">Created at</span> {localTask.created_at && <span className="text-primary-dark font-medium">{formatDate(localTask.created_at)}</span>}</p>
                    </div>
                    <div></div>
                </div>

            </div>
            <div className="block lg:hidden absolute pt-6 px-6 w-full">
                <p className="text-xs text-slate-mid font-bold py-4 px-2 w-full flex items-center justify-between">
                    <span className="block">{localTask?.task_id}</span>
                    <span onClick={onClose} className="block cursor-pointer hover:bg-primary/50 p-2 rounded-sm hover:text-white transition-all"><XmarkIcon /></span>
                </p>
                {currentTypeEdit?.name === "title" ? (
                    <Input
                        disabled={isSaving}
                        value={titleDraft}
                        className={cn("w-full headline-lg", isSaving && "opacity-50")}
                        onChange={(e) => setTitleDraft(e.target.value)}
                        onBlur={handleTitleBlur}
                        autoFocus
                    />
                ) : (
                    <p
                        className="headline-lg cursor-pointer"
                        onClick={() => setActiveField({ name: "title", value: localTask.title })}
                    >
                        {localTask.title}
                    </p>
                )}
                <div className="my-4 flex items-center justify-start gap-4">
                    {currentTypeEdit?.name === "status" ? (
                        <select
                            className="rounded-4xl py-1 px-3 text-sm"
                            disabled={isSaving}
                            value={localTask.status}
                            autoFocus
                            onChange={handleStatus}
                        >
                            {taskStatusDisaply.map((status) => (
                                <option key={status} value={taskStatus[status as TaskStatusKey]}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p
                            className={cn("w-fit rounded-4xl py-1 px-3 cursor-pointer", statusBadgeStyle[localTask.status])}
                            onClick={() => setActiveField({ name: "status", value: localTask.status })}
                        >
                            {taskStatus_underscore[localTask.status]}
                        </p>
                    )}
                    {currentTypeEdit?.name === "epic" ? (
                        <select
                            className="text-sm rounded-xl py-1 px-3"
                            disabled={isSaving}
                            value={localTask.epic_id ?? localTask.epic?.id ?? ""}
                            onChange={handleEpic}
                            autoFocus
                        >
                            <option value="">No Epic</option>
                            {epics.map(epic => (
                                <option key={epic.id} value={epic.id}>
                                    {epic.epic_id}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p
                            className="text-sm bg-surface-highest w-fit rounded-xl py-1 px-3 font-medium cursor-pointer"
                            onClick={() => setActiveField({ name: "epic", value: localTask.epic_id ?? "" })}
                        >
                            {localTask?.epic?.epic_id || "No Epic"}
                        </p>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-surface-low p-4 rounded-sm">
                        <span className="block uppercase text-xs">assignee</span>
                        {currentTypeEdit?.name === "assignee" ? (
                            <select
                                className="w-full my-4 py-2 rounded-sm text-sm"
                                disabled={isSaving}
                                value={localTask.assignee?.id ?? ""}
                                autoFocus
                                onChange={handleAssignee}
                            >
                                <option value="">Unassigned</option>
                                {members.map(member => (
                                    <option key={member.user_id} value={member.user_id}>
                                        {member.metadata.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p
                                className="flex my-4 items-center justify-start gap-2 cursor-pointer"
                                onClick={() => setActiveField({ name: "assignee", value: localTask.assignee?.id ?? "" })}
                            >
                                <Avatar className="w-6 h-6 rounded-full text-xs"
                                    name={localTask.assignee?.name} />{localTask.assignee?.name || "Unassigned"}
                            </p>
                        )}
                    </div>
                    <div className="bg-surface-low p-4 rounded-sm">
                        <span className="block uppercase text-xs">due date</span>
                        {currentTypeEdit?.name === "due_date" ? (
                            <Input
                                type="datetime-local"
                                disabled={isSaving}
                                autoFocus
                                value={dueDateDraft}
                                className={cn("w-ful my-4 text-sm", isSaving && "opacity-50")}
                                onChange={handleDueDateChange}
                                onBlur={handleDueDateBlur}
                            />
                        ) : (
                            <p
                                className="flex my-4 items-center justify-start gap-2 cursor-pointer"
                                onClick={() => setActiveField({ name: "due_date", value: dueDateDraft })}
                            >
                                {localTask?.due_date ? formatDate(localTask?.due_date) : "No deadline"}
                            </p>
                        )}
                    </div>
                    <div className="bg-surface-low p-4 rounded-sm">
                        <span className="block uppercase text-xs">created by</span>
                        <p className="flex my-4  items-center justify-start gap-2">
                            <Avatar className="w-6 h-6 rounded-full text-xs"
                                name={localTask.created_by?.name} />{localTask.created_by?.name || "Unassigned"}
                        </p>
                    </div>
                    <div className="bg-surface-low p-4 rounded-sm">
                        <span className="block uppercase text-xs">created at</span>
                        <p className="flex my-4  items-center justify-start gap-2">
                            {localTask.created_at && formatDate(localTask.created_at)}
                        </p>
                    </div>
                </div>
                <div className="my-4">
                    <span className="block uppercase text-xs text-muted mb-2">description</span>
                    {currentTypeEdit?.name === "description" ? (
                        <textarea
                            disabled={isSaving}
                            value={descriptionDraft}
                            className={cn("py-2 ps-4 pe-9 bg-surface-highest w-full h-24 rounded-sm text-sm", isSaving && "opacity-50")}
                            onChange={(e) => setDescriptionDraft(e.target.value)}
                            onBlur={handleDescriptionBlur}
                            autoFocus
                        />
                    ) : (
                        <p
                            className="text-sm text-primary-dark cursor-pointer"
                            onClick={() => setActiveField({ name: "description", value: localTask.description ?? "" })}
                        >
                            {localTask.description || "No description"}
                        </p>
                    )}
                </div>

            </div>
        </div>
    )
}
