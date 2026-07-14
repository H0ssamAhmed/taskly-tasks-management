import ErrorCloudIcon from "@/assets/svgs/ErrorCloudIcon"
import { Button } from "@/shared/UI/Button"

const TasksError = ({ onClick }: { onClick?: () => void }) => {
    return (
        <div className='text-center flex items-center justify-center flex-col gap-6'>
            <ErrorCloudIcon />
            <h1 className='headline-lg'>Something went wrong</h1>
            <p className='text-center w-sm text-slate-mid'>We're having trouble retrieving your
                projects right now. Please try
                again in a moment.
            </p>
            <Button onClick={onClick}>Retry Connection</Button>
        </div>
    )
}


export default TasksError