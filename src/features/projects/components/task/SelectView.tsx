import { useEffect, useRef, useState } from 'react'
import { useProjectTask } from '../../hooks/useProjectTask'
import { Button } from '@/shared/UI/Button'
import { cn } from '@/lib/utils'
import ListIcon from '@/assets/svgs/ListIcon'
import BoardIcon from '@/assets/svgs/BoardIcon'

const SelectView = ({ className }: { className?: string }) => {
    const { currentView, changeView, } = useProjectTask("TO_DO")
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null);

    const handleChangeView = (view: "board" | "list") => {
        if (view == currentView) {
            setIsOpen(false)
            return;
        }
        changeView(view)
        setIsOpen(false)
    }

    const openSelect = () => {
        setIsOpen(!isOpen)
    }
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div ref={containerRef} className={cn('relative h-12 rounded-sm w-40 bg-white', className)}>
            <Button onClick={openSelect} variant="ghost" className='flex items-center w-full h-full justify-start gap-4'>
                {currentView == "board" ? <BoardIcon /> : <ListIcon />} {currentView == "board" ? "Board View" : "List View"}
            </Button>
            <div className={cn('absolute bg-white p-2 ps-4 w-full opacity-0 -z-10 mt-2 rounded-sm flex flex-col gap-4 transition-all duration-300', isOpen && 'opacity-100 z-10')}>
                <p onClick={() => handleChangeView("board")} className=' cursor-pointer flex items-center justify-start py-4 gap-4 w-full'> <BoardIcon /> Board View</p>
                <p onClick={() => handleChangeView("list")} className=' cursor-pointer flex items-center justify-start gap-4 w-full'><ListIcon /> List View</p>
            </div>
        </div>
    )
}

export default SelectView