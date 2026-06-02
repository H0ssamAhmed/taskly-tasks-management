
import Input from '@/Shared/UI/Input'
import Label from '@/Shared/UI/Label'
import InputLayout from './InputLayout';
import InputErrorAlert from './InputErrorAlert';
import { Button } from '@/Shared/UI/Button';
import { IconDisplayer } from '@/Shared/UI/IconDisplayer';
import InputIcon from './InputIcon';
import { useState } from 'react';
import RuleRow from './RuleRow';


const SignUpForm = () => {
    const [showpass, setShowPass] = useState(false)
    const showpasshandle = () => setShowPass(!showpass)
    return (
        <div className='p-12 flex flex-col items-center justify-center gap-2 bg-ora nge-400 lg:max-w-xl w-full'>
            <div className='pb-10'>

                <h1 className='headline-lg'>Create your workspace</h1>
                <p className='body-md'>Join the editorial approach to task management.</p>
            </div>
            <form className='  p-4 w-full grid grid-cols-1 gap-1  '>

                <InputLayout>
                    <Label
                        htmlFor='NAME'
                        text='NAME'
                    />
                    <Input
                        type='text'
                        name='NAME'
                        placeholder='Enter your full  name'
                        onChange={() => { }}
                    />
                    <InputErrorAlert />
                </InputLayout>

                <InputLayout>
                    <Label
                        htmlFor='EMAIl'
                        text='EMAIL'
                    />
                    <Input

                        type='text'
                        name='EMAIl'
                        placeholder='Enter your full  name'
                        onChange={() => { }}
                    />
                    <InputErrorAlert />
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
                        onChange={() => { }}
                    />
                    <InputErrorAlert />

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
                            value='password'
                            placeholder='Password'
                            onChange={() => { }}
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
                            htmlFor='confirm-password'
                            text='Confirm Password'
                        />
                        <Input
                            type={showpass ? "text" : "password"}
                            name='confirm-password'
                            value='confirm password'
                            placeholder='Repeat your Password'
                            onChange={() => { }}
                        />
                        <InputErrorAlert />
                    </InputLayout>
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



