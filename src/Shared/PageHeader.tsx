import React from 'react'

interface Props {
    title: string,
    description?: string
    children: React.ReactNode
}
const PageHeader = ({ children, title, description }: Props) => {
    return (
        <div className='py-2'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h2 className='headline-lg py-2'>{title}</h2>
                    <p className='lg:hidden'>{description}</p>

                </div>
                <div className='hidden lg:block'>
                    {children}


                </div>
            </div>
        </div>
    )
}

export default PageHeader