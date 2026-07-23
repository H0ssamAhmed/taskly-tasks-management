import AddMemberIcon from "@/assets/svgs/AddMemberIcon"
import XmarkIcon from "@/assets/svgs/XmarkIcon"
import InputErrorAlert from "@/features/auth/components/InputErrorAlert"
import InputLayout from "@/features/auth/components/InputLayout"
import { Button } from "@/shared/UI/Button"
import Input from "@/shared/UI/Input"
import Label from "@/shared/UI/Label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { sendProjectInvitation } from "../../services/ProjectsApi"
import { useParams } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useMobile } from "../../hooks/useMobile"
import { ResizingDash } from "./ResizingDash"
import { useResizableHeight } from "@/features/auth/hooks/useResizableHeight"
import { useState } from "react"
import { ToastError, ToastSuccess } from "@/utils/Toast"

interface Props {
    onCloseModel: () => void
}

const EmailInvitaion = z.object({
    email: z.email("Please enter a valid email address").trim(),
});

type EmailInvitaionData = z.infer<typeof EmailInvitaion>;
const InvitaionModel = ({ onCloseModel }: Props) => {
    const [isSubmiting, setIsSubmitting] = useState(false)
    const [isError, setIsError] = useState(false)
    const isMobile = useMobile()
    const { startResizing, height } = useResizableHeight({ initialHeight: 520, minHeight: 506 })

    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors, } } = useForm({
        resolver: zodResolver(EmailInvitaion),
        defaultValues: { email: "" },
    })
    const sumbitting = async (value: EmailInvitaionData): Promise<void> => {
        const { email } = value

        try {
            setIsSubmitting(true);
            setIsError(false);

            const response = await sendProjectInvitation({ p_email: email, p_project_id: id!, });
            if (response?.ok || response?.status == 204) {
                ToastSuccess("Invitation sent successfully!", { position: "top-center" });
                reset()
                return
            }
            if (!response.ok) {
                ToastError("An unexpected error occurred please try again", { position: "top-center" });
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }

    }


    return (

        <div className="fixed w-screen h-screen left-0 top-0 z-50 flex items-center justify-center">
            <div className="absolute w-full h-full   z-10 bg-black/50 backdrop-blur-sm"
                onClick={() => onCloseModel()}
            />
            <div className={cn("bg-white w-xl z-10 rounded-sm", isMobile && " rounded-t-6xl rounded-sm bottom-0 absolute w-full")}
                style={{ height: `${height}px` }}
            >
                <div className="p-8 bg-white">
                    {isMobile && (
                        <ResizingDash onStartResize={startResizing} />
                    )}
                    <div className="flex items-center justify-between my-5">
                        <span className="bg-primary/30 w-8 h-8 flex items-center justify-center rounded-sm ">
                            <AddMemberIcon className="text-primary" color="green" />
                        </span>
                        <span onClick={() => onCloseModel()}>
                            <XmarkIcon />
                        </span>
                    </div>
                    <div className="py-4">
                        <h1 className="text-2xl/tight font-bold">Invite Team Member</h1>
                        <p className="text-slate-mid text-sm font-normal pe-5">Send an invitation to join the Architectural Studio workspace.</p>
                    </div>
                    <form onSubmit={handleSubmit(sumbitting)} className="my-5">
                        <InputLayout>
                            <Label htmlFor="email" >
                                Email Address
                            </Label>
                            <Input type='email'
                                {...register("email")}
                                id="email" placeholder="Enter email address" className={cn("rounded-xs focus:outline", errors.email && "bg-red-500/50 outline-error")} />
                            <InputErrorAlert message={errors.email && errors.email.message} />
                            <div className="flex  flex-col-reverse lg:flex-row gap-4 my-4 w-full items-center justify-between">
                                <Button
                                    onClick={() => onCloseModel()}
                                    variant="ghost" className="w-full" type="button">Cancel</Button>
                                <Button disabled={isSubmiting} className="w-full ">
                                    {!isError ? (isSubmiting ? "Sending Invitaion..." : "Send invitaion") : "Try Again"}

                                </Button>
                            </div>
                        </InputLayout>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default InvitaionModel