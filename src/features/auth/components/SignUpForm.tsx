
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
import { Link } from 'react-router-dom';
import type { SignUpPayload } from '../schema/types';
import { singUp } from '../services/SingUp';
import { cn } from '@/lib/utils';
import Spinner from '@/Shared/UI/Spinner'

const SignUpForm = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { register, watch, handleSubmit, formState: { errors, } } = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            jobTitle: "",
        },
    })


    const rules = PasswordRules(watch("password"))
    const [showpass, setShowPass] = useState(false)
    const showpasshandle = () => {


        setShowPass(!showpass)
    }


    const submitting = async (values) => {
        setLoading(true)
        const payloadData: SignUpPayload = {
            email: values.email,
            password: values.password,
            data: {
                name: values.name,
                department: values.jobTitle
            },
        }
        try {
            const res = await singUp(payloadData)
            console.log(res);

            const result = await res.json();
            console.log(result);
        } catch (error) {
            console.log(error);
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
            <form onSubmit={handleSubmit(submitting)} className='  p-4 w-full grid grid-cols-1 gap-1  '>

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
                        htmlFor='title'
                        text='Job Title (Optional)'
                    />
                    <Input
                        {...register("jobTitle")}
                        type='text'
                        name='title'
                        placeholder='eg. Project Manager'
                    />
                    <InputErrorAlert message={errors.jobTitle && errors.jobTitle.message} />

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
                        <InputErrorAlert />

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

                    <div className={cn('w-full col-span-2 h-12 flex items-center justify-center  hover:bg-primary-container rounded-sm bg-primary  text-white cursor-pointer p-4', loading && "opacity-50 cursor-not-allowed")}>
                        {!loading ? <Input
                            value={loading ? "Loading creating account" : "Create account"}
                            type='submit'
                            className='bg-primary cursor-pointer hover:bg-primary-container'
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



