import { cn } from '@/lib/utils'
import React from 'react'
interface Props {
    children: React.ReactNode,
    className?: string
}
const PageBody = ({ children, className }: Props) => {
    return (
        <div className={cn('lg:w-2xl pt-8 mx-auto bg-white grow', className)}>
            <div className=' flex items-center justify-center mx-auto p-4'>
                {children}
            </div>
        </div>
    )
}

export default PageBody