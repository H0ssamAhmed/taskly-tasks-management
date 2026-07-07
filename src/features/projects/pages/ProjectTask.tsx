import BreadCrumb from '@/shared/BreadCrumb'
import PageBody from '@/shared/PageBody'
import PageHeader from '@/shared/PageHeader'
import ListView from '../components/task/ListView'
import BoardView from '../components/task/BoardView'
import { useProjectTask } from '../hooks/useProjectTask'
import SelectView from '../components/task/SelectView'
import FilterIcon from '@/assets/svgs/FilterIcon'
import SearchBox from '../components/SearchBox'
import { useMobile } from '../hooks/useMobile'
import AddButton from '@/shared/AddButton'


const BreadCrumbLinks = [
    { link: "/project", text: "Project" },
    { link: "", text: "Project name" },
    { link: "", text: "Tasks" },
    { link: "", text: "New Task", active: true }
]

const ProjectTask = () => {
    const { currentView } = useProjectTask("TO_DO")
    const isMobile = useMobile()



    return <div className='py-2 px-2 md:px-4 lg:px-8 relative'>
        <AddButton path='new' />
        <BreadCrumb className='hidden lg:flex' links={BreadCrumbLinks} />
        <PageHeader title='Active Workboard' description="Curating Project Alpha's production pipeline and milestones.">
            <div className='flex items-center justify-end px-2 gap-2 w-full py-4'>
                <SearchBox placeholder='Search tasks...' searachValue='' onSearch={() => { }} />
                <SelectView />
                <span className='bg-surface-highest p-3.5 cursor-pointer rounded-sm'><FilterIcon className='w-4 h-4' /></span>

            </div>

        </PageHeader>

        <PageBody className='lg:w-full my-8'>
            {currentView == "board" && !isMobile
                ? <BoardView />
                : <ListView />
            }
        </PageBody >

    </div >
}

export default ProjectTask