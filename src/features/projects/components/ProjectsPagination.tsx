import { Button } from '@/Shared/UI/Button'

const ProjectsPagination = () => {
  return (
    <div className='flex items-center justify-between' >
      <p className='text-xs text-muted' >Showing 5 of 24 active projects</p>
      <div className='flex items-center justify-end gap-2'>
        <Button className='rounded-sm border-slate-light  border ' variant="ghost">{`<`}</Button>
        <Button className='rounded-sm border-slate-light  border '>1</Button>
        <Button className='rounded-sm border-slate-light  border ' variant="ghost">2</Button>
        <Button className='rounded-sm border-slate-light  border ' variant="ghost">{`>`}</Button>
      </div>
    </div>
  )
}

export default ProjectsPagination