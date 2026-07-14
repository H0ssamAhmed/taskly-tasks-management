import PlusIcon from '@/assets/svgs/PlusIcon'
import BreadCrumb from '@/shared/BreadCrumb'
import PageBody from '@/shared/PageBody'
import PageHeader from '@/shared/PageHeader'
import { Button } from '@/shared/UI/Button'
import { Link } from 'react-router-dom'
import EpicsList from '../components/epic/EpicsList'
import EpicsFullPageSkelton from '../components/epic/EpicSkelton'
import EmptyEpics from '../components/epic/EmptyEpics'
import EmptyOnSearch from '../components/epic/EmptyOnSearch'
import PageError from '../../../shared/PageError'
import Pagination from '../components/Pagination'
import { useEpics } from '../hooks/useEpics'
import { useEditEpic } from '../hooks/useEditEpic'
import SearchBox from '../components/SearchBox'
import AddButton from '@/shared/AddButton'



const ProjectEpics = () => {
    const { loading,
        epics,
        error,
        fetchEpics,
        fixedResponse,
        searachValue,
        handleSearchInputValue,
        handleReset,
        pagination } = useEpics()
    const { epicDetails, loading: loadingTitle } = useEditEpic()

    if (loading || loadingTitle) return <EpicsFullPageSkelton />

    if (error) return <PageError onClick={fetchEpics} />

    if (!fixedResponse.length) return <EmptyEpics />

    const BreadCrumbLinks = [
        { link: "/project", text: "Project" },
        { link: "", text: epicDetails?.name },
        { link: "", text: "Epics", active: true }
    ]
    return (<div className='py-2 px-2 md:px-4 lg:px-8 relative'>
        <AddButton path='new' />

        <BreadCrumb className='hidden lg:flex' links={BreadCrumbLinks} />
        <div className='hidden lg:block'>
            <PageHeader
                title='Project Epics'

            >
                <div className='flex items-center justify-end gap-4 w-full'>
                    <SearchBox placeholder='Seare Epics' searachValue={searachValue} onSearch={handleSearchInputValue} />
                    <Button className='flex gap-4 justify-center items-center py-3 px-5 rounded-sm'><PlusIcon /><Link to={"new"}>Create New Epics</Link></Button>
                </div>
            </PageHeader>
        </div>
        <div className='lg:hidden'>
            <SearchBox searachValue={searachValue} className="w-full" onSearch={handleSearchInputValue} />
        </div>



        <PageBody className='w-full lg:w-full bg-surface-low mb-20 lg:mb-0'>
            <EpicsList
                fetchEpics={fetchEpics}
                epics={epics}
            />
            {!epics.length && <EmptyOnSearch onClick={handleReset} />}

        </PageBody>


        <Pagination data={pagination} />
    </div>

    )
}

export default ProjectEpics


