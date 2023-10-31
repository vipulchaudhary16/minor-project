import { useState } from "react";

type Props = {
  items: Array<{ _id: string; name: string }>;
  onChange: Function;
};

const FilterDropDown = ({ items, onChange }: Props) => {
  // const [facultyList, setFacultyList] = useState([]);

  // useEffect(() => {
  //   fetchFacultyList();
  // }, []);

  // const fetchFacultyList = async () => {
  //   try {
  //     let url = "http://localhost:8080";
  //     url += `/api/user/?type=1`;
  //     const res = await axios.get(url);
  //     setFacultyList(res.data);
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   } finally {
  //   }
  // };

  // return (
  //     <select
  //       onChange={(e) => onChange(e)}
  //       className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
  //     >
  //       <option value="">Select faculty </option>
  //       {facultyList.map((faculty: any) => (
  //         <option value={faculty._id} key={faculty._id}>
  //           {faculty.name}
  //         </option>
  //       ))}
  //     </select>
  // );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center bg-primary-color text-white text-[1.2rem] font-semibold px-[1.5rem] py-[.8rem] rounded-lg hover:bg-[#557deb]"
      >
        Select Faculty
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="card absolute top-[120%] left-0 z-10 w-full bg-secondary-color rounded-lg"
        >
          <ul className="" aria-labelledby="dropdownDefaultButton">
            <li
              onClick={() => {
                onChange(null);
                setIsOpen(!isOpen);
              }}
              className="px-[1rem] py-[.7rem] text-[#5A6A85] text-[1.2rem] font-medium rounded-lg hover:bg-primary-color hover:text-white"
            >
              {"None"}
            </li>
            {items.map((item) => (
              <li
                onClick={() => {
                  onChange(item._id);
                  setIsOpen(!isOpen);
                }}
                key={item._id}
                className="px-[1rem] py-[.7rem] text-[#5A6A85] text-[1.2rem] font-medium rounded-lg hover:bg-primary-color hover:text-white"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;
