import { useState } from 'react'
import InputLayout from './InputLayout'
import Label from '@/Shared/UI/Label'
import Input from '@/Shared/UI/Input'
import InputErrorAlert from './InputErrorAlert'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordRules, resetPasswordSchema, type ResetPassword, type ResetPasswordPayload } from '../schema/ResetPassword'

import InputIcon from './InputIcon'
import { IconDisplayer } from '@/Shared/UI/IconDisplayer'
import Spinner from '@/Shared/UI/Spinner'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import RuleRow from './RuleRow'
import { resetPassword } from '../services/ResetPassoword'
import { ToastError, ToastSuccess } from '@/utils/Toast'
import { ACCESS_TOKEN_KEY } from '@/utils/constants/CookieStrings'

const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams()
    const navigator = useNavigate()

    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })
    const rules = PasswordRules(watch("password"))
    const urlToken = searchParams.get(ACCESS_TOKEN_KEY);

    const [showpass, setShowPass] = useState(false)
    const showpasshandle = () => setShowPass(!showpass)
    const submitting = async (values: ResetPassword): Promise<void> => {
        setLoading(true)
        const payloadData: ResetPasswordPayload = {
            password: values.password,
            access_token: urlToken
        }
        console.log(payloadData);
        resetPassword(payloadData)
        try {
            const res = await resetPassword(payloadData)
            if (!res.ok) {
                const { msg }: { msg: string } = await res.json();
                ToastError(msg || "Network error")

                return
            }
            const result = await res.json();
            ToastSuccess("Your password has been updated successfully. You can now log in")
            console.log(result);
            setTimeout(() => {
                navigator('/sign-in')
            }, 3000);




        } catch (error) {
            ToastError("Network error")
            console.error(error);
        }
        finally {
            setLoading(false)
        }


    }
    return (
        <div className='p-6 flex flex-col bg-white items-center justify-center gap-2 w-full lg:max-w-xl'>
            <div className='pb-10 flex flex-col items-start lg:items-center gap-2 w-full'>
                <h1 className='headline-lg'>Create a New Password</h1>
                <p className='body-md'>Create a new, strong password to secure your workstation
                    access.</p>
            </div>
            <form
                onSubmit={handleSubmit(submitting)}
                className='p-4 w-full flex flex-col gap-4  '>
                <InputLayout className='relative '>
                    <Label
                        htmlFor='password'
                        text='New Password'
                    />
                    <Input
                        {...register("password")}
                        type={showpass ? "text" : "password"}
                        name='password'
                        placeholder='Password'
                        className='bg-surface-low px-4 py-3'
                    />
                    <InputIcon >
                        <IconDisplayer
                            onClick={showpasshandle}
                            name='EyeIcon' width={22} height={15} />
                    </InputIcon>
                    <InputErrorAlert message={errors.password && errors.password.message} />
                </InputLayout>

                <InputLayout>
                    <Label
                        htmlFor='confirmPassword'
                        text='Confirm Password'
                    />
                    <Input
                        {...register("confirmPassword")}
                        type={showpass ? "text" : "password"}
                        name='confirmPassword'
                        placeholder='Repeat your Password'
                        className='bg-surface-low px-4 py-3'


                    />
                    <InputErrorAlert message={errors.confirmPassword && errors.confirmPassword.message} />
                </InputLayout>

                <div className='p-4 grid  grid-cols-l md:grid-cols-2 gap-4 bg-surface-low col-span-2'>
                    <RuleRow
                        icon={rules.length ? "CheckedIcon" : "UncheckedIcon"}
                        text='8-64 characters'
                    />
                    <RuleRow
                        icon={rules.lowercase ? "CheckedIcon" : "UncheckedIcon"}
                        text='Lowercase letter'
                    />
                    <RuleRow
                        icon={rules.special ? "CheckedIcon" : "UncheckedIcon"}
                        text='Special character'
                    />
                    <RuleRow
                        icon={rules.uppercase ? "CheckedIcon" : "UncheckedIcon"}
                        text='Uppercase letter'
                    />
                    <RuleRow
                        icon={rules.digit ? "CheckedIcon" : "UncheckedIcon"}
                        text='One digit'
                    />
                </div>

                <div className={cn('w-full bg-orange-200 h-12 flex items-center justify-center  hover:bg-primary-container rounded-sm  text-white cursor-pointer', loading && "opacity-50 cursor-not-allowed")}>
                    {!loading ? <Input
                        value={loading ? "Updating Passowrd" : "Update Password"}
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


            </form>
            <Link className='text-primary' to="/sign-in">Back to sign  in</Link>
        </div>
    )
}

export default ResetPasswordForm