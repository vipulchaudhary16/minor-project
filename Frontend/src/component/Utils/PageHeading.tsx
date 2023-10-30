interface PageHeadingProps{
  title : string,
}

const PageHeading : React.FC<PageHeadingProps> = ({title}) => {
return (
  <div className="bg-secondary-color mb-[3rem] p-[2.5rem] rounded-3xl">
    <h2 className="text-[2.2rem] text-primary-color font-semibold">
      {title}
    </h2>
  </div>
);
};

export default PageHeading;
