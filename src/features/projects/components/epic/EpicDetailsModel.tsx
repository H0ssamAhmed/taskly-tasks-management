
import EpicsModelIcon from '@/assets/svgs/EpicsModelIcon';
import type { ProjectEpicsType } from '../../schema/types';
import XmarkIcon from '@/assets/svgs/XmarkIcon';
import Avatar from '@/shared/UI/Avatar';
import CalenderIcon from '@/assets/svgs/CalenderIcon';
import { formatDate } from '@/lib/helpers';
import PlusIcon from '@/assets/svgs/PlusIcon';

import { useUpdateEpic } from '../../hooks/useUpdateEpic';
import { useState } from 'react';
import Input from '@/shared/UI/Input';
import { cn } from '@/lib/utils';
import { useMembers } from '../../hooks/useMember';
import { Link } from 'react-router-dom';
import EpicTasks from './EpicTasks';



interface Props {
    epic: ProjectEpicsType,
    onClose: (isDirty: boolean) => void
}

interface activeFileEdit {
    name: string,
    value: string
}
const EpicDetailsModel = ({ onClose, epic }: Props) => {
    const { members } = useMembers()
    const { localEpic, isSaving, updateField } = useUpdateEpic(epic)
    const [currentTypeEdit, setCurrentTypeEdit] = useState<activeFileEdit | null>({ name: "", value: "" })
    const [titleDraft, setTitleDraft] = useState(localEpic.title);
    const [descriptionDraft, setDescriptionDraft] = useState(localEpic.description);
    const [deadlineDraft, setDeadlineDraft] = useState(localEpic.deadline ?? "");
    const [assigneeDraft, setAssigneeDraft] = useState({ assignee_id: localEpic.assignee?.sub ?? "", name: localEpic.assignee?.name ?? "", });
    const [isAnyDtailsChanged, SetIsAnyDtailsChanged] = useState<boolean>(false)

    const setActiveFiled = ({ name, value }: activeFileEdit) => {
        setCurrentTypeEdit({ name, value })
    }

    const handleTitleBlur = async () => {
        if (titleDraft === localEpic.title) {
            setCurrentTypeEdit(null);
            return;
        }

        await updateField("title", titleDraft);
        SetIsAnyDtailsChanged(true)
        setCurrentTypeEdit(null);
    };

    const handleDescriptionBlur = async () => {
        if (descriptionDraft === localEpic.description) {
            setCurrentTypeEdit(null);
            return;
        }

        await updateField(
            "description",
            descriptionDraft
        );
        SetIsAnyDtailsChanged(true)

        setCurrentTypeEdit(null);
    };

    const handleDeadineChange = async (e: React.FocusEvent<HTMLInputElement>) => {
        setDeadlineDraft(e.target.value)

        await updateField(
            "deadline",
            e.target.value || null
        );

        SetIsAnyDtailsChanged(true)

        setCurrentTypeEdit(null);
    };

    const handleDeadineBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDeadlineDraft(e.target.value)
    }
    const handleAssignee = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value || null;
        const currentAssigneeId = localEpic.assignee?.sub ?? null;

        if (selectedId === currentAssigneeId) {
            setCurrentTypeEdit(null);
            return;
        }
        if (selectedId === null) {
            await updateField("assignee_id", null);
            setAssigneeDraft({
                assignee_id: "",
                name: "",
            });
            SetIsAnyDtailsChanged(true)
            setCurrentTypeEdit(null);
            return;
        }
        const member = members.find(m => m.user_id === selectedId);

        if (!member) return;

        await updateField(
            "assignee_id",
            selectedId
        );

        setAssigneeDraft({
            assignee_id: selectedId,
            name: member.metadata.name,
        });
        SetIsAnyDtailsChanged(true)
        setCurrentTypeEdit(null);
    };

    if (!epic) return


    return (
        <div className="fixed w-screen h-screen left-0 top-0 z-50 flex items-center justify-center">
            <div className="absolute w-full h-full   z-10 bg-black/50 backdrop-blur-sm"
                onClick={() => onClose(isAnyDtailsChanged)}
            />

            {/* Modal Content */}
            <div className="relative z-10 bg-white p-6 rounded-lg w-2xl shadow-xl">
                <div className='rounded-sm '>
                    <div className=' flex items-center justify-between py-8'>
                        <div className='flex grow flex-col gap-4'>
                            <p className='flex items-center justify-start gap-4'>
                                <EpicsModelIcon />
                                <span className='text-muted text-xs font-bold'>{epic.epic_id}</span>
                            </p>

                            {currentTypeEdit?.name === "title" ? (
                                <Input
                                    disabled={isSaving}
                                    value={titleDraft}
                                    className={cn('w-2/3 py-2', isSaving && "opacity-50 ")}
                                    onChange={(e) =>
                                        setTitleDraft(e.target.value)
                                    }
                                    onBlur={handleTitleBlur}
                                />
                            ) : (
                                <p
                                    className='headline-lg text-2xl'
                                    onClick={() => setActiveFiled({ name: "title", value: localEpic.title })
                                    }
                                >
                                    {localEpic.title}
                                </p>
                            )}

                        </div>
                        <p
                            onClick={() => onClose(isAnyDtailsChanged)}
                            className='rounded-sm cursor-pointer transition-all  p-2 hover:bg-error/30'><XmarkIcon width={16} height={16} /></p>
                    </div>




                    {currentTypeEdit?.name === "description" ? (
                        <textarea
                            disabled={isSaving}
                            value={descriptionDraft}
                            className={cn('py-2 ps-4 pe-9 bg-surface-highest w-full h-20 rounded-sm', isSaving && "opacity-50 ")}
                            onChange={(e) =>
                                setDescriptionDraft(e.target.value)
                            }
                            onBlur={handleDescriptionBlur}
                        />
                    ) : (
                        <div className='flex flex-col my-4 gap-4'
                            onClick={() => setActiveFiled({ name: "description", value: localEpic.description })}
                        >
                            <span className='lg:hidden'>Description</span>
                            <p> {localEpic.description || "No description provided"}</p>
                        </div>

                    )}

                    <div className='grid grid-cols-2 gap-6 lg:grid-cols-3'>
                        <div className="flex flex-col gap-4">
                            <span className='text-muted text-xs uppercase'>created by</span>
                            <p className='flex items-center gap-2'>
                                <Avatar className='p-4 w-4 h-4 text-sm' name={epic.created_by.name} /> {epic.created_by.name}
                            </p>
                        </div>
                        {currentTypeEdit?.name === "assignee" ?
                            (
                                <div className='flex flex-col'>
                                    <span className='text-muted text-xs uppercase'>assignee </span>
                                    <select
                                        className='py-4 rounded-sm'
                                        disabled={isSaving}
                                        value={assigneeDraft.assignee_id}
                                        onChange={handleAssignee}

                                    >
                                        <option value="">
                                            Unassigned
                                        </option>

                                        {members.map(member => (
                                            <option
                                                key={member.user_id}
                                                value={member.user_id}
                                            >
                                                {member.metadata.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            )
                            :
                            <div className="flex flex-col gap-4"
                                onClick={() => setActiveFiled({ name: "assignee", value: localEpic.assignee.sub })}
                            >
                                <span className='text-muted text-xs uppercase'>assignee</span>
                                <div className='flex items-center gap-2'>
                                    <Avatar className='p-4 w-4 h-4 text-sm bg-slate-light/40' name={assigneeDraft.name} /> {assigneeDraft.name || "No Assignee"}
                                </div>
                            </div>}
                        <hr className='col-span-2 opacity-20 h-0.5 lg:hidden bg-muted' />
                        <div className="flex flex-col gap-4">
                            <span className='text-muted text-xs uppercase'>deadline </span>
                            {currentTypeEdit?.name === "deadline" ? (
                                <Input
                                    min={new Date().toISOString().split('T')[0]}
                                    name='deadline'
                                    type="date"
                                    disabled={isSaving}
                                    value={deadlineDraft}
                                    className={cn('py-2', isSaving && "opacity-50 ")}
                                    onChange={handleDeadineChange}
                                    onBlur={handleDeadineBlur}
                                />
                            ) : (
                                <p
                                    onClick={() => setActiveFiled({ name: "deadline", value: localEpic.deadline ?? "", })}
                                    className='flex items-center gap-2'
                                >
                                    <CalenderIcon className='w-4 h-4' />{deadlineDraft || "No deadline"}
                                </p>
                            )}

                        </div>
                        <div className="flex flex-col gap-4">
                            <span className='text-muted text-xs uppercase'>created at </span>
                            <p className='flex items-center gap-2'>
                                <CalenderIcon className='w-4 h-4' />{formatDate(epic.created_at)}
                            </p>
                        </div>



                    </div>

                    <div className='my-4 py-4 flex flex-col gap-6'>
                        <div className='flex items-center justify-between'>
                            <p className='text-lg/normal font-semibold'>Tasks</p>
                            <Link to={`/project/${epic.project_id}/tasks/new?epic_id=${epic.id}`}>
                                <button className='flex items-center justify-end gap-1 text-primary'><PlusIcon /> Add Task</button>
                            </Link>
                        </div>
                        <EpicTasks epicId={epic.id} />
                    </div>
                </div>


            </div>
        </div>

    );
}

export default EpicDetailsModel