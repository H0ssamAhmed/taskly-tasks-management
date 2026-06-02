import { cn } from '@/lib/utils';
import React from 'react'

interface InputProps {
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    name?: string;
    required?: boolean;
    className?: string;

}
const Input = ({
    type = 'text',
    value = '',
    onChange = () => { },
    placeholder = '',
    name = '',
    className = '',
    required = false
}: InputProps) => {
    return (
        <input
            id={name}
            className={cn('w-full p-2 ps-4 bg-surface-highest rounded-sm', className)}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
        />
    )
};

export default Input;