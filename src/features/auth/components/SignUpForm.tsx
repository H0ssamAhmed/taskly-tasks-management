
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
import { signUpSchema } from '../schema/singup';


const SignUpForm = () => {
    const { register,
        handleSubmit,
        formState: { errors } } = useForm({
            resolver: zodResolver(signUpSchema),
            defaultValues: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                jobTitle: "",
            },
        })

    const [showpass, setShowPass] = useState(false)
    const showpasshandle = () => setShowPass(!showpass)


    const submitting = (values) => {

        console.log(values);

    }
    return (
        <div className='p-12 flex flex-col items-center justify-center gap-2 bg-ora nge-400 lg:max-w-xl w-full'>
            <div className='pb-10'>

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
                            type={showpass ? "text" : "password"}
                            name='confirm-password'
                            placeholder='Repeat your Password'
                        />
                    </InputLayout>
                    <div className='col-span-2'>
                        <InputErrorAlert message={errors.confirmPassword && errors.confirmPassword.message} />

                    </div>


                </div>

                <div className='p-4 flex flex-col gap-2'>
                    <RuleRow
                        icon={"CheckedIcon"}
                        text='At least 8 characters'
                    />
                    <RuleRow
                        icon={"UncheckedIcon"}
                        text='One uppercase, lowercase, and digit'
                    />
                    <RuleRow
                        icon={"UncheckedIcon"}
                        text='One special character'
                    />
                </div>

                <Button variant='primary'>
                    <Input type='submit' value='Create Workspace' className='hidden' />
                    Create account
                </Button>
            </form>
        </div>
    );
};

export default SignUpForm;



