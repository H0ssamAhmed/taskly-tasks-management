import CanlenderIcon from '@/assets/svgs/CanlenderIcon'
import CreatedByEpicIcon from '@/assets/svgs/CanlenderIcon'
import OptionDotsIcon from '@/assets/svgs/OptionDotsIcon'
import Avatar from '@/shared/UI/Avatar'

const EpicCard = () => {
    return (
        <div className='bg-white rounded-md'>
            <div className='hidden lg:block p-4 lg:border-s-4 border-s-green-800 rounded-md'>
                <div className='flex items-center justify-between my-2'>
                    <EpicBadge />
                    <OptionDotsIcon />
                </div>
                <h3 className='font-semibold text-xl/snug'>Sustainable Materials Integration</h3>
                <div className='flex items-center justify-start gap-3'>
                    <Avatar name='Hossam Ahmed' className=' my-4 rounded-md' />
                    <div>
                        <p>Assinee</p>
                        <p className='text-md font-semibold'>{"ali red"}</p>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-xs flex items-center justify-start gap-1 my-4'>
                        <CreatedByEpicIcon />
                        <span>Created By:</span>
                        <span className='font-semibold' >{"hossam Ahmed"}</span>
                    </p>
                    <p className='text-xs flex items-center justify-start gap-1 my-4'>
                        <CanlenderIcon />
                        <span>22 Oct 2025</span>
                    </p>

                </div>
            </div>
            <div className='block lg:hidden p-4 rounded-md'>
                <div className='flex items-center justify-between my-2'>
                    <EpicBadge />
                    <OptionDotsIcon />
                </div>
                <h3 className='font-semibold text-xl/snug'>Sustainable Materials Integration</h3>
                <div className='flex items-center justify-between gap-3'>
                    <div className='flex items-center justify-between gap-3'>
                        <Avatar name='Hossam Ahmed' className=' my-4 text-md rounded-md' />
                        <div>
                            <p className='text-md font-semibold'>{"ali red"}</p>
                            <p className='text-muted'>Assinee</p>
                        </div>
                    </div>
                    <p className='text-xs text-end flex flex-col gap-1 my-4'>
                        <span className='text-muted'>DEADLINE:</span>
                        <span>22 Oct 2025</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EpicCard

const EpicBadge = () => {
    return (<div>EPIC-102</div>)
}
