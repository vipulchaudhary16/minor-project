import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  onChange: Function;
};

const FilterDropDown = ({ onChange }: Props) => {
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    fetchFacultyList();
  }, []);

  const fetchFacultyList = async () => {
    try {
      let url = "http://localhost:8080";
      url += `/api/user/?type=1`;
      const res = await axios.get(url);
      setFacultyList(res.data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
    }
  };

  return (
      <select
        onChange={(e) => onChange(e)}
        className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="">Select faculty </option>
        {facultyList.map((faculty: any) => (
          <option value={faculty._id} key={faculty._id}>
            {faculty.name}
          </option>
        ))}
      </select>
  );
};

export default FilterDropDown;
