import React, { useState } from 'react'
import InputErrorAlert from './InputErrorAlert'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import Label from '@/Shared/UI/Label'
import InputLayout from './InputLayout'
import Input from '@/Shared/UI/Input'
import { Link, useNavigate } from 'react-router-dom'
import { ForgotPasswordSchema } from '../schema/ForgotPassword'
import type { Email } from '../schema/types'
import Spinner from '@/Shared/UI/Spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconDisplayer } from '@/Shared/UI/IconDisplayer'
import { Button } from '@/Shared/UI/Button'

export const ForgetPasswordForm = () => {
    const navegator = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState("")
    const { register, handleSubmit, formState: { errors, } } = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })
    const submitting = async (values) => {
        // setLoading(true)
        // const payloadData: {email:Email} = {
        //     email: values.email,
        // }
        // try {
        //     const res = await loginIn(payloadData)
        //     if (!res.ok) {
        //         const { msg }: { msg: string } = await res.json();
        //         setError(msg)
        //         return
        //     }
        //     const result = await res.json();

        //     navegator('/')

        // } catch (error) {
        //     console.error(error);
        // }
        // finally {
        //     setLoading(false)
        // }

    }
    return (
        <div className='p-4'>
            <div className='p-8 flex flex-col bg-white items-center justify-center gap-2 w-full lg:max-w-xl'>
                <div className='w-12 h-12 flex items-center justify-center lg:hidden bg-surface-low rounded-2xl mb-6 '>
                    <IconDisplayer name='Lock' width={20} height={20} className='my-8' />

                </div>
                <div className='flex flex-col items-center lg:items-start gap-2 w-full'>
                    <h1 className='headline-lg'>Forgot password?</h1>
                    <p className='body-md'>No worries, we'll send you reset instructions.</p>
                </div>

                <form onSubmit={handleSubmit(submitting)} className='p-4 w-full flex flex-col gap-4 mb-4'>
                    <InputLayout>
                        <Label
                            htmlFor='email'
                            text='EMAIL'
                        />
                        <Input
                            {...register("email")}

                            type='text'
                            name='email'
                            placeholder="yourname@company.com"
                        />
                        <InputErrorAlert message={errors.email && errors.email.message} />
                    </InputLayout>


                    <div className={cn('w-full col-span-2 h-12 flex items-center justify-center  hover:bg-primary-container rounded-sm  text-white cursor-pointer',
                        loading && "opacity-50 cursor-not-allowed")}>
                        {!loading ? <Input
                            value={loading ? "Loggin in" : "Log In"}
                            type='submit'
                            className='bg-primary cursor-pointer hover:bg-primary-container h-full w-full'
                            disabled={loading} />
                            :
                            <div className='flex items-center justify-center gap-2' >
                                <Spinner />
                                <p>Loading</p>
                            </div>
                        }
                    </div>

                    <Link className='text-primary text-center font-bold' to="/sign-in">
                        <IconDisplayer width={16} height={16} name='Arrow' className='w-4 h-4 mx-2' />
                        Back to log in
                    </Link>
                </form>
                <div className='p-8 w-full opacity-20 hidden lg:block'>
                    <hr />
                </div>
                <LgResendBox />
            </div>
            <SmResendBox />

        </div>

    )
}

const LgResendBox = () => {
    return (
        <div className='hidden lg:block'>
            <div className=' py-2 px-8 bg-success/20 flex items-start justify-center gap-2'>
                <IconDisplayer name="CheckedIcon" />
                <p className="body-md">If an account exists with this email, we’ve sent a password reset link.</p>
            </div>
            <div className=' p-4 flex flex-col items-center justify-center gap-3'>
                <p className="body-md">Didn't receive the email?</p>
                <Button className='w-full' variant="secondary">
                    <IconDisplayer width={16} height={16} name='Alarm' className='w-4 h-4 mx-2' />

                    Resend in 05:00</Button>
            </div>
        </div>


    )
}
const SmResendBox = () => {
    return (
        <div className='block lg:hidden py-8 w-full'>
            <div className='py-2 px-8 bg-success/20 flex flex-col items-start justify-center gap-4'>
                <div className='flex items-start justify-center gap-2'>
                    <IconDisplayer name="CheckedIcon" />
                    <p className="body-md">If an account exists with this email, we’ve sent a password reset link.</p>
                </div>
                <div className='py-4 w-full opacity-20'>
                    <hr />
                </div>
                <div className=' flex items-center justify-between gap-3 w-full'>
                    <p className="body-md">Didn't receive the email?</p>
                    <Button className='text-sm text-primary' variant="ghost">
                        <IconDisplayer width={16} height={16} name='Alarm' className='w-4 h-4 mx-2' />
                        Resend in 05:00
                    </Button>
                </div>
            </div>
        </div>


    )
}