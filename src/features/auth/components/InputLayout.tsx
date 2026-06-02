import { cn } from '@/lib/utils'
import React from 'react'
interface InputLayoutProps {
    children: React.ReactNode;
    className?: string;
}
const InputLayout = ({ children, className }: InputLayoutProps) => {
    return (
        <div className={cn('flex flex-col items-start justify-center gap-2', className)}>
            {children}
        </div>
    );
};

export default InputLayout;