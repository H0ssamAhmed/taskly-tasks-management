import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
    title: string,
    description?: string
    children?: React.ReactNode,
    className?: string,
    childrenClassName?: string,
}
const PageHeader = ({ children, title, description, className, childrenClassName }: Props) => {
    return (
        <div className='py-2'>
            <div className={cn('flex items-center justify-between', className)}>
                <div className=''>
                    <h2 className='headline-lg py-2'>{title}</h2>
                    <p className='text-slate-mid'>{description}</p>

                </div>
                <div className={cn('hidden lg:flex items-center justify-end gap-4  ms-auto w-1/2', childrenClassName)}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PageHeader