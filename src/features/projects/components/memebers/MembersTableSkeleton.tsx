import AddMemberIcon from "@/assets/svgs/AddMemberIcon";

import PageBody from "@/shared/PageBody";
import PageHeader from "@/shared/PageHeader";
import { Button } from "@/shared/UI/Button";

const MembersTableSkeleton = () => {
  return (
    <div className='py-2 px-2 md:px-4 lg:px-8'>

      <div className="h-6 bg-surface-highest py-4 animate-pulse rounded-sm w-1/2"></div>

      <PageHeader title='Project Members' >
        <Button className='flex items-center justify-center gap-4 group'>
          <AddMemberIcon
            className="text-gray-500 hover:text-blue-500 group-hover:scale-110 transition-all duration-200"

          />
          invite member</Button>
      </PageHeader>
      <PageBody>


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
            {[...Array(4)].map((_, index) => (
              <tr
                key={index}
                className="border-b border-slate-100"
              >
                {/* Member */}
                <td className="px-6 py-4">
                  <div className="h-8 w-full rounded-md bg-surface-highest " />
                </td>

                {/* Role */}
                <td className="px-6 py-4">

                  <div className="h-8 w-16 rounded-md bg-surface-highest " />
                </td>

                {/* Action */}
                <td className="px-6 py-4">
                  <div className="h-8 w-16 rounded-md bg-surface-highest " />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </PageBody>

    </div>

  );
};

export default MembersTableSkeleton;