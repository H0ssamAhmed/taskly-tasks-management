import ErrorCloudIcon from "@/assets/svgs/ErrorCloudIcon"
import { Button } from "@/shared/UI/Button"


const ColumnError = ({ onClick }: { onClick?: () => void }) => {
    return (
        <div className='text-center flex items-center justify-center flex-col gap-6 p-4'>
            <ErrorCloudIcon />
            <h1 className='text-2xl'>Something went wrong</h1>
            <Button onClick={onClick}>Retry Connection</Button>
        </div>
    )
}


export default ColumnError