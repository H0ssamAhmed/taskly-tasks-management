

const TaskDetailsSkeleton = () => {
    return (
        <div className="h-full">
            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-3 h-full overflow-hidden rounded-sm">
                {/* Left */}
                <div className="col-span-2 flex flex-col justify-between">
                    <div>
                        <div className="pt-6 ps-8 flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-20 rounded-sm bg-surface-highest animate-pulse" />
                                <div className="h-4 w-52 rounded-sm bg-surface-highest animate-pulse" />
                            </div>

                            <div className="h-8 w-3/4 rounded-sm bg-surface-highest animate-pulse" />

                            <div className="space-y-3 pt-4">
                                <div className="h-4 w-24 rounded-sm bg-surface-highest animate-pulse" />
                                <div className="h-4 w-full rounded-sm bg-surface-highest animate-pulse" />
                                <div className="h-4 w-11/12 rounded-sm bg-surface-highest animate-pulse" />
                                <div className="h-4 w-4/5 rounded-sm bg-surface-highest animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface-low py-4 px-8 flex items-center justify-between">
                        <div className="h-10 w-28 rounded-sm bg-surface-highest animate-pulse" />
                        <div className="h-10 w-24 rounded-sm bg-surface-highest animate-pulse" />
                    </div>
                </div>

                {/* Right */}
                <div className="py-6 px-8 bg-surface-low">
                    <div className="space-y-8">
                        {/* Status */}
                        <div>
                            <div className="h-3 w-16 rounded-sm bg-surface-highest animate-pulse mb-4" />
                            <div className="h-10 w-full rounded-sm bg-surface-highest animate-pulse" />
                        </div>

                        {/* Assignee */}
                        <div>
                            <div className="h-3 w-20 rounded-sm bg-surface-highest animate-pulse mb-4" />

                            <div className="flex items-center gap-4 p-4 rounded-sm bg-white">
                                <div className="w-10 h-10 rounded-full bg-surface-highest animate-pulse" />
                                <div className="flex-1">
                                    <div className="h-4 w-28 rounded-sm bg-surface-highest animate-pulse mb-2" />
                                    <div className="h-3 w-20 rounded-sm bg-surface-highest animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Reporter */}
                        <div>
                            <div className="h-3 w-20 rounded-sm bg-surface-highest animate-pulse mb-4" />

                            <div className="flex items-center gap-4 p-4 rounded-sm">
                                <div className="w-10 h-10 rounded-full bg-surface-highest animate-pulse" />
                                <div className="flex-1">
                                    <div className="h-4 w-28 rounded-sm bg-surface-highest animate-pulse mb-2" />
                                    <div className="h-3 w-20 rounded-sm bg-surface-highest animate-pulse" />
                                </div>
                            </div>
                        </div>

                        <hr className="border-slate-light" />

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <div className="h-4 w-20 rounded-sm bg-surface-highest animate-pulse" />
                                <div className="h-4 w-28 rounded-sm bg-surface-highest animate-pulse" />
                            </div>

                            <div className="flex justify-between">
                                <div className="h-4 w-24 rounded-sm bg-surface-highest animate-pulse" />
                                <div className="h-4 w-28 rounded-sm bg-surface-highest animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="block lg:hidden pt-6 px-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="h-4 w-20 rounded-sm bg-surface-highest animate-pulse" />
                    <div className="w-6 h-6 rounded-sm bg-surface-highest animate-pulse" />
                </div>

                <div className="h-8 w-3/4 rounded-sm bg-surface-highest animate-pulse mb-6" />

                <div className="flex gap-4 mb-6">
                    <div className="h-8 w-24 rounded-sm bg-surface-highest animate-pulse" />
                    <div className="h-8 w-20 rounded-sm bg-surface-highest animate-pulse" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="bg-surface-low p-4 rounded-sm">
                            <div className="h-3 w-16 rounded-sm bg-surface-highest animate-pulse mb-4" />

                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-surface-highest animate-pulse" />
                                <div className="h-4 flex-1 rounded-sm bg-surface-highest animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TaskDetailsSkeleton