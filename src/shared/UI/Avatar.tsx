import { avatarLetter } from '@/lib/helpers';
import { cn } from '@/lib/utils';


const Avatar = ({ name, className }: { name: string, className?: string }) => {
    const letter = avatarLetter(name)
    return (
        <p className={cn("font-semibold  bg-primary-container text-white  rounded-sm cursor-pointer w-10 h-10 text-2xl flex items-center justify-center", className)}>{letter}
            {!letter && <span className='w-1/2 h-1/2 bg-success/50 rounded-full'></span>}
        </p>
    )
}

export default Avatar