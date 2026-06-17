import CanlenderIcon from '@/assets/svgs/AssigneeIcon'
import CreatedByEpicIcon from '@/assets/svgs/AssigneeIcon'
import OptionDotsIcon from '@/assets/svgs/OptionDotsIcon'
import Avatar from '@/shared/UI/Avatar'
import type { EpicPaginantion, ProjectEpicsType } from '../../schema/types'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/helpers'
import { useEpicDetails } from '../../hooks/useEpicDetails'
import EpicDetailsModel from './EpicDetailsModel'
import { useState } from 'react'
import Spinner from '@/shared/UI/Spinner'
import usePagination from '../../hooks/usePagination'
import { useParams } from 'react-router-dom'

interface Props {
    epic: ProjectEpicsType,
    fetchEpics: ({ id, page, limit }: EpicPaginantion) => void

}
const EpicCard = ({ epic, fetchEpics }: Props) => {
    const { id } = useParams();
    const { currentpage, limit, } = usePagination()
    const [activeEpic, setActiveEpic] = useState<boolean>(false)
    const { fetchEpic, epic: details, loading, resetModel } = useEpicDetails()


    const date = formatDate(epic.created_at)
    const handleFetch = async () => {
        setActiveEpic(true)
        await fetchEpic({ epicId: epic.id, projectId: epic.project_id })
    }
    const closeModel = async (isDirty: boolean) => {
        resetModel()

        if (isDirty) {
            fetchEpics({ id: id!, page: Number(currentpage), limit: Number(limit) })

        }
    }

    return (
        <>
            <div className='bg-white rounded-md'
                onClick={handleFetch}
            >
                <div className='hidden lg:block p-4 lg:border-s-4 border-s-green-800 rounded-md'>
                    <div className='flex items-center justify-between my-2'>
                        <EpicBadge epicId={epic.epic_id} />
                        <OptionDotsIcon />
                    </div>
                    <h3 className='font-semibold text-xl/snug my-4'>{epic.title}</h3>
                    <div className='flex items-center justify-start gap-3'>
                        <Avatar name={epic.assignee.name} className=' my-4 rounded-md' />
                        <div>
                            <p>Assignee</p>
                            <p className='text-md font-semibold'>{epic.assignee.name || "No Assignee"}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-xs flex items-center justify-start gap-1 my-4'>
                            <CreatedByEpicIcon />
                            <span>Created By:</span>
                            <span className='font-semibold' >{epic.created_by.name}</span>
                        </p>
                        <p className='text-xs flex items-center justify-start gap-1 my-4'>
                            <CanlenderIcon />
                            <span>{date}</span>
                        </p>

                    </div>
                </div>
                <div className='block lg:hidden p-4 rounded-md'>
                    <div className='flex items-center justify-between my-2'>
                        <EpicBadge epicId={epic.epic_id} />
                        <OptionDotsIcon />
                    </div>
                    <h3 className='font-semibold text-xl/snug'>{epic.title}</h3>
                    <div className='flex items-center justify-between gap-3'>
                        <div className='flex items-center justify-between gap-3'>
                            <Avatar name={epic.assignee.name} className=' my-4 text-md rounded-md' />
                            <div>
                                <p className='text-md font-semibold'>{epic.assignee.name}</p>
                                <p className='text-muted'>Assinee</p>
                            </div>
                        </div>
                        <p className='text-xs text-end flex flex-col gap-1 my-4'>
                            <span className='text-muted'>DEADLINE:</span>
                            <span>{date}</span>
                        </p>
                    </div>
                </div>
            </div>

            {loading && <div className="fixed w-screen h-screen left-0 top-0 z-50 flex items-center justify-center">
                <div className="absolute w-full h-full z-10 bg-black/20  backdrop-blur-sm"
                    onClick={resetModel}
                />
                <Spinner className='w-52 h-52' />
            </div>}
            {activeEpic && details && <EpicDetailsModel
                onClose={closeModel}
                epic={details}
            />}
        </>
    )
}

export default EpicCard

const EpicBadge = ({ epicId, className }: { epicId: string, className?: string }) => {
    return (<p className={cn('px-2.5 py-1 bg-success rounded-xs font-bold text-[10px]', className)}>{epicId}</p>)
}
