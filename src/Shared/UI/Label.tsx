import { cn } from '@/lib/utils';
import React from 'react'

interface LabelProps {
    htmlFor?: string;
    text?: string;
    className?: string;
    children?: React.ReactNode;
    requied: boolean
}
const Label = ({ htmlFor, text, className, children, requied = false }: LabelProps) => {
    return (
        <label htmlFor={htmlFor} className={cn('label-sm ', className)}>
            {text || children}
            {requied && <span className='text-red-500'>*</span>}
        </label>
    )
}

export default Label