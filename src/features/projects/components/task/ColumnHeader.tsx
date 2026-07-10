import PlusIcon from "@/assets/svgs/PlusIcon"

const ColumnHeader = ({ name, length }: { name: string, length: number }) => {
    return (
        <div className="flex items-center justify-between gap-2 px-1 rounded-sm text-xs">
            <p className="flex items-center justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span>{name}</span>
                <span className="bg-surface-highest px-1">{length}</span>
            </p>
            <p><PlusIcon /></p>
        </div>
    )

}


export default ColumnHeader