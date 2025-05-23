export const TD = ({ data, children = null }: any) => {
  return (
    <td className="p-[1.4rem] whitespace-no-wrap">
      <div className="text-[1.3rem] font-medium">
        {data}
        {children}
      </div>
    </td>
  );
};
