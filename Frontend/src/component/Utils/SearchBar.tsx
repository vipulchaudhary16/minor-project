type Props = {
  query: string;
  querySetter: Function;
  onSearch: Function;
  onChangeSearchFlag?: boolean;
  placeholder?: string;
};

export default function SearchBar({
  query,
  querySetter,
  onSearch,
  onChangeSearchFlag = false,
  placeholder = "Search",
}: Props) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") onSearch(); //-- Use behind this line
    querySetter(value);
    if (onChangeSearchFlag) {
      onSearch();
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="w-[40rem] flex items-center justify-between border-[.15rem] border-primary-color rounded-full"
    >
      <div className="flex-grow">
        <input
          type="search"
          id="default-search"
          className="w-full px-[1.8rem] py-[1.2rem] text-[1.2rem] text-[#5A6A85] rounded-full rounded-r-none focus:outline-none"
          placeholder={placeholder}
          value={query}
          onChange={handleOnChange}
        />
      </div>
      <button
        type="submit"
        className="bg-primary-color text-white text-[1.2rem] font-semibold p-[1.4rem] rounded-full rounded-l-none hover:bg-[#557deb]"
      >
        <svg
          className="w-[1.6rem] h-[1.6rem]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </button>
    </form>
  );
}
