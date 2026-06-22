import React from 'react'

interface Props {
    title: string,
    description?: string
    children?: React.ReactNode,
}
const PageHeader = ({ children, title, description }: Props) => {
    return (
        <div className='py-2'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h2 className='headline-lg py-2'>{title}</h2>
                    <p className='text-slate-mid'>{description}</p>

                </div>
                <div className='hidden lg:flex items-center justify-end gap-4  ms-auto w-1/2'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PageHeader