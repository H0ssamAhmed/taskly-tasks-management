const TableSkeleton = () => {
    return (
        <table className="w-full task-table">
            <thead className="bg-surface-low/50 py-6 px-6.5">
                <tr>
                    <td className="uppercase font-bold text-xs text-muted">task id</td>
                    <td className="uppercase font-bold text-xs text-muted">title</td>
                    <td className="uppercase font-bold text-xs text-muted">status</td>
                    <td className="uppercase font-bold text-xs text-muted">due date</td>
                    <td className="uppercase font-bold text-xs text-muted">assignee</td>
                </tr>
            </thead>

            <tbody>
                {Array.from({ length: 6 }).map((_, index) => (
                    <tr key={index}>
                        <td className="py-4">
                            <div className="h-4 w-16 rounded-sm bg-surface-highest animate-pulse" />
                        </td>

                        <td className="py-4">
                            <div className="h-4 w-48 rounded-sm bg-surface-highest animate-pulse" />
                        </td>

                        <td className="py-4">
                            <div className="h-6 w-24 rounded-sm bg-surface-highest animate-pulse" />
                        </td>

                        <td className="py-4">
                            <div className="h-4 w-28 rounded-sm bg-surface-highest animate-pulse" />
                        </td>

                        <td className="py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-surface-highest animate-pulse" />
                                <div className="h-4 w-24 rounded-sm bg-surface-highest animate-pulse" />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableSkeleton