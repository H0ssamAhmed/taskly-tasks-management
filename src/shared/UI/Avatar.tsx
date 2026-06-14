import { cn } from '@/lib/utils';


const Avatar = ({ name, className }: { name: string, className?: string }) => {
    const first = name.split(" ")[0][0];
    const second =
        name.split(" ").length == 2
            ? name.split(" ")[1][0]
            : name.split(" ")[0][1];
    return (
        <p className={cn("font-semibold  bg-primary-container text-white  rounded-sm cursor-pointer w-10 h-10 text-2xl flex items-center justify-center", className)}>{first + second}</p>
    )
}

export default Avatar