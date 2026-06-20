import { Link } from 'react-router-dom'
import Arrow from "/src/assets/svg/l-arrow.svg"
import { cn } from '@/lib/utils'
import { Fragment } from 'react/jsx-runtime'
type LinkType = { link?: string, text?: string, active?: boolean }
interface Props {
    links: LinkType[],
    className?: string
}
const BreadCrumb = ({ links, className }: Props) => {
    return (
        <div className={cn('flex items-center justify-start gap-2', className)}>
            {links.map(({ active, text, link }, indx) => {
                return <Fragment key={indx}>
                    <Link key={indx} className={cn('uppercase  hover:text-primary font-semibolds text-slate-mid transition-all', active && "text-primary")} to={link || ""}>{text}</Link>
                    <img src={Arrow} alt='arrow' className='w-2 h-2 block rotate-180 last:hidden' />
                </Fragment>
            })}
        </div>
    )
}

export default BreadCrumb