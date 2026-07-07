
const BoardColumnSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 w-72">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 px-1 rounded-sm text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-surface-highest animate-pulse" />
                    <div className="h-4 w-24 rounded-sm bg-surface-highest animate-pulse" />
                    <div className="h-5 w-6 rounded-sm bg-surface-highest animate-pulse" />
                </div>

                <div className="h-5 w-5 rounded-sm bg-surface-highest animate-pulse" />
            </div>

            {/* Add New Task Button */}
            <div className="py-4 flex items-center justify-center gap-2 border border-dashed border-slate-light rounded-sm">
                <div className="h-5 w-5 rounded-full bg-surface-highest animate-pulse" />
                <div className="h-4 w-24 rounded-sm bg-surface-highest animate-pulse" />
            </div>

            {/* Task Cards */}
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="p-4 rounded-md bg-slate-light/10"
                >
                    <div className="space-y-2 my-4 py-2">
                        <div className="h-4 w-full rounded-sm bg-surface-highest animate-pulse" />
                        <div className="h-4 w-5/6 rounded-sm bg-surface-highest animate-pulse" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-sm bg-surface-highest animate-pulse" />
                            <div className="h-4 w-16 rounded-sm bg-surface-highest animate-pulse" />
                        </div>

                        <div className="w-6 h-6 rounded-full bg-surface-highest animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BoardColumnSkeleton