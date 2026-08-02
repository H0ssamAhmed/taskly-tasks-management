import { useAppSelector } from '@/store/store'
import type { ProjectEpicsType } from '../../schema/types'
import EpicCard from './EpicCard'
import TaskDetailsPopup from '../task/TaskDetailsPopup'
import { createPortal } from 'react-dom';

interface Props {
    epics: ProjectEpicsType[],
    fetchEpics: () => Promise<void>;

}

const EpicsList = ({ epics, fetchEpics }: Props) => {
    const { selectedTaskId } = useAppSelector((state) => state.taskDetails)

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 justify-between w-full'>
            {epics.map((epic) => <EpicCard
                fetchEpics={fetchEpics}
                key={epic.id} epic={epic} />)}
            {selectedTaskId && createPortal(<TaskDetailsPopup />, document.body)}

        </div>


    )
}

export default EpicsList