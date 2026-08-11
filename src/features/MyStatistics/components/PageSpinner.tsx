import Spinner from '@/shared/UI/Spinner'


const PageSpinner = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <Spinner className="w-200 h-20 text-primary-container" />
      <span className="text-sm font-semibold text-primary-dark/60">
        {message}
      </span>
    </div>
  )
}

export default PageSpinner

