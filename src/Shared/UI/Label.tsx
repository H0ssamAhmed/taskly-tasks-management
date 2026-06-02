import { cn } from '@/lib/utils';
import React from 'react'

interface LabelProps {
    htmlFor?: string;
    text?: string;
    className?: string;
    children?: React.ReactNode;
}
const Label = ({ htmlFor, text, className, children }: LabelProps) => {
    return (
        <label htmlFor={htmlFor} className={cn('label-sm ', className)}>
            {text || children}
        </label>
    )
}

export default Label