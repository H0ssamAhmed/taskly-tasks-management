import { useState } from 'react'
import InputErrorAlert from './InputErrorAlert'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import InputLayout from './InputLayout'
import { Link } from 'react-router-dom'
import { ForgotPasswordSchema } from '../schema/ForgotPassword'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordReset } from '../services/ForgerPassword'
import type { Email } from '../schema/types'
import { ToastError } from '@/utils/Toast'
import { IconDisplayer } from '@/shared/UI/IconDisplayer'
import Label from '@/shared/UI/Label'
import Input from '@/shared/UI/Input'
import Spinner from '@/shared/UI/Spinner'
import { Button } from '@/shared/UI/Button'

export const ForgetPasswordForm = () => {
    // const navegator = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [isEmailSent, setIsEmailSent] = useState(false)
    const [isCounterWork, setIsCounterWork] = useState(false)
    const [countValue, setCountValue] = useState("")
    const { register, handleSubmit, getValues, formState: { errors, } } = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })
    const submitting = async (values: { email: string }) => {
        setLoading(true)
        const payloadData: { email: Email } = {
            email: values.email,
        }
        try {
            const res = await passwordReset(payloadData)
            if (!res.ok) {
                const { msg }: { msg: string } = await res.json();
                ToastError(msg || "Network error")
                return
            }
            await res.json();
            startCountdown(1);

            setIsEmailSent(true)
        } catch (error) {
            ToastError("Network error")
            console.error(error);
            setIsEmailSent(false)


        }
        finally {
            setLoading(false)
        }
        setLoading(false)
    }
    const handleResend = () => {
        const email = getValues("email");
        submitting({ email });
    };
    const startCountdown = (minutes: number) => {
        setIsCounterWork(true)
        let totalSeconds = minutes * 60;

        const intervalId = setInterval(() => {
            const mins = Math.floor(totalSeconds / 60);
            const secs = totalSeconds % 60;

            const NewcountValue = (`${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`);
            setCountValue(NewcountValue)

            totalSeconds--;
            if (totalSeconds < 0) {
                clearInterval(intervalId);
                setIsCounterWork(false)


            }
        }, 1000);
    }

    return (
        <form onSubmit={handleSubmit(submitting)} className='p-4 w-md lg:w-lg'>
            <div className='p-8 flex flex-col bg-white items-center justify-center gap-2 w-full lg:max-w-xl'>
                <div className='w-12 h-12 flex items-center justify-center lg:hidden bg-surface-low rounded-2xl mb-6 '>
                    <IconDisplayer name='Lock' width={20} height={20} className='my-8' />

                </div>
                <div className='flex flex-col items-center lg:items-start gap-2 w-full'>
                    <h1 className='headline-lg'>Forgot password?</h1>
                    <p className='body-md'>No worries, we'll send you reset instructions.</p>
                </div>

                <div className='p-4 w-full flex flex-col gap-4 mb-4'>
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
                            role="button"
                            value={loading ? "Loading" : "Send Reset Link"}
                            type='submit'
                            className={cn('bg-primary cursor-pointer hover:bg-primary-container h-full w-full',
                                loading && "opacity-50 hover:bg-primary/50"
                            )}
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
                </div>
                {isEmailSent &&
                    <>
                        <div className='p-8 w-full opacity-20 hidden lg:block'>
                            <hr />
                        </div>
                        <LgResendBox
                            reSubmit={handleResend}
                            count={countValue} disabled={isCounterWork} />
                    </>

                }
            </div>
            {isEmailSent && <SmResendBox
                reSubmit={handleResend}

                count={countValue} disabled={isCounterWork} />}

        </form>

    )
}

interface ResendBox {
    reSubmit: () => void,
    count: string,
    disabled: boolean
}
const LgResendBox = ({ reSubmit, count, disabled }: ResendBox) => {


    return (
        <div className='hidden lg:block'>
            <div className=' py-2 px-8 bg-success/20 flex items-start justify-center gap-2'>
                <IconDisplayer name="CheckedIcon" />
                <p className="body-md">If an account exists with this email, we’ve sent a password reset link.</p>
            </div>
            <div className=' p-4 flex flex-col items-center justify-center gap-3'>
                <p className="body-md">Didn't receive the email?</p>
                <Button className='w-full' variant="secondary"
                    disabled={disabled}
                    onClick={() => reSubmit}

                >
                    <IconDisplayer width={16} height={16} name='Alarm' className='w-4 h-4 mx-2' />

                    Resend in {count}</Button>
            </div>
        </div>


    )
}
const SmResendBox = ({ reSubmit, count, disabled }: ResendBox) => {
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
                    <Button
                        className='text-sm text-primary'
                        variant={disabled ? "ghost" : "secondary"}
                        onClick={() => reSubmit}
                        disabled={disabled}

                    >
                        <IconDisplayer width={16} height={16} name='Alarm' className='w-4 h-4 mx-2' />
                        Resend in {count}
                    </Button>
                </div>
            </div>
        </div>


    )
}