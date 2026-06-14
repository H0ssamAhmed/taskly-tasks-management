import InputLayout from '@/features/auth/components/InputLayout'
import Input from '@/shared/UI/Input'
import Label from '@/shared/UI/Label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { epicSchema, type EpicFormData } from '../schema/EpicScehma'
import { descriptionLengthChecker } from '../schema/Project.schema'
import InputErrorAlert from '@/features/auth/components/InputErrorAlert'
import { cn } from '@/lib/utils'
import { Button } from '@/shared/UI/Button'
import { Link } from 'react-router-dom'

const NewEpicForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(epicSchema),
    })
    const [isSubmitting, setisSubmitting] = useState(false)

    const today = new Date().toISOString().split('T')[0];
    const descritpionLenght = descriptionLengthChecker(watch("description"))

    const submitting = async (values: EpicFormData): Promise<void> => {
        console.log(values);


        setisSubmitting(false)
        // const payload: EditProjectPayLoad = {
        //     id: id!,
        //     name: values.name,
        //     description: values.description
        // }
        // try {
        //     const res = await updatePrpject({ id: id!, payload })
        //     if (!res.ok) {
        //         const { msg }: { msg: string } = await res.json();
        //         ToastError(`Failed to update project ${msg}`)
        //         return
        //     }
        //     ToastSuccess("Project updated successfully")
        //     dispatch(fetchProjectById(id!))
        // } catch (error) {
        //     ToastError(`Failed to update project`)
        //     console.error(error);
        // }
        // finally {
        //     setisSubmitting(false)

        // }
    }
    return (

        <form onSubmit={handleSubmit(submitting)} className='w-full flex flex-col gap-4'>
            <InputLayout className='grid grid-cols-1 lg:grid-cols-3 my-6 items-start'>
                <Label
                    htmlFor='title'
                    text='TITLE'
                    requied={true}
                />
                <div className='col-span-2 '>
                    <Input
                        {...register("title")}
                        name="title"
                        placeholder='eg. Change the layout'
                        className='bg-surface-highest w-full'
                    />
                    <InputErrorAlert className='col-start-2 my-2' message={errors.title && errors.title.message} />
                </div>
            </InputLayout>
            <InputLayout className='grid grid-cols-1 lg:grid-cols-3 my-6 items-start'>
                <Label
                    htmlFor='description'
                    text='DESCRIPTION'
                />
                <div className='col-span-2 '>
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
                </div>
            </InputLayout>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                <InputLayout className='grid grid-cols-1 my-6 items-start'>
                    <Label
                        htmlFor='assionee'
                        text='Assignee'

                    />
                    <div className='col-span-2'>
                        <select className='w-full py-3  appearance-none  ps-4 pe-9 bg-surface-highest rounded-sm'
                            {...register("assignee")}
                        >
                            <option value="">Select Memeber</option>
                            <option value="Pepk;dmfsdkla">Select Memeber</option>
                            <option value="32546789 ">Select Memeber</option>

                        </select>
                    </div>
                </InputLayout>
                <InputLayout className='grid grid-cols-1 my-6 items-start'>
                    <Label
                        htmlFor='deadline'
                        text='DEADLINE'

                    />
                    <div className='col-span-2 '>
                        <Input
                            type="date"
                            min={today}
                            {...register("deadline")}
                            name="deadline"
                            placeholder='eg. Change the layout'
                            className='bg-surface-highest w-full'
                        />

                    </div>
                </InputLayout>
            </div>

            <div className='ms-auto my-4 flex items-center justify-end gap-4' >
                <Link to={"/"}>
                    <Button disabled={isSubmitting} variant="secondary">Cancel</Button>
                </Link>
                <Button disabled={isSubmitting} variant="primary">Create Epic</Button>
            </div>

        </form>
    )
}

export default NewEpicForm