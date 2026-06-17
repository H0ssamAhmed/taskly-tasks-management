import type { EpicPaginantion, ProjectEpicsType } from '../../schema/types'
import EpicCard from './EpicCard'

interface Props {
    epics: ProjectEpicsType[],
    fetchEpics: ({ id, page, limit }: EpicPaginantion) => void

}

const EpicsList = ({ epics, fetchEpics }: Props) => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 justify-between w-full'>
            {epics.map((epic) => <EpicCard
                fetchEpics={fetchEpics}
                key={epic.id} epic={epic} />)}
        </div>


    )
}

export default EpicsList