import EmptyEpicsIcon from '@/assets/svgs/EmptyEpicsIcon'
import FlasIcon from '@/assets/svgs/FlasIcon'
import PageBody from '@/shared/PageBody'
import { Button } from '@/shared/UI/Button'
import { boxInfo, type BoxProps } from '@/utils/constants/EpicsEmptyConstanst'
import { Link } from 'react-router-dom'

const EmptyEpics = () => {
    return (
        <PageBody className='bg-surface-low my-5'>
            <div className=' flex items-center justify-center gap-8 flex-col'>
                <div className='bg-white rounded-lg'>
                    <EmptyEpicsIcon />
                </div>
                <h1 className='headline-lg'>No epics in this project yet.</h1>
                <p className='text-center w-sm text-slate-mid'>
                    Break down your large project into manageable
                    epics to track progress better and maintain
                    architectural clarity.
                </p>
                <Link to={"new"}>
                    <Button className='flex gap-4 justify-center items-center py-3 px-5'>
                        <FlasIcon />
                        Create First Epic
                    </Button>
                </Link>

                <div className='flex my-10 justify-center items-center gap-4'>
                    {boxInfo.map((info, idx) => <Box {...info} key={idx} />)}
                </div>
            </div>
        </PageBody>

    )
}

export default EmptyEpics



const Box = ({ name, description, Icon }: BoxProps) => {
    return <div className='bg-surface-highest p-4 h-46 rounded-xl'>
        <div className='flex flex-col gap-2'>
            <p className='bg-white w-12 h-12 rounded-md p-4 flex justify-center items-center '> <Icon /></p>
            <h5 className='font-semibold text-md text-slate-dark'>{name}</h5>
            <p className='text-xs text-muted pe-4'>{description}</p>

        </div>
    </div>
}