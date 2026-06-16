import { cn } from '@/lib/utils'
const RowSkeleton = ({ className }: { className?: string }) => {
    return (<div className={cn("w-10 h-10 rounded-sm bg-surface-highest", className)} />

    )
}

export default RowSkeleton