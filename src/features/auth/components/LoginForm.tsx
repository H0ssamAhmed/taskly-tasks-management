import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { logInSchema } from '../schema/logIn'
import InputLayout from './InputLayout'
import Label from '@/Shared/UI/Label'
import Input from '@/Shared/UI/Input'
import InputErrorAlert from './InputErrorAlert'
import InputIcon from './InputIcon'
import { IconDisplayer } from '@/Shared/UI/IconDisplayer'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import Spinner from '@/Shared/UI/Spinner'
import type { loginInPayload } from '../schema/types'
import { loginIn } from '../services/logIn'
import { setCookie } from '../services/session'

const LoginForm = () => {
    const navegator = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [showpass, setShowPass] = useState(false)
    const [error, setError] = useState("")
    const showpasshandle = () => setShowPass(!showpass)
    const { register, handleSubmit, formState: { errors, } } = useForm({
        resolver: zodResolver(logInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })


    const submitting = async (values) => {
        setLoading(true)
        const payloadData: loginInPayload = {
            email: values.email,
            password: values.password,
        }

        try {
            const res = await loginIn(payloadData)
            if (!res.ok) {
                const { msg }: { msg: string } = await res.json();
                setError(msg)
                return
            }

            const result = await res.json();
            console.log(result);
            setCookie("access_token", result.access_token, 1);
            setCookie("refresh_token", result.refresh_token, 7);
            navegator('/')

        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false)
        }

    }
    return (
        <div className='p-12 flex flex-col bg-white items-center justify-center gap-2 w-full lg:max-w-xl'>
            <div className='flex flex-col items-start lg:items-center gap-2 w-full'>
                <h1 className='headline-lg'>Welcome Back</h1>
                <p className='body-md'>Please enter your details to access your workspace</p>
            </div>
            <div className={cn('bg-error/20 p-2 w-full flex items-center justify-center rounded-xl opacity-0', error && "opacity-100")}>
                <InputErrorAlert message={error} className='text-center' />
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

                <InputLayout className='relative '>
                    <Label
                        htmlFor='password'
                        text='password'
                    />
                    <Input
                        {...register("password")}
                        type={showpass ? "text" : "password"}
                        name='password'
                        placeholder='Password'
                    />
                    <InputIcon >
                        <IconDisplayer
                            onClick={showpasshandle}
                            name='EyeIcon' width={22} height={15} />
                    </InputIcon>
                    <InputErrorAlert message={errors.password && errors.password.message} />


                </InputLayout>

                <div className='grid grid-cols-2 '>
                    <InputLayout className='flex-row justify-start items-center '>
                        <Input
                            type='checkbox'
                            className='w-fit'
                        />
                        <Label
                            htmlFor='remember-me'
                            text='Remember Me'
                        />
                    </InputLayout>
                    <Link className='text-primary text-end' to="/forget-password"> Forget Password?</Link>
                </div>
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

            </form>
            <p className='text-slate-mid top-80'>Don't have an account?   <Link className='text-primary font-bold' to="/sign-up">Sign Up</Link></p>
        </div>
    )
}

export default LoginForm