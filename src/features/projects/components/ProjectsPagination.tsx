import { Button } from '@/shared/UI/Button'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { pageLimit } from '../services/ProjectsApi';
import { fetchALlProjects } from '../slice/projectSlice';
import { useState } from 'react';
// import { useInfiniteScroll } from '../hooks/useInfintyScroll';

const ProjectsPagination = () => {
  const { pagination } = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()
  const [range, total_count] = pagination.split("/");
  const [start] = range.split("-").map(Number);
  const totalPages = Math.ceil(Number(total_count) / pageLimit)
  const [page, setPage] = useState(Math.floor(start / pageLimit) + 1)
  // const hasMore = data?.length < Number(total_count);


  const handlePageNumber = async (pageNum: number) => {
    setPage(pageNum)
    await dispatch(fetchALlProjects({ page: Number(pageNum) }))
  }
  const handleChangePage = (type: string | "+" | "-") => {
    const newPageNumber = type == "+" ? (page + 1) : (page - 1)
    handlePageNumber(newPageNumber)
    setPage(newPageNumber)

  }


  // const loadMore = async () => {
  //   if (loading) return;

  //   const nextPage = page + 1;
  //   setPage(nextPage);
  //   await dispatch(fetchALlProjects({ page: nextPage }));
  // };

  // const sentinelRef = useInfiniteScroll(loadMore, loading, hasMore);

  return (
    <>
      {/* <div ref={sentinelRef} className="h-10" /> */}
      <div className='flex items-center justify-between' >
        <p className='text-xs text-muted hidden lg:block' >Showing {pageLimit} of {total_count} active projects</p>
        <div className='flex items-center py-20 justify-end gap-2'>
          <Button
            onClick={() => handleChangePage("-")}

            disabled={page == 1} className='rounded-sm border-slate-light disabled:opacity-50 border ' variant="ghost">{`<`}</Button>
          <div className='hidden lg:flex items-center justify-end gap-2'>

            {Array.from({ length: totalPages }).map((_, idx) => <Button
              onClick={() => handlePageNumber(idx + 1)}
              variant={idx + 1 == page ? "primary" : "ghost"}
              className='rounded-sm border-slate-light border '>{idx + 1}</Button>)}
          </div>

          <Button

            onClick={() => handleChangePage("+")}

            disabled={page == totalPages} className='rounded-sm border-slate-light disabled:opacity-50 border ' variant="ghost">{`>`}</Button>
        </div>
      </div >
    </>

  )
}

export default ProjectsPagination