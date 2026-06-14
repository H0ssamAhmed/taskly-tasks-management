
const ProjectFormSkeleton = () => {
    return (
        <div className="py-4 md:px-2 lg:px-8 w-full rounded-sm animate-pulse">
            {/* Header */}
            <div className="py-4">
                <div className="flex items-center gap-4 pt-8 pb-10 bg-white">
                    <div className="w-10 h-10 rounded-sm bg-surface-highest" />

                    <div className="flex flex-col gap-2">
                        <div className="h-5 w-48 bg-surface-highest rounded" />
                        <div className="h-3 w-72 bg-surface-highest rounded" />
                    </div>
                </div>

                {/* Form */}
                <div className="flex flex-col gap-6 pt-8">
                    {/* Title */}
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-32 bg-surface-highest rounded" />
                        <div className="h-10 w-full bg-surface-highest rounded-sm" />
                        <div className="h-3 w-40 bg-surface-highest rounded" />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-32 bg-surface-highest rounded" />
                        <div className="h-32 w-full bg-surface-highest rounded-sm" />

                        <div className="flex justify-between">
                            <div className="h-3 w-40 bg-surface-highest rounded" />
                            <div className="h-3 w-20 bg-surface-highest rounded" />
                        </div>
                    </div>
                </div>

                {/* Footer buttons */}
                <div className="flex flex-col lg:flex-row justify-between gap-4 py-6">
                    <div className="h-10 w-full lg:w-32 bg-surface-highest rounded-sm" />
                    <div className="h-10 w-full lg:w-40 bg-surface-highest rounded-sm" />
                </div>
            </div>
        </div>
    );
}

export default ProjectFormSkeleton