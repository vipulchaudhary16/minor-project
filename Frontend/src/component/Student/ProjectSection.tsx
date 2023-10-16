import { useEffect, useState } from "react";
import ProjectTable from "../ProjectTable";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../Utils/Loader";
import PageHeading from "../PageHeading";
import SearchBar from "../Utils/SearchBar";
import FilterDropDown from "../Utils/FilterDropDown";

export const ProjectSectionStudent = () => {
  const [projectList, setProjectList] = useState([]);
  const columns = [
    "Problem Statements",
    "Domain",
    "Faculty Name",
    "Selected By",
    "Action",
  ];
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("");

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:8080";
      url += `/api/problemStatement/?q=${searchQuery}`;
      if (facultyFilter) {
        url += `&facultyId=${facultyFilter}`;
      }
      const res = await axios.get(url);
      setProjectList(res.data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleFacultyFilter = async (e: any) => {
    const value = e.target.value;
    setFacultyFilter(value);
  };

  return (
    <>
      <div className="max-h-screen p-[6rem] overflow-auto">
        <PageHeading title="Project Lists" />
        <div className="flex flex-row-reverse gap-4 pb-4">
          <FilterDropDown onChange={handleFacultyFilter} />
          <SearchBar
            query={searchQuery}
            querySetter={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Search by problem statement and domain"
          ></SearchBar>
        </div>

        <div className="card p-[2.5rem] rounded-3xl">
          {loading ? (
            <Loader heading="Loading projects" />
          ) : (
            <ProjectTable projects={projectList} columns={columns} />
          )}
        </div>
      </div>
    </>
  );
};
