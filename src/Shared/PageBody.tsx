import React from 'react'
interface Props {
    children: React.ReactNode
}
const PageBody = ({ children }: Props) => {
    return (
        <div className='w-sm md:w-md lg:w-2xl pt-8 mx-auto'>
            <div className='bg-white flex items-center justify-center mx-auto'>
                {children}
            </div>
        </div>
    )
}

export default PageBody