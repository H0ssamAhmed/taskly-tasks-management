import { Button } from '@/shared/UI/Button';
import usePagination from '../hooks/usePagination';
import { getPaginationRange } from '@/lib/helpers';


const ProjectsPagination = ({ data }: { data: string }) => {
  const { currentpage, limit, handleChangeQuery } = usePagination()
  const total_count = data.split("/")[1];
  const totalPages = Math.ceil(Number(total_count) / Number(limit))

  const handleChangePage = (type: string | "+" | "-") => {
    const newPageNumber = type == "+" ? (Number(currentpage) + 1) : (Number(currentpage) - 1)
    handleChangeQuery({ page: String(newPageNumber), limit: String(limit) })
  }

  const paginationRange = getPaginationRange({ currentPage: Number(currentpage), totalPages: totalPages });
  return (
    <>
      <div className='flex items-center justify-between' >
        <p className='text-xs text-muted hidden lg:block' >Showing {limit} of {total_count} active projects</p>
        <div className='flex items-center py-20 justify-end gap-2'>
          <Button
            onClick={() => handleChangePage("-")}

            disabled={Number(currentpage) == 1}
            className='rounded-sm border-slate-light disabled:opacity-50 border ' variant="ghost">{`<`}</Button>
          <div className='hidden lg:flex items-center justify-end gap-2'>

            {paginationRange.map((pageNumber, idx) => {
              if (pageNumber === '...') {
                return <span key={idx} className="px-2">...</span>;
              }
              return (
                <Button
                  key={idx}
                  onClick={() => handleChangeQuery({ page: String(pageNumber) })}
                  variant={pageNumber === Number(currentpage) ? "primary" : "ghost"}
                  className='rounded-sm border-slate-light border'
                >
                  {pageNumber}
                </Button>
              );
            })}

          </div>

          <Button

            onClick={() => handleChangePage("+")}

            disabled={currentpage == totalPages}
            className='rounded-sm border-slate-light disabled:opacity-50 border ' variant="ghost">{`>`}</Button>
        </div>
      </div >
    </>

  )
}

export default ProjectsPagination