import Logo from '@/shared/Logo'
import { Button } from '@/shared/UI/Button'
import { ToastSuccess } from '@/utils/Toast'
// import { useSearchParams } from 'react-router-dom'

const AcceptInvitation = () => {
    // const [seaechParams] = useSearchParams()
    // const token = seaechParams.get("token")
    const handleAcceptinvitation = () => {
        ToastSuccess("Coming soon Feature", { position: "top-center", duration: 5000 })
    }

    return (
        <div className='bg-white w-screen h-screen flex items-center justify-center'>
            <div className='w-md h-1/4'>
                <div className='flex items-center justify-center '><Logo /></div>
                <div className='rounded-xl border-4 border-transparent border-t-primary my-4 '>
                    <p className='text-slate-mid rounded-2xl bg-slate-light w-fit mx-auto px-2 my-4'>New Project Invitation</p>
                    <p className='text-3xl text-primary-dark text-center py-4 font-bold px-20' >You've been invited to join new project</p>
                    <Button onClick={handleAcceptinvitation} className='w-full rounded-sm'>Accept Invitation</Button>
                </div>
            </div>

        </div>
    )
}

export default AcceptInvitation