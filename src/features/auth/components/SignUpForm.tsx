
import Input from '@/Shared/UI/Input'
import Label from '@/Shared/UI/Label'
import InputLayout from './InputLayout';
import InputErrorAlert from './InputErrorAlert';
import { IconDisplayer } from '@/Shared/UI/IconDisplayer';
import InputIcon from './InputIcon';
import { useState } from 'react';
import RuleRow from './RuleRow';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordRules, signUpSchema } from '../schema/singUp';
import { Link, useNavigate } from 'react-router-dom';
import type { SignUpPayload } from '../schema/types';
import { singUp } from '../services/SingUp';
import { cn } from '@/lib/utils';
import Spinner from '@/Shared/UI/Spinner'
import { setCookie } from '../../../utils/cookies';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/constants/CookieStrings';
import { ToastError } from '@/utils/Toast';

interface FormValues {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    department?: string,
}

const SignUpForm = () => {
    const navegator = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const { register, watch, handleSubmit, formState: { errors, } } = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            department: "",
        },
    })
    const rules = PasswordRules(watch("password"))
    const [showpass, setShowPass] = useState(false)
    const showpasshandle = () => setShowPass(!showpass)
    const [error, setError] = useState("")

    const submitting = async (values: FormValues): Promise<void> => {
        setLoading(true)
        console.log(values.department);

        const payloadData: SignUpPayload = {
            email: values.email,
            password: values.password,
            data: {
                name: values.name,
                department: values.department
            },
        }
        try {
            const res = await singUp(payloadData)
            if (!res.ok) {
                const { msg }: { msg: string } = await res.json();
                setError(msg)
                return
            }
            const result = await res.json();
            setCookie(ACCESS_TOKEN_KEY, result.access_token);
            setCookie(REFRESH_TOKEN_KEY, result.refresh_token);
            navegator('/')

        } catch (error) {
            ToastError("Network error")
            console.error(error);
        }
        finally {
            setLoading(false)
        }

    }

    return (
        <div className='p-12 flex flex-col bg-white items-center justify-center gap-2 w-full lg:max-w-xl'>
            <div className='pb-10 flex flex-col items-start lg:items-center gap-2 w-full'>
                <h1 className='headline-lg'>Create your workspace</h1>
                <p className='body-md'>Join the editorial approach to task management.</p>
            </div>
            <div className={cn('bg-error/20 p-2 w-full flex items-center justify-center rounded-xl opacity-0', error && "opacity-100")}>
                <InputErrorAlert message={error} className='text-center' />
            </div>
            <form onSubmit={handleSubmit(submitting)} className='p-4 w-full grid grid-cols-1 gap-1  '>

                <InputLayout>
                    <Label
                        htmlFor='name'
                        text='NAME'
                    />
                    <Input
                        {...register("name")}
                        type='text'
                        name='name'
                        placeholder='Enter your full  name'
                    />
                    <InputErrorAlert message={errors.name && errors.name.message} />

                </InputLayout>

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

                <InputLayout>
                    <Label
                        htmlFor='department'
                        text='Job Title (Optional)'
                    />
                    <Input
                        {...register("department")}
                        type='text'
                        name='department'
                        placeholder='eg. Project Manager'
                    />

                </InputLayout>
                <div className='flex flex-col lg:grid grid-cols-1  gap-4'>
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
                        />
                        <InputErrorAlert message={errors.confirmPassword && errors.confirmPassword.message} />
                    </InputLayout>

                    <div className='p-4 flex flex-col gap-2 bg-surface-highest col-span-2'>
                        <RuleRow
                            icon={rules.length ? "CheckedIcon" : "UncheckedIcon"}
                            text='At least 8 characters'
                        />
                        <RuleRow
                            icon={rules.mixed ? "CheckedIcon" : "UncheckedIcon"}
                            text='One uppercase, lowercase, and digit'
                        />
                        <RuleRow
                            icon={rules.special ? "CheckedIcon" : "UncheckedIcon"}
                            text='One special character'
                        />
                    </div>

                    <div className={cn('w-full col-span-2 h-12 flex items-center justify-center  hover:bg-primary-container rounded-sm  text-white cursor-pointer', loading && "opacity-50 cursor-not-allowed")}>
                        {!loading ? <Input
                            value={loading ? "Loading creating account" : "Create account"}
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


                </div>
            </form>
            <p className='text-slate-mid'>Already have an account?  <Link className='text-primary font-bold' to="/sign-in">Log in</Link></p>
        </div>
    );
};

export default SignUpForm;



