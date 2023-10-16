import React from "react";

interface TableProps {
  columns: Array<string>;
  rows: Array<Array<string>>;
}

export const Table: React.FC<TableProps> = ({ columns, rows }) => {
  return (
    <div className="w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="p-[1.4rem] text-left text-[1.4rem] text-[#5A6A85] font-semibold uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#5A6A85]">
          {rows.map((rowData, index) => (
            <tr key={index}>
              {rowData.map((data, index) => (
                <td className="p-[1.4rem] whitespace-no-wrap">
                  <div className="text-[1.3rem] font-medium">{data}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
