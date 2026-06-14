import type { IconType } from '@/assets/svg'
import { IconDisplayer } from '@/shared/UI/IconDisplayer'

interface Props {
    icon: IconType
    text: string
}
const RuleRow = ({ icon, text }: Props) => {
    return (
        <div className='flex items-center justify-start gap-2'>
            <IconDisplayer
                width={12}
                height={12}
                name={icon} />
            <p className='body-md'>{text}</p>
        </div>
    )
}

export default RuleRow