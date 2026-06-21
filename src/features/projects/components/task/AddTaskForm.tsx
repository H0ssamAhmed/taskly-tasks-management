import InputErrorAlert from '@/features/auth/components/InputErrorAlert'
import InputLayout from '@/features/auth/components/InputLayout'
import { Button } from '@/shared/UI/Button'
import Input from '@/shared/UI/Input'
import Label from '@/shared/UI/Label'
import Spinner from '@/shared/UI/Spinner'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { taskSchema, type TaskFormData } from '../../schema/TaskSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskStatus, taskStatusDisaply } from '@/utils/constants/TaskStatus'
import { useMembers } from '../../hooks/useMember'
import { useEpics } from '../../hooks/useEpics'
import type { CreateTaskPayload } from '../../schema/types'
import { descriptionLengthChecker } from '../../schema/Project.schema'
import { cn } from '@/lib/utils'
import { createTask } from '../../services/TasksApi'
import { ToastError, ToastSuccess } from '@/utils/Toast'

const AddTaskForm = () => {
    const { id } = useParams();

    const { members } = useMembers()
    const { epics } = useEpics()
    const [loading, setLoading] = useState(false)
    const { register, reset, watch, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(taskSchema) })
    const descritpionLenght = descriptionLengthChecker(watch("description"))


    const submitting = async (values: TaskFormData): Promise<void> => {
        const { title, description, assignee_id, epic_id, due_date, status } = { ...values }

        const payload: CreateTaskPayload = {
            "project_id": id,
            "title": title,
            "epic_id": epic_id || null,
            "description": description || null,
            "assignee_id": assignee_id || null,
            "due_date": due_date || null,
            "status": status
        }
        setLoading(true)
        try {
            const res = await createTask(payload)
            if (!res.ok) {
                const { msg }: { msg: string } = await res.json();
                ToastError(`Failed to create task ${msg}`)
                return
            }
            ToastSuccess("Project created successfully")
            reset()

        } catch (error) {
            ToastError(`Failed to create project`)
            console.error(error);
        }
        finally {
            setLoading(false)
        }

    }
    return (
        <div className=' w-full rounded-sm'>
            <form onSubmit={handleSubmit(submitting)} className='flex flex-col gap-4' >
                <div className='flex flex-col gap-6 '>
                    <InputLayout>
                        <Label
                            htmlFor='title'
                            text='task title'
                        />
                        <Input
                            {...register("title")}
                            name="title"
                            placeholder='eg. Change the layout'
                            className='bg-surface-highest'
                        />
                        <InputErrorAlert message={errors.title && errors.title.message} />
                    </InputLayout>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <InputLayout>
                            <Label
                                htmlFor='status'
                                text='status'
                            />
                            <select
                                defaultValue={taskStatus["TO DO"]}
                                {...register("status")}
                                className=' bg-surface-highest p   p-3.5 w-full rounded-sm' name="status" id="status">
                                {taskStatusDisaply.map((status) => <option value={taskStatus[status]}>{status}</option>
                                )}
                            </select>


                        </InputLayout>
                        <InputLayout>
                            <Label
                                htmlFor='assignee'
                                text='assignee'
                            />
                            <select
                                id="assignee"
                                // name="assignee_id"
                                {...register("assignee_id")}
                                className=' bg-surface-highest p-3.5 w-full rounded-sm' >
                                <option value="">Select Memeber</option>
                                {members.map((member) => <option value={member.user_id}>{member.metadata.name}</option>
                                )}
                            </select>
                        </InputLayout>
                    </div>
                    <InputLayout className='lg:col-span-2'>
                        <Label
                            htmlFor='epic'
                            text='epic'
                        />
                        <select
                            id="epic"
                            {...register("epic_id")}
                            className='bg-surface-highest p-3.5 w-full rounded-sm'
                        >
                            <option value="">Select Epic</option>

                            {epics.map((epic) => <option className='bg-orange-400' value={epic.id}>{epic.epic_id}{" - "}{epic.title}</option>
                            )}
                        </select>
                    </InputLayout>


                    <InputLayout className='lg:col-span-2'>
                        <Label
                            htmlFor='due_date'
                            text='due date'
                        />
                        <Input
                            {...register("due_date")}
                            id="due_date"
                            name="due_date"
                            type="datetime-local"

                            className=' bg-surface-highest p-3.5 w-full rounded-sm'
                        />
                    </InputLayout>


                    <InputLayout className='lg:col-span-2'>
                        <Label
                            htmlFor='description'
                            text='DESCRIPTION'
                        />

                        <textarea
                            {...register("description")}
                            name="description"
                            placeholder="Describe the scope and objectives of this epic..."
                            className=' py-2 ps-4 pe-9 bg-surface-highest w-full h-37 rounded-sm'
                        />

                        <div className='grid grid-cols-2 items-center justify-between w-full'>
                            <InputErrorAlert message={errors.description && errors.description.message} />
                            <p className={cn('ms-auto text-slate-mid     text-xs flex items-center justify-end  w-full', descritpionLenght > 500 && "text-red-600")}>
                                {descritpionLenght + ` / 500`} <span className='lg:inline-block mx-1 hidden'>characters</span>
                            </p>

                        </div>
                    </InputLayout>

                    <div className='flex flex-col-reverse lg:flex-row items-center justify-end py-4 gap-4'>
                        <Button variant="ghost" className='w-full lg:w-fit rounded-sm'>
                            <Link to={"/project"}>Back</Link>
                        </Button>

                        {!loading ? <input
                            value={loading ? "Loading creating task" : "Create task"}
                            type='submit'
                            className='bg-primary text-white w-full lg:w-fit px-4 py-3 cursor-pointer hover:bg-primary-container rounded-sm '
                            disabled={loading} />
                            :
                            <div className='flex items-center justify-center gap-2' >
                                <Spinner />
                                <p>Loading</p>
                            </div>
                        }

                    </div>
                </div>
            </form >
        </div >

    )
}

export default AddTaskForm