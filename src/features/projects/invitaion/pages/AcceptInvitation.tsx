import Logo from '@/shared/Logo'
import { Button } from '@/shared/UI/Button'
import { useAppSelector } from '@/store/store'
import { ToastError, ToastSuccess } from '@/utils/Toast'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { acceptInvitationbyToken } from '../../services/ProjectsApi'
import { useState } from 'react'

const AcceptInvitation = () => {
    const [seaechParams] = useSearchParams()
    const token = seaechParams.get("token") ?? ""
    const navigator = useNavigate()
    const { data } = useAppSelector(state => state.user)
    const [accepting, setAccecpting] = useState(false)
    if (!data) {
        return <Navigate to={`/sign-in?redirect=/invite?token=${token}`} />
    }
    const handleAcceptinvitation = async () => {
        setAccecpting(true)

        try {
            const response = await acceptInvitationbyToken({ token })
            if (!response.ok) {
                ToastError("Failed to accecpt invitaion, try again", { position: "top-center", duration: 5000 })
                navigator('/projects')
                return
            }

            ToastSuccess("Accept Invitation successfully", { position: "top-center", duration: 5000 })
        } catch (error) {
            console.error(error);
            ToastError("Failed to accecpt invitaion, try again", { position: "top-center", duration: 5000 })

        }
        finally {
            setAccecpting(false)
        }
    }

    return (
        <div className='bg-white w-screen h-screen flex items-center justify-center'>
            <div className='w-md h-1/4'>
                <div className='flex items-center justify-center '><Logo /></div>
                <div className='rounded-xl border-4 border-transparent border-t-primary my-4 '>
                    <p className='text-slate-mid rounded-2xl bg-slate-light w-fit mx-auto px-2 my-4'>New Project Invitation</p>
                    <p className='text-3xl text-primary-dark text-center py-4 font-bold px-20' >You've been invited to join new project</p>
                    <Button disabled={accepting} onClick={handleAcceptinvitation} className='w-full rounded-sm'>{accepting ? "Loading" : "Accept Invitation"}</Button>
                </div>
            </div>
        </div>
    )
}

export default AcceptInvitation