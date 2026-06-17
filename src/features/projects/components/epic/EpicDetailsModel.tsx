
import EpicsModelIcon from '@/assets/svgs/EpicsModelIcon';
import type { ProjectEpicsType } from '../../schema/types';
import XmarkIcon from '@/assets/svgs/XmarkIcon';
import Avatar from '@/shared/UI/Avatar';
import CalenderIcon from '@/assets/svgs/CalenderIcon';
import { formatDate } from '@/lib/helpers';
import PlusIcon from '@/assets/svgs/PlusIcon';
import ListIcon from '@/assets/svgs/ListIcon';
import { Button } from '@/shared/UI/Button';
import { useUpdateEpic } from '../../hooks/useUpdateEpic';
import { useState } from 'react';
import Input from '@/shared/UI/Input';
import { cn } from '@/lib/utils';



interface Props {
    epic: ProjectEpicsType,
    onClose: () => void
}

interface activeFileEdit {
    name: string,
    value: string
}
const EpicDetailsModel = ({ onClose, epic }: Props) => {
    const { localEpic, isSaving, updateField } = useUpdateEpic(epic)
    const [currentTypeEdit, setCurrentTypeEdit] = useState<activeFileEdit | null>({ name: "", value: "" })
    const [titleDraft, setTitleDraft] = useState(localEpic.title);
    const [descriptionDraft, setDescriptionDraft] = useState(localEpic.description);
    const [deadlineDraft, setDeadlineDraft] = useState(localEpic.deadline ?? "");

    const setActiveFiled = ({ name, value }: activeFileEdit) => {
        setCurrentTypeEdit({ name, value })
    }

    const handleTitleBlur = async () => {
        if (titleDraft === localEpic.title) {
            setCurrentTypeEdit(null);
            return;
        }

        await updateField("title", titleDraft);

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

        setCurrentTypeEdit(null);
    };

    const handleDeadineChange = async (e: React.FocusEvent<HTMLInputElement>) => {
        setDeadlineDraft(e.target.value)

        await updateField(
            "deadline",
            e.target.value || null
        );


        setCurrentTypeEdit(null);
    };

    const handleDeadineBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDeadlineDraft(e.target.value)
    }


    if (!epic) return


    return (
        <div className="fixed w-screen h-screen left-0 top-0 z-50 flex items-center justify-center">
            <div className="absolute w-full h-full   z-10 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
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
                            onClick={onClose}
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
                        <div className="flex flex-col gap-4">
                            <span className='text-muted text-xs uppercase'>Assignee </span>
                            <div className='flex items-center gap-2'>
                                <Avatar className='p-4 w-4 h-4 text-sm bg-slate-light' name={epic.assignee.name} /> {epic.assignee.name || "No Assignee"}
                            </div>
                        </div>
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
                                    <CalenderIcon className='w-4 h-4' />{deadlineDraft || "No dataline"}
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
                            <button className='flex items-center justify-end gap-1 text-primary'><PlusIcon /> Add Task</button>
                        </div>
                        <div className='flex items-center justify-center rounded-sm w-full  bg-surface-highest h-62 border-dashed border-2 border-muted' >
                            <div className='flex flex-col items-center justify-center gap-4'>
                                <p className='w-10 h-10 flex items-center justify-center p-2 rounded-sm bg-surface-highest'>
                                    <ListIcon />
                                </p>
                                <p className='my- '>No tasks have been added to this epic yet</p>
                                <Button
                                    className='flex items-center justify-center gap-2'
                                ><PlusIcon />Add Task</Button>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    );
}

export default EpicDetailsModel