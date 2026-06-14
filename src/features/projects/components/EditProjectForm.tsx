
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import CheckIcon from '@/assets/svgs/CheckIcon'
import InputLayout from '@/features/auth/components/InputLayout'
import InputErrorAlert from '@/features/auth/components/InputErrorAlert'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ToastError, ToastSuccess } from '@/utils/Toast'
import { cn } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { descriptionLengthChecker, projectSchema } from '../schema/Project.schema'
import type { EditProjectPayLoad } from '../schema/types'
import { fetchProjectById } from '@/features/projects/slice/projectDetailsSlice'
import { updatePrpject } from '../services/ProjectsApi'
import ProjectFormSkeleton from './ProjectFormSkeleton'
import Label from '@/shared_temp/UI/Label'
import Input from '@/shared_temp/UI/Input'
import { Button } from '@/shared_temp/UI/Button'

const EditProjectForm = () => {
    const { id } = useParams()
    const [isSubmitting, setisSubmitting] = useState(false)
    const dispatch = useAppDispatch()
    const { data, status, loading } = useAppSelector((state) => state.ProjectDetails)

    const { register, reset, watch, handleSubmit, formState: { errors, } } = useForm({
        resolver: zodResolver(projectSchema),
    })

    useEffect(() => {
        if (id && status == "idle") {
            dispatch(fetchProjectById(id))
        }
    }, [id, dispatch])


    useEffect(() => {
        if (status == "success") {
            reset({
                name: data?.name,
                description: data?.description,
            })
        }
    }, [status])

    const descritpionLenght = descriptionLengthChecker(watch("description"))

    const submitting = async (values: { name: string, description: string }): Promise<void> => {
        setisSubmitting(true)
        const payload: EditProjectPayLoad = {
            id: id!,
            name: values.name,
            description: values.description
        }
        try {
            const res = await updatePrpject({ id: id!, payload })
            if (!res.ok) {
                const { msg }: { msg: string } = await res.json();
                ToastError(`Failed to update project ${msg}`)
                return
            }
            ToastSuccess("Project updated successfully")
            dispatch(fetchProjectById(id!))
        } catch (error) {
            ToastError(`Failed to update project`)
            console.error(error);
        }
        finally {
            setisSubmitting(false)

        }
    }
    if (loading) {
        return <ProjectFormSkeleton />
    }
    return (
        <div className='py-4 md:px-2 lg:px-8 w-full rounded-sm'>
            <div className='py-4'>
                <div className='flex items-center justify-start gap-4 pt-8 pb-10 bg-white '>
                    <div className='rounded-sm bg-surface-low p-2'>
                        <CheckIcon className='w-5.5 h-5' />
                    </div>
                    <div>
                        <h2 className="font-semibold text-2xl">Edit Project</h2>
                        <p className='body-md text-slate-mid'>Define the scope and foundational details of your project.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(submitting)}
                    className='flex flex-col gap-4 pt-8'
                >
                    <div
                        className='flex flex-col gap-6 '

                    >
                        <InputLayout>
                            <Label
                                htmlFor='title'
                                text='Project TITLE'
                                requied={true}
                            />
                            <Input
                                {...register("name")}
                                name="name"
                                placeholder='eg. Change the layout'
                                className='bg-surface-highest'
                            />
                            <InputErrorAlert message={errors.name && errors.name.message} />
                        </InputLayout>
                        <InputLayout>
                            <Label
                                htmlFor='description'
                                text='DESCRIPTION'
                            />
                            <textarea
                                {...register("description")}
                                name="description"
                                placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
                                className=' py-2 ps-4 pe-9 bg-surface-highest w-full h-37 rounded-sm'

                            />
                            <div className='flex items-center justify-between w-full'>
                                <InputErrorAlert message={errors.description && errors.description.message} />
                                <p className={cn('ms-auto text-slate-mid text-xs flex items-center justify-end w-1/3', descritpionLenght > 500 && "text-red-600")}>
                                    {descritpionLenght + ` / 500`} <span className='lg:inline-block mx-1 hidden'>characters</span>

                                </p>

                            </div>
                        </InputLayout>
                    </div>
                    <div className='flex flex-col lg:flex-row items-center justify-between py-4 gap-4'>
                        <Button role="complementary" variant="ghost" className='w-full lg:w-fit rounded-sm'>
                            <Link type="bytton" to={"/project"}>Cancel</Link>
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            className='bg-primary text-white w-full lg:w-fit px-4 py-3 cursor-pointer hover:bg-primary-container rounded-sm '

                        >
                            {isSubmitting ? "Loading" : "Update Project"}
                        </Button>


                    </div>
                </form>
            </div>

        </div>
    )
}

export default EditProjectForm


