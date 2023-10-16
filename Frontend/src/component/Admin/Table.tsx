type PropsType = {
  columns: string[];
  children: React.ReactNode;
};

export const Table = ({ columns, children }: PropsType) => {
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
        <tbody className="text-[#5A6A85]">{children}</tbody>
      </table>
    </div>
  );
};
