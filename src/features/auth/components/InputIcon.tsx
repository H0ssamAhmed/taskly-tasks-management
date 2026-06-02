import { cn } from "@/lib/utils"
interface InputIconProps {
    children: React.ReactNode,
    className?: string
}
const InputIcon = ({ children, className }: InputIconProps) => {
    return <div className={cn("absolute right-3 cursor-pointer", className)}>
        {children}
    </div>
}

export default InputIcon