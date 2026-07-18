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
import { Link, useSearchParams } from 'react-router-dom'
import PlusIcon from '@/assets/svgs/PlusIcon'
import { Button } from '@/shared/UI/Button'
import TaskDetailsPopup from '../components/task/TaskDetailsPopup'
import { useAppSelector } from '@/store/store'
import { useState } from 'react'


const BreadCrumbLinks = [
    { link: "/project", text: "Project" },
    { link: "", text: "Project name" },
    { link: "", text: "Tasks" },
    { link: "", text: "New Task", active: true }
]

const ProjectTask = () => {
    const { selectedTaskId } = useAppSelector((state) => state.taskDetails)
    const { currentView } = useProjectTask("TO_DO")
    const isMobile = useMobile()
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("title");
    const [searchValue, setSearchValue] = useState(searchTerm || "")

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("page")
        newSearchParams.delete("limit")

        setSearchParams(newSearchParams);

        if (value) {
            newSearchParams.set("title", value);
        } else {
            newSearchParams.delete("title");
        }

        setSearchParams(newSearchParams);
        setSearchValue(value)


    };




    return <div className='py-2 px-2 md:px-4 lg:px-8 relative'>
        <AddButton path='new' className='hidden lg:block bottom-10' />
        <BreadCrumb className='hidden lg:flex' links={BreadCrumbLinks} />
        <PageHeader
            className='flex-col items-start lg:flex-row lg:items-center'
            childrenClassName='flex w-full'
            title='Active Workboard' description="Curating Project Alpha's production pipeline and milestones.">
            <div className='flex flex-col lg:flex-row items-center justify-end px-2 gap-2 w-full py-4'>
                <SearchBox className='w-full lg:w-1/3' placeholder='Search tasks...' searchValue={searchValue} onSearch={onSearch} />
                <SelectView className='hidden lg:block ' />
                <span className='bg-surface-highest p-3.5 cursor-pointer hidden lg:block rounded-sm'><FilterIcon className='w-4 h-4' /></span>
                <Link className='flex items-center justify-center w-full gap-2 lg:hidden ' to={"new"}><Button className='flex items-center justify-center w-full gap-2' ><PlusIcon />Create Taskk</Button></Link>
            </div>
        </PageHeader>

        <PageBody className='lg:w-full my-8'>
            {currentView == "board" && !isMobile
                ? <BoardView />
                : <ListView />
            }
            {selectedTaskId && <TaskDetailsPopup />}
        </PageBody >

    </div >
}

export default ProjectTask