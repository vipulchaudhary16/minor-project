interface PageHeadingProps{
    title : string,
}

const PageHeading : React.FC<PageHeadingProps> = ({title}) => {
  return (
    <div className="bg-[#ebf3fe] mb-[1rem] p-[1.5rem] rounded-3xl">
      <h2 className="text-[2.2rem] text-[#5d87ff] font-semibold">
        {title}
      </h2>
    </div>
  );
};

export default PageHeading;
