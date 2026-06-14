import type { ProjectMemberType } from '../schema/types'
import { cn } from '@/lib/utils'
import Avatar from '@/shared/UI/Avatar'
import { Button } from '@/shared/UI/Button'

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
                            <Avatar name={member.metadata.name} className='text-sm p-4 ' />
                            <div >
                                <p className='headline-lg text-sm!'>{member.metadata.name}</p>
                                <p className='body-md text-xs'>{member.metadata.email}</p>
                            </div>

                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                            <span className={cn('flex items-center justify-center w-fit rounded-xl py-1 px-4', member.role == "owner" && 'bg-success')}>
                                {member.role}
                            </span>
                        </td>

                        <td className="px-6 py-4">
                            <Button variant="ghost" className=' mx-auto' >
                                Edit
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default MembersTable