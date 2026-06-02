import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    type = 'text',
    className = '',
    name,
    ...props
}, ref) => {
    return (
        <input
            ref={ref}
            id={name}
            name={name}
            className={cn('w-full py-2 ps-4 pe-9 bg-surface-highest rounded-sm', className)}
            type={type}
            {...props}
        />
    )
});

Input.displayName = "Input";
export default Input;