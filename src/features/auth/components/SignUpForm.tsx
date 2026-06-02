
import Input from '@/Shared/UI/Input'
import Label from '@/Shared/UI/Label'
import InputLayout from './InputLayout';
import InputErrorAlert from './InputErrorAlert';
import { Button } from '@/Shared/UI/Button';
import { IconDisplayer } from '@/Shared/UI/IconDisplayer';
import InputIcon from './InputIcon';
import { useState } from 'react';
import RuleRow from './RuleRow';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordRules, signUpSchema } from '../schema/singUp';
import { Link } from 'react-router-dom';


const SignUpForm = () => {
    const
        { register,
            watch,
            handleSubmit,
            formState: { errors, } }
            = useForm({
                resolver: zodResolver(signUpSchema),
                defaultValues: {
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    jobTitle: "",
                },
            })


    const passwordValue = watch("password") || "";
    console.log(passwordValue);

    const [showpass, setShowPass] = useState(false)
    const showpasshandle = () => {


        setShowPass(!showpass)
    }


    const submitting = (values) => {

        console.log(values);

    }
    return (
        <div className='p-12 flex flex-col bg-white items-center justify-center gap-2 bg-ora nge-400 lg:max-w-xl w-full'>
            <div className='pb-10 flex flex-col gap-2'>
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
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <InputLayout className='relative'>
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

                    </InputLayout>

                    <InputLayout>
                        <Label
                            htmlFor='confirm-password'
                            text='Confirm Password'
                        />
                        <Input
                            {...register("confirmPassword")}
                            type={showpass ? "text" : "password"}
                            name='confirm-password'
                            placeholder='Repeat your Password'
                        />
                    </InputLayout>

                    <div className='p-4 flex flex-col gap-2 bg-surface-highest col-span-2'>
                        <RuleRow
                            icon={PasswordRules(passwordValue).length ? "CheckedIcon" : "UncheckedIcon"}
                            text='At least 8 characters'
                        />
                        <RuleRow
                            icon={PasswordRules(passwordValue).mixed ? "CheckedIcon" : "UncheckedIcon"}
                            text='One uppercase, lowercase, and digit'
                        />
                        <RuleRow
                            icon={PasswordRules(passwordValue).special ? "CheckedIcon" : "UncheckedIcon"}
                            text='One special character'
                        />
                    </div>

                    <div className='w-full col-span-2'>
                        <Button variant='primary' className='w-full'>
                            <Input type='submit' value='Create Workspace' className='hidden' />
                            Create account
                        </Button>
                    </div>
                </div>
            </form>
            <p className='text-slate-mid'>Already have an account?  <Link className='text-primary font-bold' to="/sign-in">Log in</Link></p>
        </div>
    );
};

export default SignUpForm;



