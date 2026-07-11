import { avatarLetter } from '@/lib/helpers';
import { cn } from '@/lib/utils';


const Avatar = ({ name, className }: { name: string | undefined | null, className?: string }) => {
    const letter = name ? avatarLetter(name) : <span className='w-1/2 h-1/2 bg-success/50 rounded-full'></span>
    return (
        <p className={cn("font-semibold  bg-primary-container text-white  rounded-sm cursor-pointer w-10 h-10 text-2xl flex items-center justify-center", className)}>{letter}
        </p>
    )
}

export default Avatar