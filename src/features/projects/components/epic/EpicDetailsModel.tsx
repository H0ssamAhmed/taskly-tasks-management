
import EpicsModelIcon from '@/assets/svgs/EpicsModelIcon';
import type { ProjectEpicsType } from '../../schema/types';
import XmarkIcon from '@/assets/svgs/XmarkIcon';
import Avatar from '@/shared/UI/Avatar';
import CalenderIcon from '@/assets/svgs/CalenderIcon';
import { formatDate } from '@/lib/helpers';
import PlusIcon from '@/assets/svgs/PlusIcon';
import ListIcon from '@/assets/svgs/ListIcon';
import { Button } from '@/shared/UI/Button';

const EpicDetailsModel = ({ epic }: { epic: ProjectEpicsType }) => {

    const closeModel = () => {

        console.log("epic");
        console.log(epic);
    }

    return (
        <div className="fixed w-screen h-screen left-0 top-0 z-50 flex items-center justify-center">
            <div className="absolute w-full h-full   z-10 bg-black/50 backdrop-blur-sm"
                onClick={closeModel}
            />

            {/* Modal Content */}
            <div className="relative z-10 bg-white p-6 rounded-lg w-2xl shadow-xl">
                <div className='rounded-sm '>
                    <div className=' flex items-center justify-between py-8'>
                        <div className='flex flex-col gap-4'>
                            <p className='flex items-center justify-start gap-4'>
                                <EpicsModelIcon />
                                <span className='text-muted text-xs font-bold'>{epic.epic_id}</span>
                            </p>
                            <p className='headline-lg text-2xl'>{epic.title}</p>
                        </div>
                        <p className='rounded-full cursor-pointer transition-all  p-4 hover:bg-error'><XmarkIcon width={24} height={24} /></p>
                    </div>
                    <div className='flex flex-col my-4 gap-4'>
                        <span className='lg:hidden'>Description</span>
                        <p>{epic.description || "No description provided"}</p>
                    </div>
                    <div className='grid grid-cols-2 gap-6 lg:grid-cols-3'>
                        <div className="flex flex-col gap-4">
                            <span className='text-muted text-xs uppercase'>created by</span>
                            <p className='flex items-center gap-2'>
                                <Avatar className='p-4 w-4 h-4 text-sm' name={epic.created_by.name} /> {epic.created_by.name}
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className='text-muted text-xs uppercase'>Assignee </span>
                            <p className='flex items-center gap-2'>
                                <Avatar className='p-4 w-4 h-4 text-sm bg-slate-light' name={epic.assignee.name} /> {epic.assignee.name}
                            </p>
                        </div>
                        <hr className='col-span-2 opacity-20 h-0.5 lg:hidden bg-muted' />
                        <div className="flex flex-col gap-4">
                            <span className='text-muted text-xs uppercase'>deadline </span>
                            <p className='flex items-center gap-2'>
                                <CalenderIcon className='w-4 h-4' />{epic.deadline}
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className='text-muted text-xs uppercase'>created at </span>
                            <p className='flex items-center gap-2'>
                                <CalenderIcon className='w-4 h-4' />{formatDate(epic.created_at)}
                            </p>
                        </div>



                    </div>

                    <div className='my-4 py-4 flex flex-col gap-6'>
                        <div className='flex items-center justify-between'>
                            <p className='text-lg/normal font-semibold'>Tasks</p>
                            <button className='flex items-center justify-end gap-1 text-primary'><PlusIcon /> Add Task</button>
                        </div>
                        <div className='flex items-center justify-center rounded-sm w-full  bg-surface-highest h-62 border-dashed border-2 border-muted' >
                            <div className='flex flex-col items-center justify-center gap-4'>
                                <p className='w-10 h-10 flex items-center justify-center p-2 rounded-sm bg-surface-highest'>
                                    <ListIcon />
                                </p>
                                <p className='my- '>No tasks have been added to this epic yet</p>
                                <Button
                                    className='flex items-center justify-center gap-2'
                                ><PlusIcon />Add Task</Button>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    );
}

export default EpicDetailsModel