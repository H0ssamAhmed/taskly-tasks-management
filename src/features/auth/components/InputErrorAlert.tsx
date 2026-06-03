import { cn } from '@/lib/utils';
import React from 'react'
interface InputErrorAlertProps {
    message?: string;
    className?: string
    ;
}
const InputErrorAlert = ({ message, className }: InputErrorAlertProps) => {
    return (
        <p className={cn('error text-error  px-1 h-4.5 w-full', className)}>{message}</p>
    )
}

export default InputErrorAlert