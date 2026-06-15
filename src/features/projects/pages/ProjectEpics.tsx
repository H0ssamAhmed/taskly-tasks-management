import PlusIcon from '@/assets/svgs/PlusIcon'
import BreadCrumb from '@/shared/BreadCrumb'
import PageBody from '@/shared/PageBody'
import PageHeader from '@/shared/PageHeader'
import { Button } from '@/shared/UI/Button'
import Input from '@/shared/UI/Input'
import { Link, useParams } from 'react-router-dom'
import EpicsList from '../components/epic/EpicsList'
import SearchIcon from '@/assets/svgs/SearchIcon'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { getPrpjectEpics } from '../services/ProjectsApi'
import type { ProjectEpicsType } from '../schema/types'
import EpicsFullPageSkelton from '../components/epic/EpicSkelton'
import EmptyEpics from '../components/epic/EmptyEpics'
import EmptyOnSearch from '../components/epic/EmptyOnSearch'
import PageError from '../../../shared/PageError'

const BreadCrumbLinks = [
    { link: "/project", text: "Project" },
    { link: "", text: "Project name" },
    { link: "", text: "Epics", active: true }
]

const ProjectEpics = () => {
    const { id } = useParams()
    const [epics, setEpics] = useState<ProjectEpicsType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searachValue, setSearchValue] = useState<string>("")
    const [fixedResponse, setFisedResponse] = useState<ProjectEpicsType[]>([])

    const fetchEpics = async () => {
        setLoading(true)
        try {
            const response = await getPrpjectEpics(id!)
            setEpics(response);
            setFisedResponse(response);

        } catch (error) {
            setError(true)
            console.error(error);
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchEpics()
    }, [id])

    const handleSearchInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setSearchValue(value)
        if (value) {
            const filterEpics = fixedResponse.filter((epic) => epic.title.includes(value))
            setEpics(filterEpics)
            return
        }
        setEpics(fixedResponse)
    }

    const handleReset = () => {
        setSearchValue("")
        setEpics(fixedResponse)
    }

    if (loading) return <EpicsFullPageSkelton />

    if (error) return <PageError onClick={fetchEpics} />

    if (!fixedResponse.length) return <EmptyEpics />


    return (<div className='py-2 px-2 md:px-4 lg:px-8 relative'>
        <Link className='bg-primary fixed p-6 lg:hidden z-10 rounded-lg bottom-28 right-6' to={"new"}><PlusIcon width={14} height={14} className='text-white' /></Link>

        <BreadCrumb className='hidden lg:flex' links={BreadCrumbLinks} />
        <div className='hidden lg:block'>
            <PageHeader
                title='Project Epics'

            >
                <div className='flex items-center justify-end gap-4 w-full'>
                    <SearchBox searachValue={searachValue} onSearch={handleSearchInputValue} />
                    <Button className='flex gap-4 justify-center items-center py-3 px-5 rounded-sm'><PlusIcon /><Link to={"new"}>Create New Epics</Link></Button>
                </div>
            </PageHeader>
        </div>
        <div className='lg:hidden'>
            <SearchBox searachValue={searachValue} className="w-full" onSearch={handleSearchInputValue} />

        </div>



        <PageBody className='w-full lg:w-full bg-surface-low mb-20 lg:mb-0'>
            <EpicsList epics={epics} />
            {!epics.length && <EmptyOnSearch onClick={handleReset} />}

        </PageBody>


        <div className='hidden lg:flex items-center justify-between' >
            <p className='text-xs text-muted ' >Showing {10} of {50} active projects</p>
            <div className='flex items-center py-20 justify-end gap-2'>
                <Button

                    className='rounded-sm border-slate-light disabled:opacity-50 border ' variant="ghost">{`<`}</Button>
                <div className='hidden lg:flex items-center justify-end gap-2'>

                    {Array.from({ length: 2 }).map((_, idx) => <Button
                        variant={idx + 1 == 1 ? "primary" : "ghost"}
                        className='rounded-sm border-slate-light border '>{idx + 1}</Button>)}
                </div>

                <Button

                    className='rounded-sm border-slate-light disabled:opacity-50 border ' variant="ghost">{`>`}</Button>
            </div>
        </div>
    </div>

    )
}

export default ProjectEpics

interface BoxSearchProps {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searachValue: string;
    className?: string,
}
const SearchBox = ({ onSearch, searachValue, className }: BoxSearchProps) => {


    return (<div className={cn('w-1/2 py-3 rounded-sm relative', className)}>
        <SearchIcon className='absolute top-1/3 left-2' width={20} height={20} />
        <Input value={searachValue} onChange={onSearch} placeholder='Seare Epics' className='w-full py-3 ps-8 rounded-sm' />
    </div>)
}