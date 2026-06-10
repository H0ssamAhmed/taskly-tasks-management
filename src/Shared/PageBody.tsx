import React from 'react'
interface Props {
    children: React.ReactNode
}
const PageBody = ({ children }: Props) => {
    return (
        <div className='lg:w-2xl pt-8 mx-auto'>
            <div className='bg-white flex items-center justify-center mx-auto p-4'>
                {children}
            </div>
        </div>
    )
}

export default PageBody