import { Button } from '@/shared/UI/Button';
import usePagination from '../../hooks/usePagination';

interface TableFooterPaginationProps {
    data: string;
    colSpan?: number;
}

const TablePagination = ({ data, colSpan = 4 }: TableFooterPaginationProps) => {
    const { currentpage, limit, handleChangeQuery, totalPages } = usePagination(data);
    const total_count = data.split("/")[1];


    const handleChangePage = (type: "+" | "-") => {
        const newPageNumber = type === "+" ? Number(currentpage) + 1 : Number(currentpage) - 1;
        handleChangeQuery({ page: String(newPageNumber), limit: String(limit) });
    };

    return (
        <tr>
            <td className="text-xs text-muted text-start" >
                Showing {limit} of {total_count}
            </td>
            <td className="text-xs text-muted text-end" colSpan={colSpan}>
                <div className="flex items-center justify-end gap-1">
                    {/* Previous button */}
                    <Button
                        onClick={() => handleChangePage("-")}
                        disabled={Number(currentpage) === 1}
                        className="rounded-sm border-slate-light disabled:opacity-50 border-none w-8 h-8 p-0"
                        variant="ghost"
                        size="sm"
                    >
                        {`<`}
                    </Button>
                    <p>page {currentpage} of {totalPages} </p>

                    {/* Next button */}
                    <Button
                        onClick={() => handleChangePage("+")}
                        disabled={Number(currentpage) === totalPages}
                        className="rounded-sm border-slate-light disabled:opacity-50 border-none w-8 h-8 p-0"
                        variant="ghost"
                        size="sm"
                    >
                        {`>`}
                    </Button>
                </div>
            </td>
        </tr>

    )
}

export default TablePagination