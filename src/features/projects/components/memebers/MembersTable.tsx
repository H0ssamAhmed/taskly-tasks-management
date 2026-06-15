
import OptionDotsIcon from '@/assets/svgs/OptionDotsIcon'
import type { ProjectMemberType } from '../../schema/types'
import { cn } from '@/lib/utils'
import { Button } from '@/shared/UI/Button'
import Memeber from './Memeber'

const MembersTable = ({ memebers }: { memebers: ProjectMemberType[] }) => {
    return (
        <table className="w-full overflow-hidden  border border-slate-200 bg-white">
            <thead className="bg-slate-100">
                <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                        MEMBER
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                        ROLE
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                        ACTION
                    </th>
                </tr>
            </thead>

            <tbody>
                {memebers.map((member) => (
                    <tr
                        key={member.member_id}
                        className="border-t border-slate-200 hover:bg-slate-50 transition-colors not-last:border-b "
                    >
                        <td className="px-6 py-4 text-sm text-slate-800 flex items-center justify-start gap-4">
                            <Memeber
                                name={member.metadata.name}
                                email={member.metadata.email} />
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                            <span className={cn('flex items-center justify-center w-fit rounded-xl py-1 px-4', member.role == "owner" && 'bg-success')}>
                                {member.role}
                            </span>
                        </td>

                        <td className="px-6 py-4 bg flex items-center justify-end  ">
                            <Button variant="ghost" className='rounded-sm' >
                                <OptionDotsIcon />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default MembersTable