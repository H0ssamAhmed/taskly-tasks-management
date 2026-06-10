
import { AddProjectSchema, type AddProjectFormData } from '../schema/AddProject'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import CheckIcon from '@/assets/svgs/CheckIcon'
import InputLayout from '@/features/auth/components/InputLayout'
import Input from '@/Shared/UI/Input'
import Label from '@/Shared/UI/Label'
import InputErrorAlert from '@/features/auth/components/InputErrorAlert'
import { useState } from 'react'
import Spinner from '@/Shared/UI/Spinner'
import { Button } from '@/Shared/UI/Button'
import { Link } from 'react-router-dom'
import { ToastError, ToastSuccess } from '@/utils/Toast'
import { CreatPrpject } from '../services/projectApi'
import { cn } from '@/lib/utils'

const AddProjectForm = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const { register, reset, watch, handleSubmit, formState: { errors, } } = useForm({
        resolver: zodResolver(AddProjectSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    })
    const descritpionLenght = watch("description").replace(/\s+/g, ' ').length || 0




    const submitting = async (values: AddProjectFormData): Promise<void> => {
        setLoading(true)

        const payloadData: AddProjectFormData = {
            name: values.name,
            description: values.description
        }
        try {
            const res = await CreatPrpject(payloadData)
            if (!res.ok) {
                const { msg }: { msg: string } = await res.json();
                ToastError(`Failed to create project ${msg}`)
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
        <div className='py-4 md:px-2 lg:px-8 w-full rounded-sm'>
            <div className='py-4'>
                <div className='flex items-center justify-start gap-4 pt-8 pb-10 bg-white '>
                    <div className='rounded-sm bg-surface-low p-2'>
                        <CheckIcon className='w-5.5 h-5' />
                    </div>
                    <div>
                        <h2 className="font-semibold text-2xl">Initialize New Project</h2>
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
                        <Button variant="ghost" className='w-full lg:w-fit bg-green-400'>
                            <Link to={"/project"}>Back</Link>
                        </Button>

                        {!loading ? <input
                            value={loading ? "Loading creating project" : "Create Project"}
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
                </form>
            </div>

        </div>
    )
}

export default AddProjectForm