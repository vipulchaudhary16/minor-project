import { Group } from "../../types/index.types";
import { Table } from "../Table";

interface GroupTableProps {
  groupInformation: Group;
}

export const GroupTable: React.FC<GroupTableProps> = ({ groupInformation }) => {
  console.log(groupInformation);
  //   const columns = ["Col-1", "Col-2", "Col-3"];
  //   const rows = [
  //     ["rowData-1", "rowdata-2", "rowdata-3"],
  //     ["rowdata-4", "rowdata-5", "rowdata-6"],
  //     ["row-3"],
  //   ];

  return (
    // <div>
    // 	<p>Display group info here</p>
    // 	<Table columns={columns} rows={rows}/>
    // </div>\
    <div className="w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="p-[1.4rem] text-left text-[1.4rem] text-[#5A6A85] font-semibold uppercase tracking-wider">
              Sr. No.
            </th>
            <th className="p-[1.4rem] text-left text-[1.4rem] text-[#5A6A85] font-semibold uppercase tracking-wider">
              Member Name
            </th>
            <th className="p-[1.4rem] text-left text-[1.4rem] text-[#5A6A85] font-semibold uppercase tracking-wider">
              Roll No.
            </th>
            {/* <th className="p-[1.4rem] text-left text-[1.4rem] text-[#5A6A85] font-semibold uppercase tracking-wider">
              Status
            </th> */}
          </tr>
        </thead>
        <tbody className="text-[#5A6A85]">
          {groupInformation && groupInformation.groupMembersData.map((memberData, index) => (
            <tr>
              <td className="p-[1.4rem] whitespace-no-wrap">
                <div className="text-[1.3rem] font-medium">{index + 1}</div>
              </td>
              <td className="p-[1.4rem] whitespace-no-wrap">
                <div className="text-[1.3rem] font-medium">
                  {memberData.name}
                </div>
              </td>
              <td className="p-[1.4rem] whitespace-no-wrap">
                <div className="text-[1.3rem] font-medium">
                  {memberData.rollNo}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
