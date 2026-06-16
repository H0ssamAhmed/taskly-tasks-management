import type { ProjectEpicsType } from '../../schema/types'
import EpicCard from './EpicCard'
import EpicDetailsModel from './EpicDetailsModel'


const EpicsList = ({ epics }: { epics: ProjectEpicsType[] }) => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 justify-between w-full'>
            {epics.map((epic) => <EpicCard key={epic.id} epic={epic} />)}
            <EpicDetailsModel epic={epics[0]} />
        </div>
    )
}

export default EpicsList