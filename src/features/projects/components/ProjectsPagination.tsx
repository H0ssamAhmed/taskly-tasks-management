
// import { useSearchParams } from 'react-router-dom';
// import { pageLimit } from '../services/ProjectsApi';
import { Button } from '@/shared/UI/Button';

const ProjectsPagination = ({ page }: { page: string }) => {
  // const [searchParams, setSearchParams] = useSearchParams()

  // const [range, total_count] = page.split("/");
  // const handlePageNumber = async (pageNum: number) => {
  //   setSearchParams({ page: String(pageNum) })


  // }
  // const handleChangePage = (type: string | "+" | "-") => {
  //   const newPageNumber = type == "+" ? (Number(page) + 1) : (Number(page) - 1)
  //   console.log(newPageNumber);
  //   console.log(page);


  //   handlePageNumber(newPageNumber)


  // }

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
        {/* <p className='text-xs text-muted hidden lg:block' >Showing {pageLimit} of {total_count} active projects</p> */}
        <div className='flex items-center py-20 justify-end gap-2'>
          <Button
            // onClick={() => handleChangePage("-")}

            disabled={Number(page) == 1}
            className='rounded-sm border-slate-light disabled:opacity-50 border ' variant="ghost">{`<`}</Button>
          {/* <div className='hidden lg:flex items-center justify-end gap-2'>

            {Array.from({ length: Number(total_count) / 10 }).map((_, idx) => <Button
              onClick={() => handlePageNumber(idx + 1)}
              variant={(idx + 1) == Number(page) ? "primary" : "ghost"}
              className='rounded-sm border-slate-light border '>{idx + 1}</Button>)}
          </div> */}

          <Button

            // onClick={() => handleChangePage("+")}

            // disabled={page == totalPages}
            className='rounded-sm border-slate-light disabled:opacity-50 border ' variant="ghost">{`>`}</Button>
        </div>
      </div >
    </>

  )
}

export default ProjectsPagination